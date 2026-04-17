import ky, { HTTPError, type Options } from 'ky';

import { KyCustomHook } from './hook';

// ----------------------------------------------------------------------

export const baseInstance = ky.create({
  prefix: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  timeout: 10_000,
  context: {
    skipAuth: false,
    suppressToast: false,
  },
  retry: {
    limit: 1,
    statusCodes: [401],
    methods: ['get', 'post', 'put', 'patch', 'delete'],
    shouldRetry: ({ error }) => {
      if (error instanceof HTTPError) {
        return error.response.status === 401;
      }

      return false;
    },
  },
  hooks: {
    beforeRequest: [KyCustomHook.setAuthorizationHeader],
    afterResponse: [KyCustomHook.afterResponseLog],
    beforeError: [KyCustomHook.beforeErrorLog],
    beforeRetry: [KyCustomHook.updateSessionToken],
  },
});

// ----------------------------------------------------------------------
// ! Create api instance

export const createApiInstance = (baseUrl: string, options: Options = {}) =>
  ky.create({
    prefix: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    timeout: 10000,
    retry: {
      limit: 1,
      statusCodes: [401],
      methods: ['get', 'post', 'put', 'patch', 'delete'],
      shouldRetry: ({ error }) => {
        if (error instanceof HTTPError) {
          return error.response.status === 401;
        }

        return false;
      },
    },
    hooks: {
      beforeRequest: [KyCustomHook.setAuthorizationHeader],
      afterResponse: [KyCustomHook.afterResponseLog],
      beforeError: [KyCustomHook.beforeErrorLog],
      beforeRetry: [],
    },
    ...options,
  });
