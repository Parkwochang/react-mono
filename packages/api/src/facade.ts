import type { Input, Options } from 'ky';

import { baseInstance, createApiInstance } from './generator';
import type { ApiPaginatedResponse, ApiResponse } from './type';

// ----------------------------------------------------------------------
// ! transfer form data

const postFormData = async <T>(
  url: Input,
  options: Omit<Options, 'json' | 'body'> & {
    body: Record<string, unknown>;
  }
) => {
  const { body, ...rest } = options;

  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value as string | Blob | File);
  });

  const response = await baseInstance.post(url, { body: formData, ...rest }).json<ApiResponse<T>>();

  return response.body;
};

// ----------------------------------------------------------------------
// ! return body type

const postBody = async <T>(url: Input, options?: Omit<Options, 'method'>) => {
  const response = await baseInstance.post(url, options).json<ApiResponse<T>>();

  return response.body;
};

// ----------------------------------------------------------------------
// ! return pagination type

const getpaginate = async <T extends Record<string, unknown>>(url: Input, options?: Omit<Options, 'method'>) => {
  const response = await baseInstance.get(url, options).json<ApiPaginatedResponse<T>>();

  return response.body;
};

// ----------------------------------------------------------------------
// ! return body type

const getBody = async <T>(url: Input, options?: Omit<Options, 'method'>) => {
  const response = await baseInstance.get(url, options).json<ApiResponse<T>>();

  return response.body;
};

// ----------------------------------------------------------------------
// ! combine facade

/**
 *
 * @description API 호출 파사드
 * @example
 * const response = await AppApi.getpaginate<{id: number, name: string}>('/url')
 *
 * const response = await AppApi.postFormData<{id: number, name: string}>('/url', {
 *   body: {
 *     id: 1,
 *     name: 'test'
 *   }
 * })
 */

export const AppApi = Object.assign(baseInstance, {
  postFormData,
  postBody,
  getpaginate,
  getBody,
});

// ----------------------------------------------------------------------

export const createAppApi = (baseUrl: string) => {
  const instance = createApiInstance(baseUrl);

  return Object.assign(instance, {
    postFormData,
    postBody,
    getpaginate,
    getBody,
  });
};
