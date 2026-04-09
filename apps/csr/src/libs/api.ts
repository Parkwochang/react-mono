import ky from 'ky';

// import { KyOptions } from './http';

// ----------------------------------------------------------------------
// ! api 베이스 모듈

export const ApiInstance = ky.create({
  baseUrl: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Cross-Origin 쿠키 전송을 위해 추가
  timeout: 10000,
  // 전 후 처리 로직
  // hooks: {
  //   beforeRequest: [KyOptions.setClientHeader],
  //   afterResponse: [KyOptions.afterClientResponseLog],
  //   beforeError: [KyOptions.beforeClientErrorLog],
  // },
});
