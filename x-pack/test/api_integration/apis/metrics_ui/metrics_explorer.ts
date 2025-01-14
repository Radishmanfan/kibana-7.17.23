/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import { first } from 'lodash';
import moment from 'moment';
import { DATES } from './constants';
import { FtrProviderContext } from '../../ftr_provider_context';
import { metricsExplorerResponseRT } from '../../../../plugins/infra/common/http_api/metrics_explorer';
import { decodeOrThrow } from '../../../../plugins/infra/common/runtime_types';

const { min, max } = DATES['7.0.0'].hosts;

export default function ({ getService }: FtrProviderContext) {
  const supertest = getService('supertest');
  const esArchiver = getService('esArchiver');

  describe('Metrics Explorer API', () => {
    describe('with data', () => {
      before(() => esArchiver.load('x-pack/test/functional/es_archives/infra/7.0.0/hosts'));
      after(() => esArchiver.unload('x-pack/test/functional/es_archives/infra/7.0.0/hosts'));

      it('should work for multiple metrics', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: max,
            from: min,
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          metrics: [
            {
              aggregation: 'avg',
              field: 'system.cpu.user.pct',
            },
            {
              aggregation: 'count',
            },
          ],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(1);
        const firstSeries = first(body.series) as any;
        expect(firstSeries).to.have.property('id', '*');
        expect(firstSeries.columns).to.eql([
          { name: 'timestamp', type: 'date' },
          { name: 'metric_0', type: 'number' },
          { name: 'metric_1', type: 'number' },
        ]);
        expect(firstSeries.rows).to.have.length(8);
      });

      it('should apply filterQuery to data', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: max,
            from: min,
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          filterQuery:
            '{"bool":{"should":[{"range":{"system.cpu.user.pct":{"gt":0.01}}}],"minimum_should_match":1}}',
          metrics: [
            {
              aggregation: 'avg',
              field: 'system.cpu.user.pct',
            },
          ],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(1);
        const firstSeries = first(body.series) as any;
        expect(firstSeries).to.have.property('id', '*');
        expect(firstSeries.columns).to.eql([
          { name: 'timestamp', type: 'date' },
          { name: 'metric_0', type: 'number' },
        ]);
        expect(firstSeries.rows).to.have.length(8);
      });

      it('should work for empty metrics', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: max,
            from: min,
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          metrics: [],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(1);
        const firstSeries = first(body.series) as any;
        expect(firstSeries).to.have.property('id', '*');
        expect(firstSeries.columns).to.eql([]);
        expect(firstSeries.rows).to.have.length(0);
      });

      it('should work with groupBy', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: max,
            from: min,
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          groupBy: 'event.dataset',
          limit: 3,
          afterKey: 'system.cpu',
          metrics: [
            {
              aggregation: 'count',
            },
          ],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(3);
        const firstSeries = first(body.series) as any;
        expect(firstSeries).to.have.property('id', 'system.diskio');
        expect(firstSeries.columns).to.eql([
          { name: 'timestamp', type: 'date' },
          { name: 'metric_0', type: 'number' },
          { name: 'groupBy', type: 'string' },
        ]);
        expect(firstSeries.rows).to.have.length(8);
        expect(body.pageInfo).to.eql({
          afterKey: { groupBy0: 'system.fsstat' },
          total: 12,
        });
      });

      it('should work with multiple groupBy', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: max,
            from: min,
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          groupBy: ['host.name', 'system.network.name'],
          limit: 3,
          afterKey: null,
          metrics: [
            {
              aggregation: 'rate',
              field: 'system.network.out.bytes',
            },
          ],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(3);
        const firstSeries = first(body.series) as any;
        expect(firstSeries).to.have.property('id', 'demo-stack-mysql-01 / eth0');
        expect(firstSeries.columns).to.eql([
          { name: 'timestamp', type: 'date' },
          { name: 'metric_0', type: 'number' },
          { name: 'groupBy', type: 'string' },
        ]);
        expect(firstSeries.rows).to.have.length(8);
        expect(body.pageInfo).to.eql({
          afterKey: { groupBy0: 'demo-stack-mysql-01', groupBy1: 'eth2' },
          total: 4,
        });
      });

      it('should return 400 when requesting more than 20 metrics', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: max,
            from: min,
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          groupBy: ['host.name', 'system.network.name'],
          limit: 3,
          afterKey: null,
          metrics: Array(21).fill({
            aggregation: 'rate',
            field: 'system.network.out.bytes',
          }),
        };

        await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(400);
      });
    });

    describe('without data', () => {
      it('should work when there is no data', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: moment().valueOf(),
            from: moment().subtract(15, 'm').valueOf(),
            interval: '>=1m',
          },
          indexPattern: 'metricbeat-*',
          metrics: [
            {
              aggregation: 'avg',
              field: 'system.cpu.user.pct',
            },
          ],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(0);
      });
      it('should work when there is no data with groupBy', async () => {
        const postBody = {
          timerange: {
            field: '@timestamp',
            to: moment().valueOf(),
            from: moment().subtract(15, 'm').valueOf(),
            interval: '>=1m',
          },
          groupBy: 'host.name',
          indexPattern: 'metricbeat-*',
          metrics: [
            {
              aggregation: 'avg',
              field: 'system.cpu.user.pct',
            },
          ],
        };
        const response = await supertest
          .post('/api/infra/metrics_explorer')
          .set('kbn-xsrf', 'xxx')
          .send(postBody)
          .expect(200);
        const body = decodeOrThrow(metricsExplorerResponseRT)(response.body);
        expect(body.series).length(0);
        expect(body.pageInfo).to.eql({
          afterKey: null,
          total: 0,
        });
      });
    });
  });
}
