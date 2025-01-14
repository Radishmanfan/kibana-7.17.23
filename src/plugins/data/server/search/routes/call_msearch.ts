/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import type { IUiSettingsClient, IScopedClusterClient, SharedGlobalConfig } from 'src/core/server';
import type { estypes } from '@elastic/elasticsearch';

import type { MsearchRequestBody, MsearchResponse } from '../../../common/search/search_source';
import { getKbnServerError } from '../../../../kibana_utils/server';
import { getShardTimeout, getDefaultSearchParams, shimAbortSignal, shimHitsTotal } from '..';

/** @internal */
export function convertRequestBody(
  requestBody: MsearchRequestBody,
  { timeout }: { timeout?: string }
): string {
  return requestBody.searches.reduce((req, curr) => {
    const header = JSON.stringify({
      ignore_unavailable: true,
      ...curr.header,
    });
    const body = JSON.stringify({
      timeout,
      ...curr.body,
    });
    return `${req}${header}\n${body}\n`;
  }, '');
}

interface CallMsearchDependencies {
  esClient: IScopedClusterClient;
  globalConfig$: Observable<SharedGlobalConfig>;
  uiSettings: IUiSettingsClient;
}

/**
 * Helper for the `/internal/_msearch` route, exported separately here
 * so that it can be reused elsewhere in the data plugin on the server,
 * e.g. SearchSource
 *
 * @internal
 */
export function getCallMsearch(dependencies: CallMsearchDependencies) {
  /**
   * @throws KbnServerError
   */
  return async (params: {
    body: MsearchRequestBody;
    signal?: AbortSignal;
  }): Promise<MsearchResponse> => {
    const { esClient, globalConfig$, uiSettings } = dependencies;

    // get shardTimeout
    const config = await globalConfig$.pipe(first()).toPromise();
    const timeout = getShardTimeout(config);

    // track_total_hits/enable_fields_emulation are not supported by msearch
    const {
      track_total_hits: tth,
      enable_fields_emulation: efe,
      ...defaultParams
    } = await getDefaultSearchParams(uiSettings);

    try {
      const promise = esClient.asCurrentUser.msearch(
        {
          // @ts-expect-error @elastic/elasticsearch client types don't support plain string bodies
          body: convertRequestBody(params.body, timeout),
        },
        {
          querystring: defaultParams,
        }
      );
      const response = await shimAbortSignal(promise, params.signal);

      return {
        body: {
          ...response,
          body: {
            responses: response.body.responses?.map((r) =>
              shimHitsTotal(r as estypes.SearchResponse<unknown>)
            ),
          },
        },
      };
    } catch (e) {
      throw getKbnServerError(e);
    }
  };
}
