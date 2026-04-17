import type { AfterResponseHook, BeforeErrorHook } from 'ky';
import { type BeforeRequestHook, type BeforeRetryHook, HTTPError } from 'ky';

import { clientLogger } from './console';
import { throwApiException } from './exceoption';
import { readAccessToken, readPayload } from './utils';
import type { ApiContext } from './type';

// ----------------------------------------------------------------------

export class KyCustomHook {
  // ! response logging

  static afterResponseLog: AfterResponseHook = async ({ request, response }) => {
    if (response.ok) {
      clientLogger({
        status: response.status,
        reqData: request,
        resData: await readPayload(response),
        method: 'log',
      });
    }

    return response;
  };

  // ----------------------------------------------------------------------
  // ! error logging

  static beforeErrorLog: BeforeErrorHook = async ({ error, options }) => {
    if (options.context.suppressToast) return error;

    if (error instanceof HTTPError) {
      const data = await readPayload(error.response);

      clientLogger({
        status: error.response.status,
        reqData: error.request,
        resData: data,
        method: 'error',
      });

      throw throwApiException(error.response.status, data);
    }

    return error;
  };

  // ----------------------------------------------------------------------
  // ! set authorization header

  static setAuthorizationHeader: BeforeRequestHook = ({ request, options }) => {
    const { skipAuth } = options.context as ApiContext;

    if (skipAuth) return request;

    const token = readAccessToken();

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  };

  // ----------------------------------------------------------------------
  // ! retry request after token refresh

  static updateSessionToken: BeforeRetryHook = ({ request, error }) => {
    const token = readAccessToken();

    if (!token) throw error;

    const refreshed = /* await refreshToken(); */ '';

    request.headers.set('Authorization', `Bearer ${refreshed}`);
  };
}
