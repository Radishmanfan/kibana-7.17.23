/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const execSync = require('child_process').execSync;
const fs = require('fs');
// eslint-disable-next-line import/no-unresolved
const { areChangesSkippable, doAnyChangesMatch } = require('kibana-buildkite-library');
const { SKIPPABLE_PR_MATCHERS } = require('./skippable_pr_matchers');

const REQUIRED_PATHS = [
  // this file is auto-generated and changes to it need to be validated with CI
  /^docs\/developer\/plugin-list.asciidoc$/,
  // don't skip CI on prs with changes to plugin readme files /i is for case-insensitive matching
  /\/plugins\/[^\/]+\/readme\.(md|asciidoc)$/i,
];

const getPipeline = (filename, removeSteps = true) => {
  const str = fs.readFileSync(filename).toString();
  return removeSteps ? str.replace(/^steps:/, '') : str;
};

(async () => {
  try {
    const skippable = await areChangesSkippable(SKIPPABLE_PR_MATCHERS, REQUIRED_PATHS);

    if (skippable) {
      console.log('All changes in PR are skippable. Skipping CI.');

      // Since we skip everything, including post-build, we need to at least make sure the commit status gets set
      execSync('BUILD_SUCCESSFUL=true .buildkite/scripts/lifecycle/commit_status_complete.sh', {
        stdio: 'inherit',
      });
      process.exit(0);
    }

    const pipeline = [];

    pipeline.push(getPipeline('.buildkite/pipelines/pull_request/base.yml', false));

    if (
      (await doAnyChangesMatch([
        /^x-pack\/plugins\/lists/,
        /^x-pack\/plugins\/security_solution/,
        /^x-pack\/plugins\/timelines/,
        /^x-pack\/plugins\/triggers_actions_ui\/public\/application\/sections\/action_connector_form/,
        /^x-pack\/plugins\/triggers_actions_ui\/public\/application\/context\/actions_connectors_context\.tsx/,
        /^x-pack\/test\/security_solution_cypress/,
      ])) ||
      process.env.GITHUB_PR_LABELS.includes('ci:all-cypress-suites')
    ) {
      pipeline.push(getPipeline('.buildkite/pipelines/pull_request/security_solution.yml'));
    }

    if (
      (await doAnyChangesMatch([
        /^src\/plugins\/data/,
        /^x-pack\/plugins\/actions/,
        /^x-pack\/plugins\/alerting/,
        /^x-pack\/plugins\/event_log/,
        /^x-pack\/plugins\/rule_registry/,
        /^x-pack\/plugins\/task_manager/,
      ])) ||
      process.env.GITHUB_PR_LABELS.includes('ci:all-cypress-suites')
    ) {
      pipeline.push(getPipeline('.buildkite/pipelines/pull_request/response_ops.yml'));
    }

    if (
      (await doAnyChangesMatch([/^x-pack\/plugins\/apm/])) ||
      process.env.GITHUB_PR_LABELS.includes('ci:all-cypress-suites')
    ) {
      pipeline.push(getPipeline('.buildkite/pipelines/pull_request/apm_cypress.yml'));
    }

    if (await doAnyChangesMatch([/^x-pack\/plugins\/uptime/])) {
      pipeline.push(getPipeline('.buildkite/pipelines/pull_request/uptime.yml'));
    }

    pipeline.push(getPipeline('.buildkite/pipelines/pull_request/post_build.yml'));

    console.log([...new Set(pipeline)].join('\n'));
  } catch (ex) {
    console.error('Error while generating the pipeline steps: ' + ex.message, ex);
    process.exit(1);
  }
})();