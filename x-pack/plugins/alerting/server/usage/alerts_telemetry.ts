/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ElasticsearchClient, Logger } from 'kibana/server';
import { AlertsUsage } from './types';

const alertTypeMetric = {
  scripted_metric: {
    init_script: 'state.ruleTypes = [:]; state.namespaces = [:]',
    map_script: `
      String alertType = doc['alert.alertTypeId'].value;
      String namespace = doc['namespaces'] !== null && doc['namespaces'].size() > 0 ? doc['namespaces'].value : 'default';
      state.ruleTypes.put(alertType, state.ruleTypes.containsKey(alertType) ? state.ruleTypes.get(alertType) + 1 : 1);
      if (state.namespaces.containsKey(namespace) === false) {
        state.namespaces.put(namespace, 1);
      }
    `,
    // Combine script is executed per cluster, but we already have a key-value pair per cluster.
    // Despite docs that say this is optional, this script can't be blank.
    combine_script: 'return state',
    // Reduce script is executed across all clusters, so we need to add up all the total from each cluster
    // This also needs to account for having no data
    reduce_script: `
      HashMap result = new HashMap();
      HashMap combinedRuleTypes = new HashMap();
      HashMap combinedNamespaces = new HashMap();
      for (state in states) {
        for (String ruleType : state.ruleTypes.keySet()) {
          int ruleTypeCount = combinedRuleTypes.containsKey(ruleType) ? combinedRuleTypes.get(ruleType) + state.ruleTypes.get(ruleType) : state.ruleTypes.get(ruleType);
          combinedRuleTypes.put(ruleType, ruleTypeCount);
        }
        for (String namespace : state.namespaces.keySet()) {
          combinedNamespaces.put(namespace, 1);
        }
      }
      result.ruleTypes = combinedRuleTypes;
      result.namespaces = combinedNamespaces;
      return result;
    `,
  },
};

export async function getTotalCountAggregations(
  esClient: ElasticsearchClient,
  kibanaInex: string,
  logger: Logger
): Promise<
  Pick<
    AlertsUsage,
    | 'count_total'
    | 'count_by_type'
    | 'throttle_time'
    | 'schedule_time'
    | 'throttle_time_number_s'
    | 'schedule_time_number_s'
    | 'connectors_per_alert'
    | 'count_rules_namespaces'
  >
