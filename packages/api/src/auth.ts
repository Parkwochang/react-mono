import { AppApi } from "./facade";

// ----------------------------------------------------------------------
// ! 유저 토큰 가져오기 (로컬용)

export const getTestUserToken = async () => {
  return AppApi.get("/token/test", {
    context: {
      skipAuth: true,
    },
  }).then((res) => res.headers.get("x-auth-token"));
};

// ----------------------------------------------------------------------
// ! 유저 토큰 가져오기

export const getUserToken = async (otk: string) => {
  return AppApi.get("/token/get", {
    searchParams: { otk },
    context: {
      skipAuth: true,
    },
  }).then((res) => res.headers.get("x-auth-token"));
};
