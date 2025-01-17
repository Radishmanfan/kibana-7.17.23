/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiBasicTable, EuiPanel, EuiSpacer } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React, { useCallback, useState, useEffect, MouseEvent } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Ping } from '../../../../common/runtime_types';
import { convertMicrosecondsToMilliseconds as microsToMillis } from '../../../lib/helper';
import { LocationName } from './location_name';
import { Pagination } from '../../overview/monitor_list';
import { pruneJourneyState } from '../../../state/actions/journey';
import { PingStatusColumn } from './columns/ping_status';
import * as I18LABELS from './translations';
import { MONITOR_TYPES } from '../../../../common/constants';
import { ResponseCodeColumn } from './columns/response_code';
import { ERROR_LABEL, LOCATION_LABEL, RES_CODE_LABEL, TIMESTAMP_LABEL } from './translations';
import { ExpandRowColumn } from './columns/expand_row';
import { PingErrorCol } from './columns/ping_error';
import { PingTimestamp } from './columns/ping_timestamp';
import { FailedStep } from './columns/failed_step';
import { usePingsList } from './use_pings';
import { PingListHeader } from './ping_list_header';
import { clearPings } from '../../../state/actions';
import { getShortTimeStamp } from '../../overview/monitor_list/columns/monitor_status_column';

export const SpanWithMargin = styled.span`
  margin-right: 16px;
`;

const DEFAULT_PAGE_SIZE = 10;

// one second = 1 million micros
const ONE_SECOND_AS_MICROS = 1000000;

// the limit for converting to seconds is >= 1 sec
const MILLIS_LIMIT = ONE_SECOND_AS_MICROS * 1;

export const formatDuration = (durationMicros: number) => {
  if (durationMicros < MILLIS_LIMIT) {
    return i18n.translate('xpack.uptime.pingList.durationMsColumnFormatting', {
      values: { millis: microsToMillis(durationMicros) },
      defaultMessage: '{millis} ms',
    });
  }
  const seconds = (durationMicros / ONE_SECOND_AS_MICROS).toFixed(0);

  // we format seconds with correct pulralization here and not for `ms` because it is much more likely users
  // will encounter times of exactly '1' second.
  if (seconds === '1') {
    return i18n.translate('xpack.uptime.pingist.durationSecondsColumnFormatting.singular', {
      values: { seconds },
      defaultMessage: '{seconds} second',
    });
  }
  return i18n.translate('xpack.uptime.pingist.durationSecondsColumnFormatting', {
    values: { seconds },
    defaultMessage: '{seconds} seconds',
  });
};

