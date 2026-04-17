// ----------------------------------------------------------------------
// ! 빈 필드 포맷팅

export const formatEmptyField = (value: string | null | undefined) => {
  return value || "-";
};

// ----------------------------------------------------------------------
// ! 전화번호 포맷팅

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
};

// ----------------------------------------------------------------------
// ! 숫자 콤마 추가

export const formatWithCommas = (value: number) => {
  return value.toLocaleString("ko-KR");
};

// ----------------------------------------------------------------------
// ! 가격 만 단위 변환

export function slicePriceMan(price: number) {
  const result = price.toString().split("");

  if (result.length > 5) {
    result.reverse().splice(0, 4);
    result.reverse();
    return `${result.join("")}만`;
  }

  return result.join("");
}

// ----------------------------------------------------------------------
// ! 전화번호 마스킹

export const maskingPhoneNum = (phoneNumber: string) => {
  const values = phoneNumber.split("-");
  if (!values[1]) return phoneNumber;

  values[1] = "*".repeat(values[1].length);

  return values.join("-");
};

// ----------------------------------------------------------------------
// ! 텍스트 길이별 자르기

export function sliceText(text: string, maxLeng: number) {
  return text.length > maxLeng ? `${text.substring(0, maxLeng + 1)}...` : text;
}

// ----------------------------------------------------------------------
// ! 파스칼 케이스 변환

export const toPascaleCase = (str: string) => {
  return str.replace(
    /(\w)(\w*)/g,
    (_g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
  );
};

// ----------------------------------------------------------------------
// ! 카멜 케이스 변환

export const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
};

// ----------------------------------------------------------------------
// ! 폼데이터 변환

export const convertFormData = (data: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string | Blob | File);
  });

  return formData;
};

// ----------------------------------------------------------------------
// ! 브라우저 종류

export const getBrowserName = (userAgent?: string): string => {
  if (typeof window === "undefined") return "server";
  const browser = userAgent || window.navigator.userAgent;

  switch (true) {
    case /Trident|MSIE/.test(browser):
      return "ie";
    case /Edge/.test(browser):
      return "edge";
    case /Chrome/.test(browser):
      return "chrome";
    case /Safari/.test(browser):
      return "safari";
    case /Firefox/.test(browser):
      return "firefox";
    case /Opera|OPR/.test(browser):
      return "opera";
    default:
      return "other";
  }
};

// ----------------------------------------------------------------------
// ! 모바일 종류

export function getMobileName(userAgent: string): string {
  const mobileType = userAgent.toLowerCase();

  if (mobileType.indexOf("android") > -1) return "android";
  else if (
    mobileType.indexOf("iphone") > -1 ||
    mobileType.indexOf("ipad") > -1 ||
    mobileType.indexOf("ipod") > -1
  )
    return "ios";

  return "other";
}

// ----------------------------------------------------------------------
// ! 문자열 크기 변환

export function getByteSize(char: string) {
  return new TextEncoder().encode(char).length;
}
