# `@workspace/lj-api`

공통 `ky` transport primitive, 인증 토큰 처리, 응답 envelope 해석, 공통 에러 타입을 제공하는 패키지입니다.

## 패키지 구조

- `src/auth.ts`: 로그인/부트스트랩 URL, 브라우저 location/history helper
- `src/client.ts`: `ky` interceptor 번들, 공통 logging/auth/error 처리
- `src/devProxy.ts`: 앱 개발용 Vite API proxy path 해석
- `src/response.ts`: 백엔드 envelope 응답 파싱
- `src/tokenManager.ts`: memory/session token store
- `src/types.ts`: 앱 API 전반에서 공유하는 타입, `AppApiError`
- `src/index.ts`: 외부 공개 surface

## 소비 앱 구조 원칙

- `@workspace/lj-api`는 transport primitive만 제공한다.
- 앱 완성형 API composition은 각 앱 `src/shared/api`가 소유한다.
- React 화면과 route는 `@workspace/lj-api`를 직접 호출하지 않는다.
- domain API는 앱의 `src/shared/api`를 통해 transport를 사용한다.

권장 구조:

- `src/shared/api/config.ts`: 앱별 base URL, auth env, division 규칙
- `src/shared/api/client.ts`: token store, interceptor 조합, `api`, `apiFor`, `requestDomain`
- `src/shared/api/auth.ts`: bootstrap/login/logout, 401/403/500 lifecycle
- `src/shared/api/index.ts`: 앱 공개 surface
- `domains/*/api/*`: 실제 feature API, query, schema

이 구조를 유지하면 `@workspace/lj-api`는 transport 자체에만 집중하고, 앱은 앱별 인증 정책과 base URL 정책만 소유하게 된다.
