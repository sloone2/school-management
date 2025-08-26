// services/integrated-api.service.ts - API Service integrated with TokenService
import { Injectable, OnDestroy } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, throwError, of, from } from 'rxjs';
import {
  map,
  catchError,
  finalize,
  tap,
  takeUntil,
  filter,
  switchMap,
  retry,
  retryWhen,
  delay,
  timeout
} from 'rxjs/operators';

import { TokenService, User } from './token.service';

// ===== INTERFACES =====
export interface ApiResponse<T = any> {
  success?: boolean;
  valid?: boolean;
  status?: string | boolean;
  ok?: boolean;
  message?: string;
  msg?: string;
  code?: string;
  errorCode?: string;
  details?: string;
  error?: string;
  data?: T;
  warning?: boolean;
  statusText?: string;
  url?: string;
}

// Simplified AlertOptions to avoid SweetAlert2 type conflicts
export interface AlertOptions {
  title?: string;
  text?: string;
  html?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  timer?: number;
  timerProgressBar?: boolean;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  padding?: string;
  customClass?: any;
  position?: any;
  width?: number;
  background?: string;
  footer?: string;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  showCloseButton?: boolean;
  didOpen?: () => void;
  willClose?: () => void;
  [key: string]: any; // Allow additional properties
}

export interface ConfirmationResult<T = any> {
  confirmed: boolean;
  dismissed?: any;
  callbackResult?: T;
  error?: any;
  cancelled?: boolean;
}

export interface MessageTemplate {
  title: string;
  text: string;
  confirmButton: string;
  successTitle: string;
  successText: string;
  cancelButton?: string;
}

export interface ExecutionOptions<T = any> {
  progressMessage?: string;
  successMessage?: string;
  successTitle?: string;
  errorTitle?: string;
  logErrors?: boolean;
  showProgress?: boolean;
  showSuccessAlert?: boolean;
  showErrorAlert?: boolean;
  autoHideSuccess?: boolean;
  successTimer?: number;
  retryCount?: number;
  retryDelay?: number;
  timeout?: number;
  trackProgress?: boolean;
}

export interface ProgressInfo {
  loaded: number;
  total: number;
  percentage: number;
  type: 'upload' | 'download' | 'response';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private progressSubject = new BehaviorSubject<ProgressInfo | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Public observables
  public readonly progress$ = this.progressSubject.asObservable();
  public readonly loading$ = this.loadingSubject.asObservable();

  // Auth state observables from TokenService
  public readonly authState$ = this.tokenService.authState$;
  public readonly user$ = this.tokenService.user$;

  // Configuration
  private readonly baseUrl = 'http://localhost:3000/api';
  public config = {
    defaultProgressMessage: 'Processing...',
    defaultSuccessTimer: 3000,
    enableErrorHandling: true,
    enableServerLogging: true,
    logEndpoint: '/api/logs/error',
    defaultTimeout: 30000,
    maxRetries: 3,
    retryDelay: 1000
  };

  // Response state
  public response = {
    status: false,
    type: '',
    msg: '',
    code: '',
    details: '',
    timestamp: null as string | null
  };

  // Progress state
  public inProgress = false;
  public progressMessage = '';
  public showDetails = false;

  // Translations
  private translations = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    processing: 'Processing',
    operationSuccessful: 'Operation completed successfully',
    operationFailed: 'Operation failed',
    operationCompleted: 'Operation completed',
    requestSuccessful: 'Request successful',
    requestFailed: 'Request failed',
    defaultProgress: 'Please wait...',
    confirmTitle: 'Are you sure?',
    confirmText: 'Do you want to continue?',
    confirmButton: 'Yes',
    cancelButton: 'Cancel',
    deleteConfirmTitle: 'Delete Confirmation',
    deleteConfirmText: 'This action cannot be undone',
    deleteConfirmButton: 'Delete',
    signedInSuccessfully: 'Signed in successfully',
    GEN_001: 'An unexpected error occurred',
    VAL_001: 'Validation error',
    NET_001: 'Network error',
    NET_002: 'Request timeout',
    AUTH_001: 'Authentication required',
    BIZ_002: 'Access denied',
    BIZ_003: 'Resource not found',
    SYS_001: 'Internal server error',

