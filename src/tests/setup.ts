import { afterEach, beforeAll, afterAll, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import fetch, { Headers, Request, Response } from 'node-fetch';
import { setupServer } from 'msw/node';
import { handlers } from '@/__mocks__/handlers';

export const server = setupServer(...handlers);

expect.extend(matchers);

// @ts-ignore
globalThis.fetch = fetch;
// @ts-ignore
globalThis.Headers = Headers;
// @ts-ignore
globalThis.Request = Request;
// @ts-ignore
globalThis.Response = Response;

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

afterAll(() => server.close());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});
