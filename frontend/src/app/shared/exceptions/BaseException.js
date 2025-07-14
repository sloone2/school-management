// BaseException.js - Base class for all custom exceptions
export class BaseException extends Error {
    constructor(code, message = null, details = null, data = null) {
        super(message || code);
        this.name = this.constructor.name;
        this.code = code;
        this.details = details;
        this.data = data;
        this.isCustomException = true;
        this.timestamp = new Date().toISOString();
        this.dialogType = 'error'; 
    }
}

export class ValidationException extends BaseException {
    constructor(code, message = null, details = null, fieldErrors = null) {
        super(code, message, details, fieldErrors);
        this.fieldErrors = fieldErrors;
        this.dialogType = 'warning'; 
    }
}

export class BusinessException extends BaseException {
    constructor(code, message = null, details = null, businessContext = null) {
        super(code, message, details, businessContext);
        this.businessContext = businessContext;
        this.dialogType = 'warning'; 
    }
}

export class NetworkException extends BaseException {
    constructor(code, message = null, details = null, requestInfo = null) {
        super(code, message, details, requestInfo);
        this.requestInfo = requestInfo;
        this.dialogType = 'error'; 
    }
}

export class AuthException extends BaseException {
    constructor(code, message = null, details = null, authContext = null) {
        super(code, message, details, authContext);
        this.authContext = authContext;
        this.dialogType = 'warning';
    }
}

