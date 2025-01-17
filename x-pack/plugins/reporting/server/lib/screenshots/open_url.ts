/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { LevelLogger, startTrace } from '../';
import { LocatorParams, UrlOrUrlLocatorTuple } from '../../../common/types';
import { HeadlessChromiumDriver } from '../../browsers';
import { ConditionalHeaders } from '../../export_types/common';
import { Layout } from '../layouts';
import { CONTEXT_DEBUG, DEFAULT_PAGELOAD_SELECTOR } from './constants';

export const openUrl = async (
  timeout: number,
  browser: HeadlessChromiumDriver,
  index: number,
  urlOrUrlLocatorTuple: UrlOrUrlLocatorTuple,
  conditionalHeaders: ConditionalHeaders,
  layout: undefined | Layout,
  logger: LevelLogger
): Promise<void> => {
  // If we're moving to another page in the app, we'll want to wait for the app to tell us
  // it's loaded the next page.
  const page = index + 1;
  const waitForSelector = page > 1 ? `[data-shared-page="${page}"]` : DEFAULT_PAGELOAD_SELECTOR;

  const endTrace = startTrace('open_url', 'wait');
  let url: string;
  let locator: undefined | LocatorParams;

  if (typeof urlOrUrlLocatorTuple === 'string') {
    url = urlOrUrlLocatorTuple;
  } else {
    [url, locator] = urlOrUrlLocatorTuple;
  }

  try {
    await browser.open(
      url,
      { conditionalHeaders, waitForSelector, timeout, locator, layout },
      logger
    );

    // Debug logging for viewport size and resizing
    await browser.evaluate(
      {
        fn() {
          // eslint-disable-next-line no-console
          console.log(
            `Navigating URL with viewport size: width=${window.innerWidth} height=${window.innerHeight} scaleFactor:${window.devicePixelRatio}`
          );
          window.addEventListener('resize', () => {
            // eslint-disable-next-line no-console
            console.log(
              `Detected a viewport resize: width=${window.innerWidth} height=${window.innerHeight} scaleFactor:${window.devicePixelRatio}`
            );
          });
        },
        args: [],
      },
      { context: CONTEXT_DEBUG },
      logger
    );
  } catch (err) {
    logger.error(err);
    throw new Error(
      i18n.translate('xpack.reporting.screencapture.couldntLoadKibana', {
        defaultMessage: `An error occurred when trying to open the Kibana URL: {error}`,
        values: { error: err },
      })
    );
  }

  endTrace();
};
