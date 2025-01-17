/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import testSubjSelector from '@kbn/test-subj-selector';

import { FtrProviderContext } from '../ftr_provider_context';

export function InfraHomePageProvider({ getService, getPageObjects }: FtrProviderContext) {
  const testSubjects = getService('testSubjects');
  const retry = getService('retry');
  const find = getService('find');
  const pageObjects = getPageObjects(['common']);
  const comboBox = getService('comboBox');

  return {
    async goToTime(time: string) {
      const datePickerInput = await find.byCssSelector(
        `${testSubjSelector('waffleDatePicker')} .euiDatePicker.euiFieldText`
      );

      // explicitly focus to trigger tooltip
      await datePickerInput.focus();

      await datePickerInput.clearValueWithKeyboard({ charByChar: true });
      await datePickerInput.type(time);

      // dismiss the tooltip, which won't be hidden because blur doesn't happen reliably
      await testSubjects.click('waffleDatePickerIntervalTooltip');

      await this.waitForLoading();
    },

    async getWaffleMap() {
      await retry.try(async () => {
        const element = await testSubjects.find('waffleMap');
        if (!element) {
          throw new Error();
        }
      });
      return await testSubjects.find('waffleMap');
    },

    async getWaffleMapTooltips() {
      const node = await testSubjects.findAll('nodeContainer');
      await node[0].moveMouseTo();
      const tooltip = await testSubjects.find('conditionalTooltipContent-demo-stack-redis-01');
      const metrics = await tooltip.findAllByTestSubject('conditionalTooltipContent-metric');
      const values = await tooltip.findAllByTestSubject('conditionalTooltipContent-value');
      expect(await metrics[0].getVisibleText()).to.be('CPU usage');
      expect(await values[0].getVisibleText()).to.be('1%');
      expect(await metrics[1].getVisibleText()).to.be('Memory usage');
      expect(await values[1].getVisibleText()).to.be('15.9%');
      expect(await metrics[2].getVisibleText()).to.be('Outbound traffic');
      expect(await values[2].getVisibleText()).to.be('71.9kbit/s');
      expect(await metrics[3].getVisibleText()).to.be('Inbound traffic');
      expect(await values[3].getVisibleText()).to.be('25.6kbit/s');
      await node[1].moveMouseTo();
      const tooltip2 = await testSubjects.find('conditionalTooltipContent-demo-stack-nginx-01');
      const metrics2 = await tooltip2.findAllByTestSubject('conditionalTooltipContent-metric');
      const values2 = await tooltip2.findAllByTestSubject('conditionalTooltipContent-value');
      expect(await metrics2[0].getVisibleText()).to.be('CPU usage');
      expect(await values2[0].getVisibleText()).to.be('1.1%');
      expect(await metrics2[1].getVisibleText()).to.be('Memory usage');
      expect(await values2[1].getVisibleText()).to.be('18%');
      expect(await metrics2[2].getVisibleText()).to.be('Outbound traffic');
      expect(await values2[2].getVisibleText()).to.be('256.3kbit/s');
      expect(await metrics2[3].getVisibleText()).to.be('Inbound traffic');
      expect(await values2[3].getVisibleText()).to.be('255.1kbit/s');
    },

    async openInvenotrySwitcher() {
      await testSubjects.click('openInventorySwitcher');
      return await testSubjects.find('goToHost');
    },

    async goToHost() {
      await testSubjects.click('openInventorySwitcher');
      await testSubjects.find('goToHost');
      return await testSubjects.click('goToHost');
    },

    async goToPods() {
      await testSubjects.click('openInventorySwitcher');
      await testSubjects.find('goToHost');
      return await testSubjects.click('goToPods');
    },

    async goToDocker() {
      await testSubjects.click('openInventorySwitcher');
      await testSubjects.find('goToHost');
      return await testSubjects.click('goToDocker');
    },

    async goToSettings() {
      await pageObjects.common.navigateToUrlWithBrowserHistory(
        'infraOps',
        `/settings`,
        undefined,
        { ensureCurrentUrl: false } // Test runner struggles with `rison-node` escaped values
      );
    },

    async goToInventory() {
      await pageObjects.common.navigateToUrlWithBrowserHistory(
        'infraOps',
        `/inventory`,
        undefined,
        { ensureCurrentUrl: false } // Test runner struggles with `rison-node` escaped values
      );
    },

    async goToMetricExplorer() {
      await pageObjects.common.navigateToUrlWithBrowserHistory(
        'infraOps',
        `/explorer`,
        undefined,
        { ensureCurrentUrl: false } // Test runner struggles with `rison-node` escaped values
      );
    },

    async getSaveViewButton() {
      return await testSubjects.find('openSaveViewModal');
    },

    async getLoadViewsButton() {
      return await testSubjects.find('loadViews');
    },

    async openSaveViewsFlyout() {
      return await testSubjects.click('loadViews');
    },

    async closeSavedViewFlyout() {
      return await testSubjects.click('cancelSavedViewModal');
    },

    async openCreateSaveViewModal() {
      return await testSubjects.click('openSaveViewModal');
    },

    async openEnterViewNameAndSave() {
      await testSubjects.setValue('savedViewViweName', 'View1');
      await testSubjects.click('createSavedViewButton');
    },

    async getNoMetricsIndicesPrompt() {
      return await testSubjects.find('noDataPage');
    },

    async getNoMetricsDataPrompt() {
      return await testSubjects.find('noMetricsDataPrompt');
    },

    async openSourceConfigurationFlyout() {
      await testSubjects.click('configureSourceButton');
      await testSubjects.exists('sourceConfigurationFlyout');
    },

    async waitForLoading() {
      await testSubjects.missingOrFail('loadingMessage', { timeout: 20000 });
    },

    async openAnomalyFlyout() {
      await testSubjects.click('openAnomalyFlyoutButton');
      await testSubjects.exists('loadMLFlyout');
    },
    async closeFlyout() {
      await testSubjects.click('euiFlyoutCloseButton');
    },
    async goToAnomaliesTab() {
      await testSubjects.click('anomalyFlyoutAnomaliesTab');
    },
    async getNoAnomaliesMsg() {
      await testSubjects.find('noAnomaliesFoundMsg');
    },
    async clickHostsAnomaliesDropdown() {
      await testSubjects.click('anomaliesComboBoxType');
      await testSubjects.click('anomaliesHostComboBoxItem');
    },
    async clickK8sAnomaliesDropdown() {
      await testSubjects.click('anomaliesComboBoxType');
      await testSubjects.click('anomaliesK8sComboBoxItem');
    },
    async findAnomalies() {
      return testSubjects.findAll('anomalyRow');
    },
    async setAnomaliesDate(date: string) {
      await testSubjects.click('superDatePickerShowDatesButton');
      await testSubjects.click('superDatePickerstartDatePopoverButton');
      await testSubjects.click('superDatePickerAbsoluteTab');
      const datePickerInput = await testSubjects.find('superDatePickerAbsoluteDateInput');
      await datePickerInput.clearValueWithKeyboard();
      await datePickerInput.type([date]);
    },
    async setAnomaliesThreshold(threshold: string) {
      const thresholdInput = await find.byCssSelector(
        `.euiFieldNumber.euiRangeInput.euiRangeInput--max`
      );
      await thresholdInput.clearValueWithKeyboard({ charByChar: true });
      await thresholdInput.type([threshold]);
    },

    async clickAlertsAndRules() {
      await testSubjects.click('infrastructure-alerts-and-rules');
    },

    async ensurePopoverOpened() {
      await testSubjects.existOrFail('metrics-alert-menu');
    },

    async ensurePopoverClosed() {
      await testSubjects.missingOrFail('metrics-alert-menu');
    },

    async dismissDatePickerTooltip() {
      const isTooltipOpen = await testSubjects.exists(`waffleDatePickerIntervalTooltip`, {
        timeout: 1000,
      });

      if (isTooltipOpen) {
        await testSubjects.click(`waffleDatePickerIntervalTooltip`);
      }
    },

    async openInventoryAlertFlyout() {
      await this.dismissDatePickerTooltip();
      await testSubjects.click('infrastructure-alerts-and-rules');
      await testSubjects.click('inventory-alerts-menu-option');

      // forces date picker tooltip to close in case it pops up after Alerts and rules opens
      await testSubjects.moveMouseTo('contextMenuPanelTitleButton');

      await retry.tryForTime(1000, () => testSubjects.click('inventory-alerts-create-rule'));
      await testSubjects.missingOrFail('inventory-alerts-create-rule', { timeout: 30000 });
    },

    async openMetricsThresholdAlertFlyout() {
      await this.dismissDatePickerTooltip();
      await testSubjects.click('infrastructure-alerts-and-rules');
      await testSubjects.click('metrics-threshold-alerts-menu-option');

      // forces date picker tooltip to close in case it pops up after Alerts and rules opens
      await testSubjects.moveMouseTo('contextMenuPanelTitleButton');

      await retry.tryForTime(1000, () =>
        testSubjects.click('metrics-threshold-alerts-create-rule')
      );
      await testSubjects.missingOrFail('metrics-threshold-alerts-create-rule', { timeout: 30000 });
    },

    async closeAlertFlyout() {
      await testSubjects.click('euiFlyoutCloseButton');
    },
    async clickCustomMetricDropdown() {
      await testSubjects.click('infraInventoryMetricDropdown');
    },

    async addCustomMetric(field: string) {
      await testSubjects.click('infraModeSwitcherAddMetricButton');
      const groupByCustomField = await testSubjects.find('infraCustomMetricFieldSelect');
      await comboBox.setElement(groupByCustomField, field);
      await testSubjects.click('infraCustomMetricFormSaveButton');
    },

    async getMetricsContextMenuItemsCount() {
      const contextMenu = await testSubjects.find('infraInventoryMetricsContextMenu');
      const menuItems = await contextMenu.findAllByCssSelector('button.euiContextMenuItem');
      return menuItems.length;
    },

    async ensureCustomMetricAddButtonIsDisabled() {
      const button = await testSubjects.find('infraModeSwitcherAddMetricButton');
      expect(await button.getAttribute('disabled')).to.be('true');
    },
  };
}
