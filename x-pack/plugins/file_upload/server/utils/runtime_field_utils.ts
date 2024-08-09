/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { estypes } from '@elastic/elasticsearch';
import { RUNTIME_FIELD_TYPES } from '../../../../../src/plugins/data/common';

type RuntimeType = typeof RUNTIME_FIELD_TYPES[number];

export const isPopulatedObject = <U extends string = string>(
  arg: unknown,
  requiredAttributes: U[] = []
): arg is Record<U, unknown> => {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    Object.keys(arg).length > 0 &&
    (requiredAttributes.length === 0 ||
      requiredAttributes.every((d) => ({}.hasOwnProperty.call(arg, d))))
  );
};

export function isRuntimeField(arg: unknown): arg is estypes.MappingRuntimeField {
  return (
    ((isPopulatedObject(arg, ['type']) && Object.keys(arg).length === 1) ||
      (isPopulatedObject(arg, ['type', 'script']) &&
        // Can be a string
        (typeof arg.script === 'string' ||
          // Can be InlineScript
          (isPopulatedObject(arg.script, ['source']) && typeof arg.script.source === 'string') ||
          // Can be StoredScriptId
          (isPopulatedObject(arg.script, ['id']) && typeof arg.script.id === 'string')))) &&
    RUNTIME_FIELD_TYPES.includes(arg.type as RuntimeType)
  );
}

export function isRuntimeMappings(arg: unknown): arg is estypes.MappingRuntimeFields {
  return isPopulatedObject(arg) && Object.values(arg).every((d) => isRuntimeField(d));
}