import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen, tap, finalize } from 'rxjs/operators';
import { TRANSLATIONS } from '../exceptions/translations';
import {
  BaseException,
  ValidationException,
  BusinessException,
  NetworkException,
  AuthException
} from '../exceptions/BaseException';

// Declare Swal for TypeScript
declare const Swal: any;

interface ExecuteOptions {
  progressMessage?: string;
  showProgress?: boolean;
  showSuccessAlert?: boolean;
  successMessage?: string;
  errorTitle?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

interface ConfirmationOptions {
  title?: string;
  text?: string;
  icon?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

interface ErrorHandler {
  inProgress: boolean;
  execute<T>(operation: () => Observable<T>, options?: ExecuteOptions): Promise<T>;
  executeWithConfirmation<T>(
    operation: () => Observable<T>,
    action: string,
    confirmOptions?: ConfirmationOptions,
    executeOptions?: ExecuteOptions
  ): Promise<T>;
  showSuccess(message: string, title?: string): void;
  showError(message: string, title?: string): void;
  showWarning(message: string, title?: string): void;
  showInfo(message: string, title?: string): void;
  logError(error: any, context?: string): void;
}

export function errorSuccessHandler(): ErrorHandler {
  let inProgress = false;

  const logError = (error: any, context: string = 'Unknown'): void => {
    const errorLog = {
      timestamp: new Date().toISOString(),
      context,
      error: {
        name: error?.name || 'Unknown Error',
        message: error?.message || 'No message available',
        stack: error?.stack || 'No stack trace',
        code: error?.code || 'UNKNOWN_ERROR'
      },
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('Error logged:', errorLog);

    try {
      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      existingLogs.push(errorLog);
      if (existingLogs.length > 50) {
        existingLogs.splice(0, existingLogs.length - 50);
      }
      localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
    } catch (storageError) {
      console.warn('Failed to store error log:', storageError);
    }
  };

  const getErrorMessage = (error: any): string => {
    if (error?.isCustomException) {
      return error.message || TRANSLATIONS.ERRORS.GENERIC.UNKNOWN_ERROR;
    }

    if (error?.code && TRANSLATIONS.ERRORS.CODES[error.code as keyof typeof TRANSLATIONS.ERRORS.CODES]) {
      return TRANSLATIONS.ERRORS.CODES[error.code as keyof typeof TRANSLATIONS.ERRORS.CODES];
    }

    if (error?.message) {
      return error.message;
    }

    return TRANSLATIONS.ERRORS.GENERIC.UNKNOWN_ERROR;
  };

  const getErrorTitle = (error: any): string => {
    if (error?.isCustomException) {
      switch (error.constructor.name) {
        case 'ValidationException':
          return TRANSLATIONS.ERRORS.TITLES.VALIDATION_ERROR;
        case 'BusinessException':
          return TRANSLATIONS.ERRORS.TITLES.BUSINESS_ERROR;
        case 'NetworkException':
          return TRANSLATIONS.ERRORS.TITLES.NETWORK_ERROR;
        case 'AuthException':
          return TRANSLATIONS.ERRORS.TITLES.AUTH_ERROR;
        default:
          return TRANSLATIONS.ERRORS.TITLES.GENERIC_ERROR;
      }
    }
    return TRANSLATIONS.ERRORS.TITLES.GENERIC_ERROR;
  };

  const showAlert = (type: string, message: string, title?: string): void => {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: type,
        title: title || TRANSLATIONS.ALERTS.DEFAULT_TITLES[type.toUpperCase() as keyof typeof TRANSLATIONS.ALERTS.DEFAULT_TITLES] || 'Notification',
        text: message,
        confirmButtonText: TRANSLATIONS.BUTTONS.OK,
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      });
    } else {
      alert(`${title || type.toUpperCase()}: ${message}`);
    }
  };

