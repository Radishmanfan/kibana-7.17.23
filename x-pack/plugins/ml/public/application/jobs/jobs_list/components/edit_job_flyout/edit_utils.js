/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { difference } from 'lodash';
import { getNewJobLimits } from '../../../../services/ml_server_info';
import { processCreatedBy } from '../../../../../../common/util/job_utils';
import { getSavedObjectsClient, getDataViews } from '../../../../util/dependency_cache';
import { ml } from '../../../../services/ml_api_service';

export function saveJob(job, newJobData, finish) {
  return new Promise((resolve, reject) => {
    const jobData = {
      ...extractDescription(job, newJobData),
      ...extractGroups(job, newJobData),
      ...extractMML(job, newJobData),
      ...extractModelSnapshotRetentionDays(job, newJobData),
      ...extractDailyModelSnapshotRetentionAfterDays(job, newJobData),
      ...extractDetectorDescriptions(job, newJobData),
      ...extractCustomSettings(job, newJobData),
    };
    const datafeedData = {
      ...extractDatafeed(job, newJobData),
    };

    if (jobData.custom_settings !== undefined) {
      jobData.custom_settings = processCustomSettings(jobData, datafeedData);
    }

    const saveDatafeedWrapper = () => {
      saveDatafeed(datafeedData, job, finish)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    };

    // if anything has changed, post the changes
    if (Object.keys(jobData).length) {
      ml.updateJob({ jobId: job.job_id, job: jobData })
        .then(() => {
          saveDatafeedWrapper();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      saveDatafeedWrapper();
    }
  });
}

function saveDatafeed(datafeedConfig, job) {
  return new Promise((resolve, reject) => {
    if (Object.keys(datafeedConfig).length) {
      const datafeedId = job.datafeed_config.datafeed_id;
      ml.updateDatafeed({ datafeedId, datafeedConfig })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      resolve();
    }
  });
}

export function loadSavedDashboards(maxNumber) {
  // Loads the list of saved dashboards, as used in editing custom URLs.
  return new Promise((resolve, reject) => {
    const savedObjectsClient = getSavedObjectsClient();
    savedObjectsClient
      .find({
        type: 'dashboard',
        fields: ['title'],
        perPage: maxNumber,
      })
      .then((resp) => {
        const savedObjects = resp.savedObjects;
        if (savedObjects !== undefined) {
          const dashboards = savedObjects.map((savedObj) => {
            return { id: savedObj.id, title: savedObj.attributes.title };
          });

          dashboards.sort((dash1, dash2) => {
            return dash1.title.localeCompare(dash2.title);
          });

          resolve(dashboards);
        }
      })
      .catch((resp) => {
        reject(resp);
      });
  });
}

export function loadIndexPatterns() {
  // Loads the list of Kibana index patterns, as used in editing custom URLs.
  // TODO - amend loadIndexPatterns in index_utils.js to do the request,
  // without needing an Angular Provider.
  return new Promise((resolve, reject) => {
    const dataViewsContract = getDataViews();
    dataViewsContract
      .getIdsWithTitle()
      .then((dataViews) => {
        const sortedDataViews = dataViews.sort((a, b) => a.title.localeCompare(b.title));
        resolve(sortedDataViews);
      })
      .catch((resp) => {
        reject(resp);
      });
  });
}

function extractDescription(job, newJobData) {
  const description = newJobData.description;
  if (newJobData.description !== job.description) {
    return { description };
  }
  return {};
}

function extractGroups(job, newJobData) {
  const groups = newJobData.groups;
  if (newJobData.groups !== undefined) {
    const diffCount = difference(job.groups, groups).length + difference(groups, job.groups).length;
    return diffCount === 0 ? {} : { groups };
  }
  return {};
}

function extractMML(job, newJobData) {
  const jobLimits = getNewJobLimits();
  const mmlData = {};
  // if the job's model_memory_limit has changed, add it to the jobData json
  if (job.analysis_limits.model_memory_limit !== undefined) {
    let { mml } = newJobData;
    // if the user has wiped the mml, use the default value which is
    // displayed greyed out in the field
    if (mml === '') {
      mml = jobLimits.max_model_memory_limit;
    }

    // has the data changed, did analysis_limits never exist for this job
    if (mml !== job.analysis_limits.model_memory_limit) {
      mmlData.analysis_limits = {
        model_memory_limit: mml,
      };
    }
  }
  return mmlData;
}

function extractModelSnapshotRetentionDays(job, newJobData) {
  const modelSnapshotRetentionDays = newJobData.modelSnapshotRetentionDays;
  if (modelSnapshotRetentionDays !== job.model_snapshot_retention_days) {
    return { model_snapshot_retention_days: modelSnapshotRetentionDays };
  }
  return {};
}

function extractDailyModelSnapshotRetentionAfterDays(job, newJobData) {
  const dailyModelSnapshotRetentionAfterDays = newJobData.dailyModelSnapshotRetentionAfterDays;
  if (dailyModelSnapshotRetentionAfterDays !== job.daily_model_snapshot_retention_after_days) {
    return { daily_model_snapshot_retention_after_days: dailyModelSnapshotRetentionAfterDays };
  }
  return {};
}

function extractDetectorDescriptions(job, newJobData) {
  const detectors = [];
  const descriptions = newJobData.detectorDescriptions.map((d, i) => ({
    detector_index: i,
    description: d,
  }));

  const originalDetectors = job.analysis_config.detectors;
  originalDetectors.forEach((d) => {
    if (descriptions[d.detector_index].description !== d.detector_description) {
      detectors.push(descriptions[d.detector_index]);
    }
  });

  return detectors.length ? { detectors } : {};
}

function extractCustomSettings(job, newJobData) {
  const settingsData = {};
  if (newJobData && newJobData.customUrls) {
    settingsData.custom_settings = job.custom_settings || {};
    settingsData.custom_settings.custom_urls = newJobData.customUrls;
  }
  return settingsData;
}

function extractDatafeed(job, newDatafeedData) {
  const datafeedData = {};
  if (job.datafeed_config !== undefined) {
    const origQueryString = JSON.stringify(job.datafeed_config.query);
    const newQuery = JSON.parse(newDatafeedData.datafeedQuery);
    const newQueryString = JSON.stringify(newQuery);

    if (origQueryString !== newQueryString) {
      datafeedData.query = newQuery;
    }

    if (job.datafeed_config.query_delay !== newDatafeedData.datafeedQueryDelay) {
      datafeedData.query_delay = newDatafeedData.datafeedQueryDelay;
    }

    if (
      job.datafeed_config.frequency !== newDatafeedData.datafeedFrequency &&
      newDatafeedData.datafeedFrequency !== ''
    ) {
      datafeedData.frequency = newDatafeedData.datafeedFrequency;
    }

    if (job.datafeed_config.scroll_size !== newDatafeedData.datafeedScrollSize) {
      datafeedData.scroll_size = newDatafeedData.datafeedScrollSize;
    }
  }

  return datafeedData;
}

function processCustomSettings(jobData, datafeedData) {
  // remove the created_by setting if parts of the job contain
  // fields which won't be retained when cloned in a wizard
  let customSettings = {};
  if (jobData.custom_settings !== undefined) {
    customSettings = { ...jobData.custom_settings };

    if (
      jobData.custom_settings.created_by !== undefined &&
      (jobData.detectors !== undefined || Object.keys(datafeedData).length)
    ) {
      processCreatedBy(customSettings);
    }
  }

  return customSettings;
}