export const PingList = () => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState(0);

  const dispatch = useDispatch();

  const history = useHistory();

  const pruneJourneysCallback = useCallback(
    (checkGroups: string[]) => dispatch(pruneJourneyState(checkGroups)),
    [dispatch]
  );

  const { error, loading, pings, total, failedSteps } = usePingsList({
    pageSize,
    pageIndex,
  });

  const [expandedRows, setExpandedRows] = useState<Record<string, JSX.Element>>({});

  const expandedIdsToRemove = JSON.stringify(
    Object.keys(expandedRows).filter((e) => !pings.some(({ docId }) => docId === e))
  );

  useEffect(() => {
    return () => {
      dispatch(clearPings());
    };
  }, [dispatch]);

  useEffect(() => {
    const parsed = JSON.parse(expandedIdsToRemove);
    if (parsed.length) {
      parsed.forEach((docId: string) => {
        delete expandedRows[docId];
      });
      setExpandedRows(expandedRows);
    }
  }, [expandedIdsToRemove, expandedRows]);

  const expandedCheckGroups = pings
    .filter((p: Ping) => Object.keys(expandedRows).some((f) => p.docId === f))
    .map(({ monitor: { check_group: cg } }) => cg);

  const expandedCheckGroupsStr = JSON.stringify(expandedCheckGroups);

  useEffect(() => {
    pruneJourneysCallback(JSON.parse(expandedCheckGroupsStr));
  }, [pruneJourneysCallback, expandedCheckGroupsStr]);

  const hasStatus = pings.reduce(
    (hasHttpStatus: boolean, currentPing) =>
      hasHttpStatus || !!currentPing.http?.response?.status_code,
    false
  );

  const monitorType = pings?.[0]?.monitor.type;

  const columns: any[] = [
    {
      field: 'monitor.status',
      name: I18LABELS.STATUS_LABEL,
      render: (pingStatus: string, item: Ping) => (
        <PingStatusColumn pingStatus={pingStatus} item={item} />
      ),
    },
    {
      align: 'left',
      field: 'observer.geo.name',
      name: LOCATION_LABEL,
      render: (location: string) => <LocationName location={location} />,
    },
    ...(monitorType === MONITOR_TYPES.BROWSER
      ? [
          {
            align: 'left',
            field: 'timestamp',
            name: TIMESTAMP_LABEL,
            render: (timestamp: string, item: Ping) => (
              <PingTimestamp
                checkGroup={item.monitor.check_group}
                label={getShortTimeStamp(moment(timestamp))}
              />
            ),
          },
        ]
      : []),
    // ip column not needed for browser type
    ...(monitorType !== MONITOR_TYPES.BROWSER
      ? [
          {
            align: 'right',
            dataType: 'number',
            field: 'monitor.ip',
            name: i18n.translate('xpack.uptime.pingList.ipAddressColumnLabel', {
              defaultMessage: 'IP',
            }),
          },
        ]
      : []),
    {
      align: 'center',
      field: 'monitor.duration.us',
      name: i18n.translate('xpack.uptime.pingList.durationMsColumnLabel', {
        defaultMessage: 'Duration',
      }),
      render: (duration: number | null) =>
        duration ? (
          formatDuration(duration)
        ) : (
          <span data-test-subj="ping-list-duration-unavailable-tool-tip">{'--'}</span>
        ),
    },
    {
      field: 'error.type',
      name: ERROR_LABEL,
      width: '30%',
      render: (errorType: string, item: Ping) => <PingErrorCol ping={item} errorType={errorType} />,
    },
    ...(monitorType === MONITOR_TYPES.BROWSER
      ? [
          {
            field: 'monitor.status',
            align: 'left',
            name: i18n.translate('xpack.uptime.pingList.columns.failedStep', {
              defaultMessage: 'Failed step',
            }),
            render: (_timestamp: string, item: Ping) => (
              <FailedStep checkGroup={item.monitor?.check_group} failedSteps={failedSteps} />
            ),
          },
        ]
      : []),
    // Only add this column is there is any status present in list
    ...(hasStatus
      ? [
          {
            field: 'http.response.status_code',
            align: 'right',
            name: <SpanWithMargin>{RES_CODE_LABEL}</SpanWithMargin>,
            render: (statusCode: string) => <ResponseCodeColumn statusCode={statusCode} />,
          },
        ]
      : []),
    ...(monitorType !== MONITOR_TYPES.BROWSER
      ? [
          {
            align: 'right',
            width: '24px',
            isExpander: true,
            render: (item: Ping) => (
              <ExpandRowColumn
                item={item}
                expandedRows={expandedRows}
                setExpandedRows={setExpandedRows}
              />
            ),
          },
        ]
      : []),
  ];

  const getRowProps = (item: Ping) => {
    if (monitorType !== MONITOR_TYPES.BROWSER) {
      return {};
    }
    const { monitor } = item;
    return {
      height: '85px',
      'data-test-subj': `row-${monitor.check_group}`,
      onClick: (evt: MouseEvent) => {
        const targetElem = evt.target as HTMLElement;

        // we dont want to capture image click event
        if (targetElem.tagName !== 'IMG' && targetElem.tagName !== 'path') {
          history.push(`/journey/${monitor.check_group}/steps`);
        }
      },
    };
  };

  const pagination: Pagination = {
    initialPageSize: DEFAULT_PAGE_SIZE,
    pageIndex,
    pageSize,
    pageSizeOptions: [10, 25, 50, 100],
    totalItemCount: total,
  };

  return (
    <EuiPanel hasBorder>
      <PingListHeader />
      <EuiSpacer size="s" />
      <EuiBasicTable
        loading={loading}
        columns={columns}
        error={error?.message}
        isExpandable={true}
        hasActions={true}
        items={pings}
        itemId="docId"
        itemIdToExpandedRowMap={expandedRows}
        pagination={pagination}
        noItemsMessage={
          loading
            ? i18n.translate('xpack.uptime.pingList.pingsLoadingMesssage', {
                defaultMessage: 'Loading history...',
              })
            : i18n.translate('xpack.uptime.pingList.pingsUnavailableMessage', {
                defaultMessage: 'No history found',
              })
        }
        onChange={(criteria: any) => {
          setPageSize(criteria.page!.size);
          setPageIndex(criteria.page!.index);
        }}
        tableLayout={'auto'}
        rowProps={getRowProps}
      />
    </EuiPanel>
  );
};
