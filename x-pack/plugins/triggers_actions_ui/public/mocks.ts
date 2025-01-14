/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ValidatedEmail } from '../../actions/common';
import type { TriggersAndActionsUIPublicPluginStart } from './plugin';

import { getAddConnectorFlyoutLazy } from './common/get_add_connector_flyout';
import { getEditConnectorFlyoutLazy } from './common/get_edit_connector_flyout';
import { getAddAlertFlyoutLazy } from './common/get_add_alert_flyout';
import { getEditAlertFlyoutLazy } from './common/get_edit_alert_flyout';
import { RegistrationServices } from './application/components/builtin_action_types';
import { TypeRegistry } from './application/type_registry';
import {
  ActionTypeModel,
  AlertAddProps,
  AlertEditProps,
  AlertTypeModel,
  ConnectorAddFlyoutProps,
  ConnectorEditFlyoutProps,
} from './types';

function createStartMock(): TriggersAndActionsUIPublicPluginStart {
  const actionTypeRegistry = new TypeRegistry<ActionTypeModel>();
  const ruleTypeRegistry = new TypeRegistry<AlertTypeModel>();
  return {
    actionTypeRegistry,
    ruleTypeRegistry,
    getAddConnectorFlyout: (props: Omit<ConnectorAddFlyoutProps, 'actionTypeRegistry'>) => {
      return getAddConnectorFlyoutLazy({ ...props, actionTypeRegistry });
    },
    getEditConnectorFlyout: (props: Omit<ConnectorEditFlyoutProps, 'actionTypeRegistry'>) => {
      return getEditConnectorFlyoutLazy({
        ...props,
        actionTypeRegistry,
      });
    },
    getAddAlertFlyout: (props: Omit<AlertAddProps, 'actionTypeRegistry' | 'ruleTypeRegistry'>) => {
      return getAddAlertFlyoutLazy({
        ...props,
        actionTypeRegistry,
        ruleTypeRegistry,
      });
    },
    getEditAlertFlyout: (
      props: Omit<AlertEditProps, 'actionTypeRegistry' | 'ruleTypeRegistry'>
    ) => {
      return getEditAlertFlyoutLazy({
        ...props,
        actionTypeRegistry,
        ruleTypeRegistry,
      });
    },
  };
}

export const triggersActionsUiMock = {
  createStart: createStartMock,
};

function validateEmailAddresses(addresses: string[]): ValidatedEmail[] {
  return addresses.map((address) => ({ address, valid: true }));
}

export const registrationServicesMock: RegistrationServices = { validateEmailAddresses };
