/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { mockHttpRequest, pageHelpers } from './helpers';

import moment from 'moment-timezone';
import { setHttp, init as initDocumentation } from '../../crud_app/services';
import { docLinksServiceMock, coreMock } from '../../../../../../src/core/public/mocks';

const { setup } = pageHelpers.jobCreate;

describe('Create Rollup Job, step 2: Date histogram', () => {
  let find;
  let exists;
  let actions;
  let goToStep;
  let form;
  let getEuiStepsHorizontalActive;
  let startMock;

  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    startMock = coreMock.createStart();
    setHttp(startMock.http);
    initDocumentation(docLinksServiceMock.createStartContract());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    // Set "default" mock responses by not providing any arguments
    mockHttpRequest(startMock.http);

    ({ find, exists, actions, form, getEuiStepsHorizontalActive, goToStep } = setup());
  });

  afterEach(() => {
    startMock.http.get.mockClear();
    startMock.http.post.mockClear();
    startMock.http.put.mockClear();
  });

  describe('layout', () => {
    beforeEach(async () => {
      await goToStep(2);
    });

    it('should have the horizontal step active on "Date histogram"', () => {
      expect(getEuiStepsHorizontalActive()).toContain('Date histogram');
    });

    it('should have the title set to "Date histogram"', () => {
      expect(exists('rollupJobCreateDateHistogramTitle')).toBe(true);
    });

    it('should have a link to the documentation', () => {
      expect(exists('rollupJobCreateDateHistogramDocsButton')).toBe(true);
    });

    it('should have the "next" and "back" button visible', () => {
      expect(exists('rollupJobBackButton')).toBe(true);
      expect(exists('rollupJobNextButton')).toBe(true);
      expect(exists('rollupJobSaveButton')).toBe(false);
    });

    it('should go to the "Logistics" step when clicking the back button', async () => {
      actions.clickPreviousStep();
      expect(getEuiStepsHorizontalActive()).toContain('Logistics');
    });
  });

  describe('Date field select', () => {
    it('should set the options value from the index pattern', async () => {
      const dateFields = ['field1', 'field2', 'field3'];
      mockHttpRequest(startMock.http, { indxPatternVldtResp: { dateFields } });

      await goToStep(2);

      const dateFieldSelectOptionsValues = find('rollupJobCreateDateFieldSelect')
        .find('option')
        .map((option) => option.text());
      expect(dateFieldSelectOptionsValues).toEqual(dateFields);
    });

    it('should sort the options in ascending order', async () => {
      const dateFields = ['field3', 'field2', 'field1'];
      mockHttpRequest(startMock.http, { indxPatternVldtResp: { dateFields } });

      await goToStep(2);

      const dateFieldSelectOptionsValues = find('rollupJobCreateDateFieldSelect')
        .find('option')
        .map((option) => option.text());
      expect(dateFieldSelectOptionsValues).toEqual(dateFields.sort());
    });
  });

  describe('time zone', () => {
    it('should have a select with all the timezones', async () => {
      await goToStep(2);

      const timeZoneSelect = find('rollupJobCreateTimeZoneSelect');
      const options = timeZoneSelect.find('option').map((option) => option.text());
      expect(options).toEqual(moment.tz.names());
    });
  });

  describe('form validation', () => {
    beforeEach(async () => {
      await goToStep(2);
    });

    it('should display errors when clicking "next" without filling the form', () => {
      expect(exists('rollupJobCreateStepError')).toBeFalsy();

      actions.clickNextStep();

      expect(exists('rollupJobCreateStepError')).toBeTruthy();
      expect(form.getErrorsMessages()).toEqual(['Interval is required.']);
      expect(find('rollupJobNextButton').props().disabled).toBe(true);
    });

    describe('interval', () => {
      afterEach(() => {
        expect(find('rollupJobNextButton').props().disabled).toBe(true);
      });

      it('should validate the interval format', () => {
        form.setInputValue('rollupJobInterval', 'abc');
        actions.clickNextStep();
        expect(form.getErrorsMessages()).toContain('Invalid interval format.');
      });

      it('should validate the calendar format', () => {
        form.setInputValue('rollupJobInterval', '3y');
        actions.clickNextStep();
        expect(form.getErrorsMessages()).toContain(`The 'y' unit only allows values of 1. Try 1y.`);
      });
    });
  });
});