> {
  try {
    const { body: results } = await esClient.search({
      index: kibanaInex,
      body: {
        size: 0,
        query: {
          bool: {
            filter: [{ term: { type: 'alert' } }],
          },
        },
        runtime_mappings: {
          alert_action_count: {
            type: 'long',
            script: {
              source: `
                def alert = params._source['alert']; 
                if (alert != null) { 
                  def actions = alert.actions; 
                  if (actions != null) { 
                    emit(actions.length); 
                  } else { 
                    emit(0); 
                  }
                }`,
            },
          },
          alert_interval: {
            type: 'long',
            script: {
              source: `
                int parsed = 0;
                if (doc['alert.schedule.interval'].size() > 0) {
                  def interval = doc['alert.schedule.interval'].value;
  
                  if (interval.length() > 1) {
                      // get last char
                      String timeChar = interval.substring(interval.length() - 1);
                      // remove last char
                      interval = interval.substring(0, interval.length() - 1);
  
                      if (interval.chars().allMatch(Character::isDigit)) {
                        // using of regex is not allowed in painless language
                        parsed = Integer.parseInt(interval);
  
                        if (timeChar.equals("s")) {
                          parsed = parsed;
                        } else if (timeChar.equals("m")) {
                          parsed = parsed * 60;
                        } else if (timeChar.equals("h")) {
                          parsed = parsed * 60 * 60;
                        } else if (timeChar.equals("d")) {
                          parsed = parsed * 24 * 60 * 60;
                        }
                        emit(parsed);
                      }
                  }
                }
                emit(parsed);
              `,
            },
          },
          alert_throttle: {
            type: 'long',
            script: {
              source: `
                int parsed = 0;
                if (doc['alert.throttle'].size() > 0) {
                def throttle = doc['alert.throttle'].value;
  
                if (throttle.length() > 1) {
                    // get last char
                    String timeChar = throttle.substring(throttle.length() - 1);
                    // remove last char
                    throttle = throttle.substring(0, throttle.length() - 1);
  
                    if (throttle.chars().allMatch(Character::isDigit)) {
                      // using of regex is not allowed in painless language
                      parsed = Integer.parseInt(throttle);
  
                      if (timeChar.equals("s")) {
                        parsed = parsed;
                      } else if (timeChar.equals("m")) {
                        parsed = parsed * 60;
                      } else if (timeChar.equals("h")) {
                        parsed = parsed * 60 * 60;
                      } else if (timeChar.equals("d")) {
                        parsed = parsed * 24 * 60 * 60;
                      }
                      emit(parsed);
                    }
                }
              }
              emit(parsed);
              `,
            },
          },
        },
        aggs: {
          byAlertTypeId: alertTypeMetric,
          max_throttle_time: { max: { field: 'alert_throttle' } },
          min_throttle_time: { min: { field: 'alert_throttle' } },
          avg_throttle_time: { avg: { field: 'alert_throttle' } },
          max_interval_time: { max: { field: 'alert_interval' } },
          min_interval_time: { min: { field: 'alert_interval' } },
          avg_interval_time: { avg: { field: 'alert_interval' } },
          max_actions_count: { max: { field: 'alert_action_count' } },
          min_actions_count: { min: { field: 'alert_action_count' } },
          avg_actions_count: { avg: { field: 'alert_action_count' } },
        },
      },
    });

    const aggregations = results.aggregations as {
      byAlertTypeId: { value: { ruleTypes: Record<string, string> } };
      max_throttle_time: { value: number };
      min_throttle_time: { value: number };
      avg_throttle_time: { value: number };
      max_interval_time: { value: number };
      min_interval_time: { value: number };
      avg_interval_time: { value: number };
      max_actions_count: { value: number };
      min_actions_count: { value: number };
      avg_actions_count: { value: number };
    };

    const totalAlertsCount = Object.keys(aggregations.byAlertTypeId.value.ruleTypes).reduce(
      (total: number, key: string) =>
        parseInt(aggregations.byAlertTypeId.value.ruleTypes[key], 10) + total,
      0
    );

    return {
      count_total: totalAlertsCount,
      count_by_type: Object.keys(aggregations.byAlertTypeId.value.ruleTypes).reduce(
        // ES DSL aggregations are returned as `any` by esClient.search
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (obj: any, key: string) => ({
          ...obj,
          [replaceFirstAndLastDotSymbols(key)]: aggregations.byAlertTypeId.value.ruleTypes[key],
        }),
        {}
      ),
      throttle_time: {
        min: `${aggregations.min_throttle_time.value}s`,
        avg: `${aggregations.avg_throttle_time.value}s`,
        max: `${aggregations.max_throttle_time.value}s`,
      },
      schedule_time: {
        min: `${aggregations.min_interval_time.value}s`,
        avg: `${aggregations.avg_interval_time.value}s`,
        max: `${aggregations.max_interval_time.value}s`,
      },
      throttle_time_number_s: {
        min: aggregations.min_throttle_time.value,
        avg: aggregations.avg_throttle_time.value,
        max: aggregations.max_throttle_time.value,
      },
      schedule_time_number_s: {
        min: aggregations.min_interval_time.value,
        avg: aggregations.avg_interval_time.value,
        max: aggregations.max_interval_time.value,
      },
      connectors_per_alert: {
        min: aggregations.min_actions_count.value,
        avg: aggregations.avg_actions_count.value,
        max: aggregations.max_actions_count.value,
      },
      count_rules_namespaces: 0,
    };
  } catch (err) {
    logger.warn(
      `Error executing alerting telemetry task: getTotalCountAggregations - ${JSON.stringify(err)}`
    );
    return {
      count_total: 0,
      count_by_type: {},
      throttle_time: {
        min: '0s',
        avg: '0s',
        max: '0s',
      },
      schedule_time: {
        min: '0s',
        avg: '0s',
        max: '0s',
      },
      throttle_time_number_s: {
        min: 0,
        avg: 0,
        max: 0,
      },
      schedule_time_number_s: {
        min: 0,
        avg: 0,
        max: 0,
      },
      connectors_per_alert: {
        min: 0,
        avg: 0,
        max: 0,
      },
      count_rules_namespaces: 0,
    };
  }
}

export async function getTotalCountInUse(
  esClient: ElasticsearchClient,
  kibanaInex: string,
  logger: Logger
) {
  try {
    const { body: searchResult } = await esClient.search({
      index: kibanaInex,
      size: 0,
      body: {
        query: {
          bool: {
            filter: [{ term: { type: 'alert' } }, { term: { 'alert.enabled': true } }],
          },
        },
        aggs: {
          byAlertTypeId: alertTypeMetric,
        },
      },
    });

    const aggregations = searchResult.aggregations as {
      byAlertTypeId: {
        value: { ruleTypes: Record<string, string>; namespaces: Record<string, string> };
      };
    };

    return {
      countTotal: Object.keys(aggregations.byAlertTypeId.value.ruleTypes).reduce(
        (total: number, key: string) =>
          parseInt(aggregations.byAlertTypeId.value.ruleTypes[key], 10) + total,
        0
      ),
      countByType: Object.keys(aggregations.byAlertTypeId.value.ruleTypes).reduce(
        // ES DSL aggregations are returned as `any` by esClient.search
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (obj: any, key: string) => ({
          ...obj,
          [replaceFirstAndLastDotSymbols(key)]: aggregations.byAlertTypeId.value.ruleTypes[key],
        }),
        {}
      ),
      countNamespaces: Object.keys(aggregations.byAlertTypeId.value.namespaces).length,
    };
  } catch (err) {
    logger.warn(
      `Error executing alerting telemetry task: getTotalCountInUse - ${JSON.stringify(err)}`
    );
    return {
      countTotal: 0,
      countByType: {},
      countNamespaces: 0,
    };
  }
}

function replaceFirstAndLastDotSymbols(strToReplace: string) {
  const hasFirstSymbolDot = strToReplace.startsWith('.');
  const appliedString = hasFirstSymbolDot ? strToReplace.replace('.', '__') : strToReplace;
  const hasLastSymbolDot = strToReplace.endsWith('.');
  return hasLastSymbolDot ? `${appliedString.slice(0, -1)}__` : appliedString;
}

// TODO: Implement executions count telemetry with eventLog, when it will write to index
