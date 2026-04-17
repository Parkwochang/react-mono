import type { ApiErrorResponse } from './type';

// ----------------------------------------------------------------------

interface ErrorOptions {
  name: string;
  status: number;
  cause?: string;
  detail?: ApiErrorResponse;
}

export class HttpException extends Error {
  status: number;
  cause?: string;
  detail?: ApiErrorResponse;

  constructor(message: string, options: ErrorOptions) {
    super(message);
    this.name = options.name;
    this.status = options.status;
    this.cause = options.cause;
    this.detail = options.detail;
  }
}

// ----------------------------------------------------------------------
// ! Http case exception

export class BadRequestException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 400 });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 401 });
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 403 });
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 404 });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 500 });
  }
}

export class BadGatewayException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 502 });
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 503 });
  }
}

export class UnknownException extends HttpException {
  constructor(message: string, options: ErrorOptions) {
    super(message, { ...options, status: 500 });
  }
}

// ----------------------------------------------------------------------
// ! Throw api exception

export function throwApiException(status: number, response: ApiErrorResponse) {
  const { code: name, message } = response;

  switch (status) {
    case 400:
      return new BadRequestException(message, {
        name,
        status,
        detail: response,
      });
    case 401:
      return new UnauthorizedException(message, {
        name,
        status,
        detail: response,
      });
    case 403:
      return new ForbiddenException(message, {
        name,
        status,
        detail: response,
      });
    case 404:
      return new NotFoundException(message, { name, status, detail: response });
    case 500:
      return new InternalServerErrorException(message, {
        name,
        status,
        detail: response,
      });
    case 502:
      return new BadGatewayException(message, {
        name,
        status,
        detail: response,
      });
    case 503:
      return new ServiceUnavailableException(message, {
        name,
        status,
        detail: response,
      });
    default:
      return new UnknownException(message, { name, status, detail: response });
  }
}
