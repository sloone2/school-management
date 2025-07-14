// BaseException.ts - Base class for all custom exceptions

export class BaseException extends Error {
  public readonly code: string;
  public readonly details: any;
  public readonly data: any;
  public readonly isCustomException: boolean = true;
  public readonly timestamp: string;
  public dialogType: string;

  constructor(code: string, message: string | null = null, details: any = null, data: any = null) {
    super(message || code);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.data = data;
    this.timestamp = new Date().toISOString();
    this.dialogType = 'error';
  }
}

export class ValidationException extends BaseException {
  public readonly fieldErrors: any;

  constructor(code: string, message: string | null = null, details: any = null, fieldErrors: any = null) {
    super(code, message, details, fieldErrors);
    this.fieldErrors = fieldErrors;
    this.dialogType = 'warning';
  }
}

export class BusinessException extends BaseException {
  public readonly businessContext: any;

  constructor(code: string, message: string | null = null, details: any = null, businessContext: any = null) {
    super(code, message, details, businessContext);
    this.businessContext = businessContext;
    this.dialogType = 'warning';
  }
}

export class NetworkException extends BaseException {
  public readonly requestInfo: any;

  constructor(code: string, message: string | null = null, details: any = null, requestInfo: any = null) {
    super(code, message, details, requestInfo);
    this.requestInfo = requestInfo;
    this.dialogType = 'error';
  }
}

export class AuthException extends BaseException {
  public readonly authContext: any;

  constructor(code: string, message: string | null = null, details: any = null, authContext: any = null) {
    super(code, message, details, authContext);
    this.authContext = authContext;
    this.dialogType = 'warning';
  }
}
