/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'),
}));

import supertest from 'supertest';

import { HttpService } from '../http_service';

import { contextServiceMock } from '../../context/context_service.mock';
import { executionContextServiceMock } from '../../execution_context/execution_context_service.mock';
import { loggingSystemMock } from '../../logging/logging_system.mock';
import { createHttpServer } from '../test_utils';
import { inspect } from 'util';
import { ensureRawRequest } from '../router/request';

let server: HttpService;

let logger: ReturnType<typeof loggingSystemMock.create>;
const contextSetup = contextServiceMock.createSetupContract();

const setupDeps = {
  context: contextSetup,
  executionContext: executionContextServiceMock.createInternalSetupContract(),
};

beforeEach(async () => {
  logger = loggingSystemMock.create();

  server = createHttpServer({ logger });
  await server.preboot({ context: contextServiceMock.createPrebootContract() });
});

afterEach(async () => {
  await server.stop();
});

const replacePorts = (input: string): string => input.replace(/[:][0-9]+[/]/g, ':XXXX/');

describe('request logging', () => {
  describe('KibanaRequest', () => {
    it('has expected string representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          return res.ok({ body: { req: String(req) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(replacePorts(response.body.req)).toEqual(
        `[CoreKibanaRequest id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" method="get" url="http://127.0.0.1:XXXX/" system="false"]`
      );
    });

    it('has expected JSON representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          return res.ok({ body: { req: JSON.stringify(req) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);

      expect(JSON.parse(replacePorts(response.body.req))).toEqual({
        id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        url: 'http://127.0.0.1:XXXX/',
        isSystemRequest: false,
        auth: {
          isAuthenticated: false,
        },
        route: {
          method: 'get',
          path: '/',
          options: expect.any(Object),
        },
        uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      });
    });

    it('has expected inspect representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          return res.ok({ body: { req: inspect(req) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(replacePorts(response.body.req)).toMatchInlineSnapshot(`
        "{
          id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          url: 'http://127.0.0.1:XXXX/',
          isSystemRequest: false,
          auth: { isAuthenticated: false },
          route: {
            path: '/',
            method: 'get',
            options: {
              authRequired: true,
              xsrfRequired: false,
              tags: [],
              timeout: [Object],
              body: undefined
            }
          }
        }"
      `);
    });
  });

  describe('HAPI request', () => {
    it('has expected string representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          const rawRequest = ensureRawRequest(req);
          return res.ok({ body: { req: String(rawRequest) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(replacePorts(response.body.req)).toEqual(
        `[HAPI.Request method="get" url="http://127.0.0.1:XXXX/"]`
      );
    });

    it('has expected JSON representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          const rawRequest = ensureRawRequest(req);
          return res.ok({ body: { req: JSON.stringify(rawRequest) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(JSON.parse(replacePorts(response.body.req))).toEqual({
        method: 'get',
        url: 'http://127.0.0.1:XXXX/',
      });
    });

    it('has expected inspect representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          const rawRequest = ensureRawRequest(req);
          return res.ok({ body: { req: inspect(rawRequest) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(replacePorts(response.body.req)).toMatchInlineSnapshot(
        `"{ method: 'get', url: 'http://127.0.0.1:XXXX/' }"`
      );
    });
  });

  describe('http.IncomingMessage', () => {
    it('has expected string representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          const rawRawRequest = ensureRawRequest(req).raw.req;
          return res.ok({ body: { req: String(rawRawRequest) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(replacePorts(response.body.req)).toEqual(
        `[http.IncomingMessage method="GET" url="/" complete="true" aborted="false"]`
      );
    });

    it('has expected JSON representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          const rawRawRequest = ensureRawRequest(req).raw.req;
          return res.ok({ body: { req: JSON.stringify(rawRawRequest) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(JSON.parse(replacePorts(response.body.req))).toEqual({
        aborted: false,
        complete: true,
        method: 'GET',
        url: '/',
      });
    });

    it('has expected inspect representation', async () => {
      const { server: innerServer, createRouter } = await server.setup(setupDeps);
      const router = createRouter('/');
      router.get(
        { path: '/', validate: false, options: { authRequired: true } },
        (context, req, res) => {
          const rawRawRequest = ensureRawRequest(req).raw.req;
          return res.ok({ body: { req: inspect(rawRawRequest) } });
        }
      );
      await server.start();

      const response = await supertest(innerServer.listener).get('/').expect(200);
      expect(replacePorts(response.body.req)).toMatchInlineSnapshot(
        `"{ method: 'GET', url: '/', complete: true, aborted: false }"`
      );
    });
  });
});
