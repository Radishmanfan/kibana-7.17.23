/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { HttpSetup } from 'src/core/public';
import { createNodeAllocationActions, createTogglePhaseAction } from '../../../helpers';
import { initTestBed } from '../../init_test_bed';

type SetupReturn = ReturnType<typeof setupWarmPhaseNodeAllocation>;

export type NodeAllocationTestBed = SetupReturn extends Promise<infer U> ? U : SetupReturn;

export const setupWarmPhaseNodeAllocation = async (httpSetup: HttpSetup) => {
  const testBed = await initTestBed(httpSetup);

  return {
    ...testBed,
    actions: {
      togglePhase: () => createTogglePhaseAction(testBed)('warm'),
      ...createNodeAllocationActions(testBed, 'warm'),
    },
  };
};