    // Templates
    templates: {
      save: {
        title: 'Save Changes?',
        text: 'Do you want to save your changes?',
        confirmButton: 'Save',
        successTitle: 'Saved',
        successText: 'Your changes have been saved successfully'
      },
      delete: {
        title: 'Delete Item?',
        text: 'This action cannot be undone',
        confirmButton: 'Delete',
        successTitle: 'Deleted',
        successText: 'Item has been deleted successfully'
      },
      update: {
        title: 'Update Item?',
        text: 'Do you want to update this item?',
        confirmButton: 'Update',
        successTitle: 'Updated',
        successText: 'Item has been updated successfully'
      },
      submit: {
        title: 'Submit Form?',
        text: 'Do you want to submit this form?',
        confirmButton: 'Submit',
        successTitle: 'Submitted',
        successText: 'Form has been submitted successfully'
      },
      logout: {
        title: 'Logout?',
        text: 'Are you sure you want to logout?',
        confirmButton: 'Logout',
        successTitle: 'Logged Out',
        successText: 'You have been logged out successfully'
      }
    }
  };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.progressSubject.complete();
    this.loadingSubject.complete();
  }

  // ===== URL FORMATTING =====
  private formatUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${this.baseUrl}${cleanUrl}`;
  }

  // ===== AUTHENTICATION METHODS =====

  public logout(options: ExecutionOptions<void> = {}): Observable<void | { cancelled: boolean }> {
    return this.httpWithConfirmation(
      () => this.executeHttp<void>(() =>
          this.http.post<void>(this.formatUrl('/auth/logout'), {}),
        { showSuccessAlert: false, ...options }
      ).pipe(
        tap(() => {
          // Clear token and user data
          this.tokenService.clear();
        })
      ),
      'logout',
      {},
      options
    );
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  /**
   * Get current user
   */
  public getCurrentUser(): User | null {
    return this.tokenService.getUser();
  }

  public willTokenExpireSoon(withinMinutes: number = 5): boolean {
    return this.tokenService.willExpireSoon(withinMinutes);
  }

  // ===== CORE HTTP METHODS (Your Original API) =====

  public get<T>(url: string, params?: any, options: ExecutionOptions<T> = {}): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });

    return this.executeHttp<T>(() =>
        this.http.get<T>(this.formatUrl(url), { params: httpParams }),
      options
    );
  }

  public post<T>(url: string, data?: any, options: ExecutionOptions<T> = {}): Observable<T> {
    return this.executeHttp<T>(() =>
        this.http.post<T>(this.formatUrl(url), data),
      options
    );
  }

  public put<T>(url: string, data?: any, options: ExecutionOptions<T> = {}): Observable<T> {
    return this.executeHttp<T>(() =>
        this.http.put<T>(this.formatUrl(url), data),
      options
    );
  }

  public delete<T>(url: string, options: ExecutionOptions<T> = {}): Observable<T> {
    return this.executeHttp<T>(() =>
        this.http.delete<T>(this.formatUrl(url)),
      options
    );
  }

  public patch<T>(url: string, data?: any, options: ExecutionOptions<T> = {}): Observable<T> {
    return this.executeHttp<T>(() =>
        this.http.patch<T>(this.formatUrl(url), data),
      options
    );
  }

  // ===== ENHANCED HTTP METHODS =====

  public uploadFile<T = any>(
    url: string,
    file: File,
    options: ExecutionOptions<T> & {
      fieldName?: string;
      additionalData?: { [key: string]: any };
    } = {}
  ): Observable<T> {
    const formData = new FormData();
    formData.append(options.fieldName || 'file', file);

    if (options.additionalData) {
      Object.keys(options.additionalData).forEach(key => {
        formData.append(key, options.additionalData![key]);
      });
    }

    return this.executeHttp<T>(() =>
        this.http.post<T>(this.formatUrl(url), formData, {
          observe: 'events',
          reportProgress: true
        }).pipe(
          tap(event => {
            if (this.isHttpEvent(event)) {
              this.handleHttpProgress(event);
            }
          }),
          filter(event => !this.isHttpEvent(event) || event.type === HttpEventType.Response),
          map(event => this.isHttpEvent(event) ? (event as any).body : event as T)
        ),
      { ...options, trackProgress: true }
    );
  }

  // HTTP with confirmation
  public deleteWithConfirmation<T = any>(
    url: string,
    customMessages: Partial<MessageTemplate> = {},
    options: ExecutionOptions<T> = {}
  ): Observable<T | { cancelled: boolean }> {
    return this.httpWithConfirmation(
      () => this.delete<T>(url, { ...options, showProgress: false, showSuccessAlert: false }),
      'delete',
      customMessages,
      options
    );
  }

  public postWithConfirmation<T = any>(
    url: string,
    data: any,
    templateName: string = 'save',
    customMessages: Partial<MessageTemplate> = {},
    options: ExecutionOptions<T> = {}
  ): Observable<T | { cancelled: boolean }> {
    return this.httpWithConfirmation(
      () => this.post<T>(url, data, { ...options, showProgress: false, showSuccessAlert: false }),
      templateName,
      customMessages,
      options
    );
  }

  public putWithConfirmation<T = any>(
    url: string,
    data: any,
    templateName: string = 'update',
    customMessages: Partial<MessageTemplate> = {},
    options: ExecutionOptions<T> = {}
  ): Observable<T | { cancelled: boolean }> {
    return this.httpWithConfirmation(
      () => this.put<T>(url, data, { ...options, showProgress: false, showSuccessAlert: false }),
      templateName,
      customMessages,
      options
    );
  }

  // ===== ALERT METHODS =====

  public showSuccessAlert(options: AlertOptions = {}): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'success',
      title: options.title || this.translations.success,
      text: options.text || this.translations.operationSuccessful,
      timer: options.timer || 2000,
      timerProgressBar: true,
      showConfirmButton: options.showConfirmButton !== false,
      ...options
    } as any);
  }

  public showErrorAlert(options: AlertOptions = {}): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'error',
      title: options.title || this.translations.error,
      text: options.text || this.translations.GEN_001,
      showConfirmButton: false,
      ...options
    } as any);
  }

  public showWarningAlert(options: AlertOptions = {}): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'warning',
      text: options.text || this.translations.VAL_001,
      showConfirmButton: false,
      timer: 1200,
      title: '',
      ...options
    } as any);
  }

  public showToast(type: 'success' | 'error' | 'warning' | 'info' | 'question', message: string, options: any = {}): Promise<SweetAlertResult<any>> {
    const toast = Swal.mixin({
      toast: true,
      position: options.position || 'top-end',
      showConfirmButton: false,
      timer: options.timer || 3000,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    } as any);

    return toast.fire({
      icon: type,
      title: message,
      padding: '10px 20px',
      ...options
    } as any);
  }

  public showLoadingAlert(options: AlertOptions = {}): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: options.title || this.translations.processing,
      text: options.text || this.translations.defaultProgress,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      ...options
    } as any);
  }

  public closeAlert(): void {
    Swal.close();
  }

  // ===== CONFIRMATION METHODS =====

  public async showConfirmationAlert<T = any>(
    options: AlertOptions = {},
    callback?: () => Promise<T> | T
  ): Promise<ConfirmationResult<T>> {
    const defaultOptions = {
      title: options.title || this.translations.confirmTitle,
      text: options.text || this.translations.confirmText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || this.translations.confirmButton,
      cancelButtonText: options.cancelButtonText || this.translations.cancelButton,
      confirmButtonColor: options.confirmButtonColor || '#3085d6',
      cancelButtonColor: options.cancelButtonColor || '#d33',
      ...options
    };

    try {
      const result = await Swal.fire(defaultOptions as any);

      if (result.isConfirmed) {
        if (callback && typeof callback === 'function') {
          const callbackResult = await callback();

          if (callbackResult !== false) {
            this.showSuccessAlert({
              title: this.translations.success,
              text: this.translations.operationSuccessful,
              timer: 2000
            });
          }

          return { confirmed: true, callbackResult };
        }

        return { confirmed: true };
      } else {
        return { confirmed: false, dismissed: result.dismiss };
      }
    } catch (error) {
      console.error('Error in confirmation alert:', error);
      this.showErrorAlert({
        title: this.translations.error,
        text: this.translations.GEN_001
      });
      return { confirmed: false, error };
    }
  }

  // ===== HTTP WITH CONFIRMATION HELPER =====

  public httpWithConfirmation<T = any>(
    requestFn: () => Observable<T>,
    templateName: string,
    customMessages: Partial<MessageTemplate> = {},
    options: ExecutionOptions<T> = {}
  ): Observable<T | { cancelled: boolean }> {
    return from(this.getConfirmationForTemplate(templateName, customMessages)).pipe(
      switchMap((confirmed: ConfirmationResult) => {
        if (confirmed && confirmed.confirmed) {
          return this.executeHttp(requestFn, options);
        }
        return of({ cancelled: true });
      }),
      takeUntil(this.destroy$)
    );
  }

  private async getConfirmationForTemplate(templateName: string, customMessages: Partial<MessageTemplate> = {}): Promise<ConfirmationResult> {
    const template = (this.translations.templates as any)[templateName] || this.translations.templates.save;
    const messages = { ...template, ...customMessages };

    return this.showConfirmationAlert({
      title: messages.title,
      text: messages.text,
      confirmButtonText: messages.confirmButton
    });
  }

  // ===== MAIN EXECUTION METHOD =====

  public executeHttp<T = any>(
    requestFn: () => Observable<T>,
    options: ExecutionOptions<T> = {}
  ): Observable<T> {
    const {
      progressMessage = this.config.defaultProgressMessage,
      successMessage = null,
      successTitle = null,
      errorTitle = null,
      logErrors = true,
      showProgress = true,
      showSuccessAlert = true,
      showErrorAlert = this.config.enableErrorHandling !== false,
      autoHideSuccess = true,
      successTimer = this.config.defaultSuccessTimer,
      retryCount = 0,
      retryDelay = this.config.retryDelay,
      timeout: timeoutMs = this.config.defaultTimeout
    } = options;

    let loadingAlert: Promise<SweetAlertResult<any>> | null = null;

    return new Observable<T>(subscriber => {
      if (showProgress) {
        loadingAlert = this.showLoadingAlert({
          title: this.translations.processing,
          text: progressMessage
        });
      }

      this.setGlobalLoading(true);
      this.setProgress(true, progressMessage!, showProgress);

      let execution$ = requestFn().pipe(
        takeUntil(this.destroy$)
      );

      if (timeoutMs > 0) {
        execution$ = execution$.pipe(timeout(timeoutMs));
      }

      if (retryCount > 0) {
        execution$ = execution$.pipe(
          retryWhen(errors =>
            errors.pipe(
              tap(error => console.warn('Retrying after error:', error)),
              delay(retryDelay),
              take(retryCount)
            )
          )
        );
      }

      const subscription = execution$.pipe(
        tap(result => {
          if (loadingAlert) {
            this.closeAlert();
          }

          this.handleResponse(result, 'success');

          if (showSuccessAlert) {
            this.showSuccessAlert({
              title: successTitle || this.translations.success,
              text: successMessage || this.translations.operationSuccessful,
              timer: autoHideSuccess ? successTimer : undefined,
              timerProgressBar: autoHideSuccess
            });
          }
        }),

        catchError(error => {
          if (loadingAlert) {
            this.closeAlert();
          }

          this.handleResponse(error, 'error', { logErrors });

          const processedError = this.processResponse(error, 'error');

          if (processedError.type === 'warning') {
            this.showWarningAlert({
              text: processedError.message,
            });
          } else if (showErrorAlert) {
            this.showErrorAlert({
              title: errorTitle || this.translations.error,
              text: processedError.message,
            });
          }

          return throwError(() => error);
        }),

        finalize(() => {
          this.setProgress(false);
          this.setGlobalLoading(false);
          if (loadingAlert) {
            this.closeAlert();
          }
        })
      ).subscribe({
        next: value => subscriber.next(value),
        error: error => subscriber.error(error),
        complete: () => subscriber.complete()
      });

      return () => {
        subscription.unsubscribe();
        if (loadingAlert) {
          this.closeAlert();
        }
        this.setProgress(false);
        this.setGlobalLoading(false);
      };
    });
  }

  // ===== UTILITY METHODS =====

  public setGlobalLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  public setProgress(inProgress: boolean, message: string = '', show: boolean = true): void {
    this.inProgress = inProgress && show;
    this.progressMessage = inProgress ? message : '';
  }

  public handleResponse(response: any, type: string, options: any = {}): void {
    const { logErrors = true } = options;
    const processedResponse = this.processResponse(response, type);

    this.response.status = true;
    this.response.type = processedResponse.type;
    this.response.msg = processedResponse.message;
    this.response.code = processedResponse.code;
    this.response.details = processedResponse.details;
    this.response.timestamp = new Date().toISOString();

    if (logErrors && processedResponse.type === 'error') {
      this.logError(processedResponse);
    }
  }

  public processResponse(response: any, forceType: string | null = null): any {
    let processedResponse = {
      type: forceType || 'info',
      message: this.translations.operationCompleted,
      code: '',
      details: ''
    };

    if (response instanceof Error || response instanceof HttpErrorResponse) {
      processedResponse = this.processError(response);
    } else if (response && typeof response === 'object') {
      processedResponse = this.processApiResponse(response, forceType);
    } else if (typeof response === 'string') {
      processedResponse.message = response;
      processedResponse.type = forceType || 'info';
    }

    return processedResponse;
  }

  public processApiResponse(response: ApiResponse, forceType: string | null): any {
    let processedResponse = {
      type: forceType || 'info',
      message: this.translations.operationCompleted,
      code: '',
      details: ''
    };

    if (response.hasOwnProperty('success')) {
      processedResponse.type = response.success ? 'success' : 'error';
      processedResponse.message = response.message || (response.success ? this.translations.operationSuccessful : this.translations.operationFailed);
      processedResponse.code = response.code || response.errorCode || '';
      processedResponse.details = response.details || response.error || '';
    } else if (response.hasOwnProperty('valid')) {
      if (response.valid === true) {
        processedResponse.type = 'success';
        processedResponse.message = response.msg || this.translations.operationSuccessful;
      } else {
        processedResponse.type = response.warning ? 'warning' : 'error';
        processedResponse.message = response.msg || this.translations.operationFailed;
      }
      processedResponse.code = response.code || '';
      processedResponse.details = response.details || '';
    } else if (response.hasOwnProperty('ok')) {
      processedResponse.type = response.ok ? 'success' : 'error';
      processedResponse.message = response.statusText || (response.ok ? this.translations.requestSuccessful : this.translations.requestFailed);
      processedResponse.code = `HTTP_${response.status}`;
      processedResponse.details = response.url || '';
    }

    return processedResponse;
  }

  public processError(error: Error | HttpErrorResponse): any {
    let errorInfo = {
      type: 'error',
      message: this.translations.GEN_001,
      code: 'GEN_001',
      details: error.message || error.toString()
    };

    if (error instanceof HttpErrorResponse) {
      const statusCode = error.status;
      const errorMapping: { [key: number]: string } = {
        400: 'VAL_001',
        401: 'AUTH_001',
        403: 'BIZ_002',
        404: 'BIZ_003',
        408: 'NET_002',
        500: 'SYS_001',
        502: 'SYS_001',
        503: 'SYS_001',
        504: 'NET_002'
      };

      const errorCode = errorMapping[statusCode] || 'NET_001';
      errorInfo.code = errorCode;
      errorInfo.message = (this.translations as any)[errorCode] || error.message || 'HTTP Error';
      errorInfo.details = `HTTP ${statusCode}: ${error.statusText}`;
    } else {
      const errorMessage = error.message.toLowerCase();

      if (error.name === 'TypeError') {
        errorInfo.code = 'VAL_003';
        errorInfo.message = 'Invalid data type';
      } else if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        errorInfo.code = 'NET_001';
        errorInfo.message = this.translations.NET_001;
      } else if (errorMessage.includes('timeout')) {
        errorInfo.code = 'NET_002';
        errorInfo.message = this.translations.NET_002;
      }
    }

    return errorInfo;
  }

  public logError(errorInfo: any): void {
    console.group(`🚨 Application Error [${errorInfo.code}]`);
    console.error('Message:', errorInfo.message);
    console.error('Details:', errorInfo.details);
    console.groupEnd();

    if (this.config.enableServerLogging) {
      this.sendErrorToServer(errorInfo);
    }
  }

  private async sendErrorToServer(errorInfo: any): Promise<void> {
    try {
      await fetch(this.formatUrl(this.config.logEndpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...errorInfo,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          userId: this.tokenService.getUser()?.id
        })
      });
    } catch (loggingError) {
      console.warn('Failed to log error to server:', loggingError);
    }
  }

  // ===== HELPER METHODS =====

  private isHttpEvent<T>(event: T | HttpEvent<T>): event is HttpEvent<T> {
    return event && typeof event === 'object' && 'type' in event;
  }

  private handleHttpProgress<T>(event: HttpEvent<T>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          this.progressSubject.next({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round(100 * event.loaded / event.total),
            type: 'upload'
          });
        }
        break;

      case HttpEventType.DownloadProgress:
        if (event.total) {
          this.progressSubject.next({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round(100 * event.loaded / event.total),
            type: 'download'
          });
        }
        break;

      case HttpEventType.Response:
        this.progressSubject.next({
          loaded: 1,
          total: 1,
          percentage: 100,
          type: 'response'
        });
        break;
    }
  }

  // ===== CONVENIENCE METHODS =====

  public createCrud<T = any>(baseUrl: string) {
    return {
      list: (params?: any) => this.get<T[]>(baseUrl, params, {
        progressMessage: 'Loading items...'
      }),

      get: (id: string | number) => this.get<T>(`${baseUrl}/${id}`, undefined, {
        progressMessage: 'Loading item...'
      }),

      create: (data: Partial<T>) => this.postWithConfirmation<T>(
        baseUrl,
        data,
        'save',
        { text: 'Do you want to create this item?' }
      ),

      update: (id: string | number, data: Partial<T>) => this.putWithConfirmation<T>(
        `${baseUrl}/${id}`,
        data,
        'update',
        { text: 'Do you want to update this item?' }
      ),

      delete: (id: string | number) => this.deleteWithConfirmation<void>(
        `${baseUrl}/${id}`,
        { text: 'This action cannot be undone.' }
      )
    };
  }

  public clearResponse(): void {
    this.response.status = false;
    this.response.type = '';
    this.response.msg = '';
    this.response.code = '';
    this.response.details = '';
    this.response.timestamp = null;
    this.showDetails = false;
  }
}

// Helper operators
function take<T>(count: number) {
  return (source: Observable<T>) => new Observable<T>(subscriber => {
    let taken = 0;
    const subscription = source.subscribe({
      next: value => {
        if (taken < count) {
          taken++;
          subscriber.next(value);
          if (taken === count) {
            subscriber.complete();
          }
        }
      },
      error: error => subscriber.error(error),
      complete: () => subscriber.complete()
    });

    return () => subscription.unsubscribe();
  });
}
