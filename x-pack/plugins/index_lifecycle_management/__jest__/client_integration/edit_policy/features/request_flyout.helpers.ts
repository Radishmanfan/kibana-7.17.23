/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { HttpSetup } from 'src/core/public';
import {
  createFormSetValueAction,
  createMinAgeActions,
  createTogglePhaseAction,
  createRequestFlyoutActions,
  createFormToggleAction,
} from '../../helpers';
import { initTestBed } from '../init_test_bed';

type SetupReturn = ReturnType<typeof setupRequestFlyoutTestBed>;

export type RequestFlyoutTestBed = SetupReturn extends Promise<infer U> ? U : SetupReturn;

export const setupRequestFlyoutTestBed = async (httpSetup: HttpSetup, isNewPolicy?: boolean) => {
  const testBed = isNewPolicy
    ? await initTestBed(httpSetup, {
        testBedConfig: { memoryRouter: { initialEntries: ['/policies/edit'] } },
      })
    : await initTestBed(httpSetup);

  return {
    ...testBed,
    actions: {
      togglePhase: createTogglePhaseAction(testBed),
      setPolicyName: createFormSetValueAction(testBed, 'policyNameField'),
      toggleSaveAsNewPolicy: createFormToggleAction(testBed, 'saveAsNewSwitch'),
      warm: {
        ...createMinAgeActions(testBed, 'warm'),
      },
      ...createRequestFlyoutActions(testBed),
    },
  };
};
