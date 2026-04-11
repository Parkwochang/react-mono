import { HTTPError } from "ky";
import type { AfterResponseHook, BeforeErrorHook } from "ky";

import { clientLogger } from "./log";

export class KyOptions {
  static afterResponseLog: AfterResponseHook = ({ request, response }) => {
    if (response.ok) {
      clientLogger({
        status: response.status,
        reqData: request,
        resData: response,
        method: "log",
      });
    }

    return response;
  };

  // ----------------------------------------------------------------------
  // ! ERROR handler

  static beforeErrorLog: BeforeErrorHook = async ({ error, request }) => {
    if (error instanceof HTTPError) {
      clientLogger({
        status: error.response?.status,
        reqData: request,
        resData: error.response?.body,
        method: "error",
      });
    }

    return error;
  };
}
