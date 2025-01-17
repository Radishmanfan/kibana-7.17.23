/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import supertest from 'supertest';
import { JobParamsDownloadCSV } from '../../../plugins/reporting/server/export_types/csv_searchsource_immediate/types';
import { FtrProviderContext } from '../ftr_provider_context';

const getMockJobParams = (obj: object) => {
  return {
    title: `Mock CSV Title`,
    ...obj,
  } as JobParamsDownloadCSV;
};

// eslint-disable-next-line import/no-default-export
export default function ({ getService }: FtrProviderContext) {
  const kibanaServer = getService('kibanaServer');
  const esArchiver = getService('esArchiver');
  const supertestSvc = getService('supertest');
  const reportingAPI = getService('reportingAPI');
  const esVersion = getService('esVersion');

  const generateAPI = {
    getCSVFromSearchSource: async (job: JobParamsDownloadCSV) => {
      return await supertestSvc
        .post(`/api/reporting/v1/generate/immediate/csv_searchsource`)
        .set('kbn-xsrf', 'xxx')
        .send(job);
    },
  };

  const fromTime = '2019-06-20T00:00:00.000Z';
  const toTime = '2019-06-25T00:00:00.000Z';

  const itIfEs7 = esVersion.matchRange('<8') ? it : it.skip;
  const itIfEs8 = esVersion.matchRange('>=8') ? it : it.skip;

  describe('CSV Generation from SearchSource', function () {
    before(async () => {
      await kibanaServer.uiSettings.update({
        'csv:quoteValues': false,
        'dateFormat:tz': 'UTC',
        defaultIndex: 'logstash-*',
      });
      await reportingAPI.initEcommerce();
    });
    after(async () => {
      await reportingAPI.teardownEcommerce();
      await reportingAPI.deleteAllReports();
    });

    describe('Exports CSV with almost all fields when using fieldsFromSource', () => {
      let resText: string;
      before(async () => {
        const {
          status: resStatus,
          type: resType,
          text,
        } = (await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              query: { query: '', language: 'kuery' },
              index: '5193f870-d861-11e9-a311-0fa548c5f953',
              sort: [{ order_date: 'desc' }],
              fieldsFromSource: [
                '_id',
                '_index',
                '_score',
                '_source',
                'category',
                'category.keyword',
                'currency',
                'customer_birth_date',
                'customer_first_name',
                'customer_first_name.keyword',
                'customer_full_name',
                'customer_full_name.keyword',
                'customer_gender',
                'customer_id',
                'customer_last_name',
                'customer_last_name.keyword',
                'customer_phone',
                'day_of_week',
                'day_of_week_i',
                'email',
                'geoip.city_name',
                'geoip.continent_name',
                'geoip.country_iso_code',
                'geoip.location',
                'geoip.region_name',
                'manufacturer',
                'manufacturer.keyword',
                'order_date',
                'order_id',
                'products._id',
                'products._id.keyword',
                'products.base_price',
                'products.base_unit_price',
                'products.category',
                'products.category.keyword',
                'products.created_on',
                'products.discount_amount',
                'products.discount_percentage',
                'products.manufacturer',
                'products.manufacturer.keyword',
                'products.min_price',
                'products.price',
                'products.product_id',
                'products.product_name',
                'products.product_name.keyword',
                'products.quantity',
                'products.sku',
                'products.tax_amount',
                'products.taxful_price',
                'products.taxless_price',
                'products.unit_discount_amount',
                'sku',
                'taxful_total_price',
                'taxless_total_price',
                'total_quantity',
                'total_unique_products',
                'type',
                'user',
              ],
              filter: [],
              parent: {
                query: { language: 'kuery', query: '' },
                filter: [],
                parent: {
                  filter: [
                    {
                      meta: { index: '5193f870-d861-11e9-a311-0fa548c5f953', params: {} },
                      range: {
                        order_date: {
                          gte: fromTime,
                          lte: toTime,
                          format: 'strict_date_optional_time',
                        },
                      },
                    },
                  ],
                },
              },
            },
            browserTimezone: 'UTC',
            title: 'testfooyu78yt90-',
          })
        )) as supertest.Response;
        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        resText = text;
      });

      itIfEs7('(ES 7)', async () => {
        expectSnapshot(resText).toMatch();
      });

      itIfEs8('(ES 8)', async () => {
        expectSnapshot(resText).toMatch();
      });
    });

    describe('Exports CSV with all fields when using defaults', () => {
      let resText: string;
      before(async () => {
        const {
          status: resStatus,
          type: resType,
          text,
        } = await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              query: { query: '', language: 'kuery' },
              index: '5193f870-d861-11e9-a311-0fa548c5f953',
              sort: [{ order_date: 'desc' }],
              fields: ['*'],
              filter: [],
              parent: {
                query: { language: 'kuery', query: '' },
                filter: [],
                parent: {
                  filter: [
                    {
                      meta: { index: '5193f870-d861-11e9-a311-0fa548c5f953', params: {} },
                      range: {
                        order_date: {
                          gte: fromTime,
                          lte: toTime,
                          format: 'strict_date_optional_time',
                        },
                      },
                    },
                  ],
                },
              },
            },
            browserTimezone: 'UTC',
            title: 'testfooyu78yt90-',
          })
        );
        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        resText = text;
      });

      itIfEs7('(ES 7)', async () => {
        expectSnapshot(resText).toMatch();
      });

      itIfEs8('(ES 8)', async () => {
        expectSnapshot(resText).toMatch();
      });
    });

    const describeIfEs7 = esVersion.matchRange('<8') ? describe : describe.skip;
    describeIfEs7('date formatting', () => {
      before(async () => {
        // load test data that contains a saved search and documents
        await esArchiver.load('x-pack/test/functional/es_archives/reporting/logs');
        await esArchiver.load('x-pack/test/functional/es_archives/logstash_functional');
      });
      after(async () => {
        await esArchiver.unload('x-pack/test/functional/es_archives/reporting/logs');
        await esArchiver.unload('x-pack/test/functional/es_archives/logstash_functional');
      });

      it('With filters and timebased data, default to UTC', async () => {
        const res = (await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              fields: ['@timestamp', 'clientip', 'extension'],
              filter: [
                {
                  range: {
                    '@timestamp': {
                      gte: '2015-09-20T10:19:40.307Z',
                      lt: '2015-09-20T10:26:56.221Z',
                    },
                  },
                },
                {
                  range: {
                    '@timestamp': {
                      format: 'strict_date_optional_time',
                      gte: '2015-01-12T07:00:55.654Z',
                      lte: '2016-01-29T21:08:10.881Z',
                    },
                  },
                },
              ],
              index: 'logstash-*',
              query: { language: 'kuery', query: '' },
              sort: [{ '@timestamp': 'desc' }],
            },
            columns: ['@timestamp', 'clientip', 'extension'],
          })
        )) as supertest.Response;
        const { status: resStatus, text: resText, type: resType } = res;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        expectSnapshot(resText).toMatch();
      });

      it('With filters and timebased data, non-default timezone', async () => {
        const res = (await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            browserTimezone: 'America/Phoenix',
            searchSource: {
              fields: ['@timestamp', 'clientip', 'extension'],
              filter: [
                {
                  range: {
                    '@timestamp': {
                      gte: '2015-09-20T10:19:40.307Z',
                      lt: '2015-09-20T10:26:56.221Z',
                    },
                  },
                },
                {
                  range: {
                    '@timestamp': {
                      format: 'strict_date_optional_time',
                      gte: '2015-01-12T07:00:55.654Z',
                      lte: '2016-01-29T21:08:10.881Z',
                    },
                  },
                },
              ],
              index: 'logstash-*',
              query: { language: 'kuery', query: '' },
              sort: [{ '@timestamp': 'desc' }],
            },
            columns: ['@timestamp', 'clientip', 'extension'],
          })
        )) as supertest.Response;
        const { status: resStatus, text: resText, type: resType } = res;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        expectSnapshot(resText).toMatch();
      });

      it('Formatted date_nanos data, UTC timezone', async () => {
        await esArchiver.load('x-pack/test/functional/es_archives/reporting/nanos');

        const res = await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              query: { query: '', language: 'kuery' },
              version: true,
              index: '907bc200-a294-11e9-a900-ef10e0ac769e',
              sort: [{ date: 'desc' }],
              fields: ['date', 'message'],
              filter: [],
            },
            columns: ['date', 'message'],
          })
        );
        const { status: resStatus, text: resText, type: resType } = res;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        expectSnapshot(resText).toMatch();

        await esArchiver.unload('x-pack/test/functional/es_archives/reporting/nanos');
      });

      it('Formatted date_nanos data, custom timezone (New York)', async () => {
        await esArchiver.load('x-pack/test/functional/es_archives/reporting/nanos');

        const res = await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            browserTimezone: 'America/New_York',
            searchSource: {
              query: { query: '', language: 'kuery' },
              version: true,
              index: '907bc200-a294-11e9-a900-ef10e0ac769e',
              sort: [{ date: 'desc' }],
              fields: ['date', 'message'],
              filter: [],
            },
            columns: ['date', 'message'],
          })
        );
        const { status: resStatus, text: resText, type: resType } = res;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        expectSnapshot(resText).toMatch();

        await esArchiver.unload('x-pack/test/functional/es_archives/reporting/nanos');
      });
    });

    describeIfEs7('non-timebased', () => {
      it('Handle _id and _index columns', async () => {
        await esArchiver.load('x-pack/test/functional/es_archives/reporting/nanos');

        const res = await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              query: { query: '', language: 'kuery' },
              version: true,
              index: '907bc200-a294-11e9-a900-ef10e0ac769e',
              sort: [{ date: 'desc' }],
              filter: [],
            },
            columns: ['date', 'message', '_id', '_index'],
          })
        );
        const { status: resStatus, text: resText, type: resType } = res;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        expectSnapshot(resText).toMatch();

        await esArchiver.unload('x-pack/test/functional/es_archives/reporting/nanos');
      });

      it('With filters and non-timebased data', async () => {
        // load test data that contains a saved search and documents
        await esArchiver.load('x-pack/test/functional/es_archives/reporting/sales');

        const {
          status: resStatus,
          text: resText,
          type: resType,
        } = (await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              query: { query: '', language: 'kuery' },
              version: true,
              index: 'timeless-sales',
              sort: [{ power: 'asc' }],
              fields: ['name', 'power'],
              filter: [
                {
                  range: { power: { gte: 1, lt: null } },
                },
              ],
            },
            columns: ['name', 'power'],
          })
        )) as supertest.Response;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');
        expectSnapshot(resText).toMatch();

        await esArchiver.unload('x-pack/test/functional/es_archives/reporting/sales');
      });
    });

    describe('validation', () => {
      it('Return a 404', async () => {
        const { body } = (await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            searchSource: {
              index: 'gobbledygook',
            },
          })
        )) as supertest.Response;
        const expectedBody = {
          error: 'Not Found',
          message: 'Saved object [index-pattern/gobbledygook] not found',
          statusCode: 404,
        };
        expect(body).to.eql(expectedBody);
      });

      // NOTE: this test requires having the test server run with `xpack.reporting.csv.maxSizeBytes=6000`
      describe(`Searches large amount of data, stops at Max Size Reached`, () => {
        let resText: string;
        before(async () => {
          await reportingAPI.initEcommerce();

          const {
            status: resStatus,
            type: resType,
            text,
          } = (await generateAPI.getCSVFromSearchSource(
            getMockJobParams({
              searchSource: {
                version: true,
                query: { query: '', language: 'kuery' },
                index: '5193f870-d861-11e9-a311-0fa548c5f953',
                sort: [{ order_date: 'desc' }],
                fields: ['*'],
                filter: [],
                parent: {
                  query: { language: 'kuery', query: '' },
                  filter: [],
                  parent: {
                    filter: [
                      {
                        meta: { index: '5193f870-d861-11e9-a311-0fa548c5f953', params: {} },
                        range: {
                          order_date: {
                            gte: '2019-03-23T00:00:00.000Z',
                            lte: '2019-10-04T00:00:00.000Z',
                            format: 'strict_date_optional_time',
                          },
                        },
                      },
                    ],
                  },
                },
              },
              browserTimezone: 'UTC',
              title: 'Ecommerce Data',
            })
          )) as supertest.Response;

          expect(resStatus).to.eql(200);
          expect(resType).to.eql('text/csv');

          await reportingAPI.teardownEcommerce();
          resText = text;
        });

        itIfEs7('(ES 7)', async () => {
          expectSnapshot(resText).toMatch();
        });

        itIfEs8('(ES 8)', async () => {
          expectSnapshot(resText).toMatch();
        });
      });
    });

    describe('_id field is a big integer, passes through the value without mutation', () => {
      let resText: string;
      before(async () => {
        await kibanaServer.uiSettings.update({
          'csv:quoteValues': false,
          'dateFormat:tz': 'UTC',
          defaultIndex: 'logstash-*',
        });
        await esArchiver.load('x-pack/test/functional/es_archives/reporting/big_int_id_field');
        await kibanaServer.importExport.load(
          'x-pack/test/functional/fixtures/kbn_archiver/reporting/big_int_id_field'
        );
        const {
          status: resStatus,
          type: resType,
          text,
        } = (await generateAPI.getCSVFromSearchSource(
          getMockJobParams({
            browserTimezone: 'UTC',
            version: '8.6.0',
            searchSource: {
              query: { query: '', language: 'kuery' },
              fields: [{ field: '*', include_unmapped: 'true' }],
              index: '0b3ad420-a7d9-11ed-b7bc-4b80fc2e7c64',
              sort: [{ timestamp: 'desc' }],
              filter: [
                {
                  meta: {
                    index: '0b3ad420-a7d9-11ed-b7bc-4b80fc2e7c64',
                    params: {},
                    field: 'timestamp',
                  },
                  query: {
                    range: {
                      timestamp: {
                        format: 'strict_date_optional_time',
                        gte: '2007-10-25T21:18:23.905Z',
                        lte: '2022-10-30T00:00:00.000Z',
                      },
                    },
                  },
                },
              ],
              parent: {
                query: { query: '', language: 'kuery' },
                filter: [],
                parent: {
                  filter: [
                    {
                      meta: {
                        index: '0b3ad420-a7d9-11ed-b7bc-4b80fc2e7c64',
                        params: {},
                        field: 'timestamp',
                      },
                      query: {
                        range: {
                          timestamp: {
                            format: 'strict_date_optional_time',
                            gte: '2007-10-25T21:18:23.905Z',
                            lte: '2022-10-30T00:00:00.000Z',
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
            columns: [],
            title: 'testsearch',
          })
        )) as supertest.Response;

        expect(resStatus).to.eql(200);
        expect(resType).to.eql('text/csv');

        resText = text;
      });

      after(async () => {
        await Promise.all([
          esArchiver.unload('x-pack/test/functional/es_archives/reporting/big_int_id_field'),
          kibanaServer.importExport.unload(
            'x-pack/test/functional/fixtures/kbn_archiver/reporting/big_int_id_field'
          ),
        ]);
      });

      itIfEs7('(ES 7)', async () => {
        expectSnapshot(resText).toMatch();
      });

      itIfEs8('(ES 8)', async () => {
        expectSnapshot(resText).toMatch();
      });
    });
  });
}
