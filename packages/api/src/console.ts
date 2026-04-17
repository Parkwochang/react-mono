import type { KyRequest } from "ky";

// ----------------------------------------------------------------------

interface StyledConsoleArgs {
  topic?: string;
  title?: string;
  data: unknown;
  topicColor?: string;
  method?: "log" | "warn" | "error" | "info";
}

interface ApiLoggerArgs extends Pick<StyledConsoleArgs, "method"> {
  status: string | number;
  reqData: KyRequest;
  resData: unknown;
}

interface ServerLogger {
  result: "SUCCESS" | "ERROR";
  request: KyRequest;
  status: number;
}

// ----------------------------------------------------------------------

const METHOD_COLOR_MAP: Record<string, string> = {
  GET: "skyblue",
  PATCH: "green",
  POST: "orange",
  PUT: "darkorange",
  DELETE: "red",
};

const ANSICODE_MAP: Record<string, string> = {
  SUCCESS: "\x1b[32m",
  ERROR: "\x1b[31m",
  DEFAULT: "\x1b[0m",
};

// ----------------------------------------------------------------------

function consoleLogger(
  method: StyledConsoleArgs["method"],
  ...args: unknown[]
) {
  if ((import.meta as any).env?.MODE === "prod") return;

  return console[method ?? "log"](...args);
}

function styledConsole({
  topic = "",
  title = "",
  data,
  topicColor = "skyblue",
  method = "log",
}: StyledConsoleArgs) {
  const term_1 = `%c[${topic}]`;
  const term_1_style = [`color: ${topicColor}`, "font-weight : bold"].join(";");
  const term_2 = `%c${title}`;
  const term_2_style = ["font-weight : bold"].join(";");
  consoleLogger(method, `${term_1}${term_2}`, term_1_style, term_2_style, data);
}

// ----------------------------------------------------------------------

export const clientLogger = ({
  status,
  reqData,
  resData,
  method: consoleMethod = "log",
}: ApiLoggerArgs) => {
  const { method, url } = reqData || {};
  const METHOD = method ? method.toUpperCase() : "";

  styledConsole({
    topic: `${METHOD}:${status}`,
    topicColor: METHOD_COLOR_MAP[METHOD] || "black",
    title: url,
    data: {
      request: reqData,
      response: resData,
    },
    method: consoleMethod,
  });
};

export const serverLogger = ({
  result,
  request: { method, url },
  status,
}: ServerLogger) => {
  return console.log(
    ANSICODE_MAP[result],
    `${method} [${status}]`,
    ANSICODE_MAP["DEFAULT"],
    `${url}`,
  );
};

// GET /images/refund/refund-1.png 404 in 1071ms
