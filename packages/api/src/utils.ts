import type { KyResponse } from 'ky';
// package
import { StorageManager } from '@repo/utils';

// ----------------------------------------------------------------------

export function readPayload(res: KyResponse) {
  const contentType = res.headers.get('content-type')?.toLowerCase() ?? '';

  if (contentType.includes('application/json')) {
    return res.clone()?.json();
  }

  return res.clone()?.text();
}

// ----------------------------------------------------------------------

export function readAccessToken() {
  return new StorageManager(localStorage).getItem('accessToken', null);
}

// ----------------------------------------------------------------------

export function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64').toString());
}