  const showConfirmation = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: options.icon || 'question',
          title: options.title || TRANSLATIONS.CONFIRMATIONS.DEFAULT_TITLE,
          text: options.text || TRANSLATIONS.CONFIRMATIONS.DEFAULT_TEXT,
          showCancelButton: true,
          confirmButtonText: options.confirmButtonText || TRANSLATIONS.BUTTONS.CONFIRM,
          cancelButtonText: options.cancelButtonText || TRANSLATIONS.BUTTONS.CANCEL,
          customClass: {
            confirmButton: 'btn btn-primary me-2',
            cancelButton: 'btn btn-secondary'
          }
        }).then((result: any) => {
          resolve(result.isConfirmed);
        });
      } else {
        const confirmed = confirm(`${options.title || 'Confirm'}\n${options.text || 'Are you sure?'}`);
        resolve(confirmed);
      }
    });
  };

  const execute = <T>(
    operation: () => Observable<T>,
    options: ExecuteOptions = {}
  ): Promise<T> => {
    const {
      progressMessage = TRANSLATIONS.PROGRESS.PROCESSING,
      showProgress = false,
      showSuccessAlert = true,
      successMessage = TRANSLATIONS.SUCCESS.OPERATION_COMPLETED,
      errorTitle,
      retryAttempts = 0,
      retryDelay = 1000
    } = options;

    inProgress = true;
    let progressAlert: any = null;

    if (showProgress && typeof Swal !== 'undefined') {
      progressAlert = Swal.fire({
        title: progressMessage,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }

    return new Promise((resolve, reject) => {
      let attempts = 0;

      operation()
        .pipe(
          retryWhen(errors =>
            errors.pipe(
              tap(err => {
                if (err?.code === 'AUTH_ERROR') {
                  throw err; // لا تعيد المحاولة على خطأ المصادقة
                }
              }),
              delayWhen(() => timer(retryDelay)),
              tap(() => {
                if (++attempts > retryAttempts) {
                  throw new Error('Max retry attempts reached');
                }
              })
            )
          ),
          catchError(err => {
            logError(err, 'Execute Operation');

            if (progressAlert) progressAlert.close();

            const message = getErrorMessage(err);
            const title = errorTitle || getErrorTitle(err);
            showAlert('error', message, title);

            reject(err);
            return throwError(() => err);
          }),
          tap(() => {
            if (showSuccessAlert) {
              showAlert('success', successMessage);
            }
          }),
          finalize(() => {
            inProgress = false;
            if (progressAlert) progressAlert.close();
          })
        )
        .subscribe({
          next: res => resolve(res),
          error: err => reject(err)
        });
    });
  };

  const executeWithConfirmation = async <T>(
    operation: () => Observable<T>,
    action: string,
    confirmOptions: ConfirmationOptions = {},
    executeOptions: ExecuteOptions = {}
  ): Promise<T> => {
    const actionKey = action.toUpperCase();
    const confirmActions = TRANSLATIONS.CONFIRMATIONS.ACTIONS as any;
    const successActions = TRANSLATIONS.SUCCESS.ACTIONS as any;

    const defaultConfirmOptions = {
      title: confirmActions[actionKey]?.TITLE || TRANSLATIONS.CONFIRMATIONS.DEFAULT_TITLE,
      text: confirmActions[actionKey]?.TEXT || TRANSLATIONS.CONFIRMATIONS.DEFAULT_TEXT,
      icon: confirmActions[actionKey]?.ICON || 'question',
      confirmButtonText: confirmActions[actionKey]?.CONFIRM || TRANSLATIONS.BUTTONS.CONFIRM,
      cancelButtonText: TRANSLATIONS.BUTTONS.CANCEL
    };

    const finalConfirmOptions = { ...defaultConfirmOptions, ...confirmOptions };

    const confirmed = await showConfirmation(finalConfirmOptions);
    if (!confirmed) throw new Error('Operation cancelled by user');

    const defaultExecuteOptions = {
      successMessage: successActions[actionKey] || TRANSLATIONS.SUCCESS.OPERATION_COMPLETED
    };

    const finalExecuteOptions = { ...defaultExecuteOptions, ...executeOptions };

    return execute(operation, finalExecuteOptions);
  };

  return {
    get inProgress() { return inProgress; },
    execute,
    executeWithConfirmation,
    showSuccess: (message: string, title?: string) => showAlert('success', message, title),
    showError: (message: string, title?: string) => showAlert('error', message, title),
    showWarning: (message: string, title?: string) => showAlert('warning', message, title),
    showInfo: (message: string, title?: string) => showAlert('info', message, title),
    logError
  };
}
