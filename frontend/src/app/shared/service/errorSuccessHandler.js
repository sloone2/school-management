import { TRANSLATIONS } from '../exceptions/translations.js';
import { BaseException } from '../exceptions/BaseException.js';

export function errorSuccessHandler(locale = 'en') {
    const t = TRANSLATIONS[locale] || TRANSLATIONS.en; // Fallback to English

    return {
        inProgress: false,
        progressMessage: '',
        showDetails: false,
        locale,

        response: {
            status: false,
            type: '', // 'success', 'error', 'warning', 'info'
            msg: '',
            code: '',
            details: '',
            timestamp: null
        },
        
        translate(key, fallback = null) {
            return t[key] || fallback || key;
        },
        
        getLabel(type) {
            const labels = {
                success: t.success,
                error: t.error,
                warning: t.warning,
                info: t.info,
                processing: t.processing
            };
            return labels[type] || type;
        },
        
        async triggerAlert(type, options = {}, callback = null) {
            const alertTypes = {
                SUCCESS: 'success',
                ERROR: 'error',
                WARNING: 'warning',
                INFO: 'info',
                CONFIRMATION: 'confirmation'
            };

            const defaultOptions = {
                title: '',
                text: '',
                icon: type === 'confirmation' ? 'warning' : type,
                padding: '2em',
                customClass: 'sweet-alerts',
                ...options
            };

            switch (type) {
                case alertTypes.SUCCESS:
                    return this.showSuccessAlert(defaultOptions);

                case alertTypes.ERROR:
                    return this.showErrorAlert(defaultOptions);

                case alertTypes.WARNING:
                    return this.showWarningAlert(defaultOptions);

                case alertTypes.INFO:
                    return this.showInfoAlert(defaultOptions);

                case alertTypes.CONFIRMATION:
                    return this.showConfirmationAlert(defaultOptions, callback);

                default:
                    console.error('Invalid alert type:', type);
                    return false;
            }
        },
        
        showSuccessAlert(options) {
            return new window.Swal({
                icon: 'success',
                title: options.title || t.success,
                text: options.text || t.operationSuccessful,
                timer: options.timer || 2000,
                timerProgressBar: true,
                showConfirmButton: options.showConfirmButton !== false,
                ...options
            });
        },
        
        showErrorAlert(options) {
            console.log('showErrorAlert',options);
            return new window.Swal({
                icon: 'error',
                title: options.title || t.error,
                text: options.text || t.GEN_001,
                showConfirmButton: false,
                ...options
            });
        },
        
        showWarningAlert(options) {
            return new window.Swal({
                icon: 'warning',
                text: options.text || t.VAL_001,
                showConfirmButton: false,     // Hide the "OK" button
                timer: 1200,                  // Auto-close after 1000ms (1 second)
                title: '',                    // Ensure title is empty
                didOpen: () => {
                    window.Swal.hideLoading();  // Hide loading if triggered elsewhere
                },
                ...options
            });
        },
        
        showInfoAlert(options) {
            return new window.Swal({
                icon: 'info',
                title: options.title || t.info,
                text: options.text || t.operationCompleted,
                showConfirmButton: true,
                ...options
            });
        },
        
        async showConfirmationAlert(options, callback) {
            const defaultConfirmOptions = {
                title: options.title || t.confirmTitle,
                text: options.text || t.confirmText,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: options.confirmButtonText || t.confirmButton,
                cancelButtonText: options.cancelButtonText || t.cancelButton,
                confirmButtonColor: options.confirmButtonColor || '#3085d6',
                cancelButtonColor: options.cancelButtonColor || '#d33',
                ...options
            };

            try {
                const result = await new window.Swal(defaultConfirmOptions);

                if (result.isConfirmed) {
                    // Execute callback if provided
                    if (callback && typeof callback === 'function') {
                        const callbackResult = await callback();

                        // Show success message after callback execution
                        if (callbackResult !== false) {
                            this.showSuccessAlert({
                                title: options.successTitle || t.success,
                                text: options.successText || t.operationSuccessful,
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
                    title: t.error,
                    text: t.GEN_001
                });
                return { confirmed: false, error };
            }
        },
        
        showToast(type, message, options = {}) {
            const toast = window.Swal.mixin({
                toast: true,
                position: options.position || 'top-end',
                showConfirmButton: false,
                timer: options.timer || 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', window.Swal.stopTimer);
                    toast.addEventListener('mouseleave', window.Swal.resumeTimer);
                }
            });

            return toast.fire({
                icon: type,
                title: message,
                padding: '10px 20px',
                ...options
            });
        },
        
        showLoadingAlert(options = {}) {
            return window.Swal.fire({
                title: options.title || t.processing,
                text: options.text || t.defaultProgress,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    window.Swal.showLoading();
                },
                ...options
            });
        },
        
        closeAlert() {
            window.Swal.close();
        },
        
        getTemplate(templateName, customMessages = {}) {
            const template = t.templates[templateName];
            if (!template) {
                console.warn(`Template '${templateName}' not found. Available templates:`, Object.keys(t.templates));
                return {
                    title: t.confirmTitle,
                    text: t.confirmText,
                    confirmButton: t.confirmButton,
                    successTitle: t.success,
                    successText: t.operationSuccessful
                };
            }

            return {
                ...template,
                ...customMessages
            };
        },

        
        async confirmWithTemplate(templateName, callback, customMessages = {}, options = {}) {
            const template = this.getTemplate(templateName, customMessages);

            const confirmOptions = {
                title: template.title,
                text: template.text,
                confirmButtonText: template.confirmButton,
                successTitle: template.successTitle,
                successText: template.successText,
                ...options
            };

            return await this.triggerAlert('confirmation', confirmOptions, callback);
        },
        
        async confirmSave(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('save', callback, customMessages, options);
        },

        async confirmDelete(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('delete', callback, customMessages, options);
        },

        async confirmUpdate(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('update', callback, customMessages, options);
        },

        async confirmLogout(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('logout', callback, customMessages, options);
        },
        
        async confirmCancel(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('cancel', callback, customMessages, options);
        },
        
        async confirmSubmit(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('submit', callback, customMessages, options);
        },

        async confirmReset(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('reset', callback, customMessages, options);
        },
        
        async confirmArchive(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('archive', callback, customMessages, options);
        },

 
        async confirmRestore(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('restore', callback, customMessages, options);
        },
        
        async confirmPublish(callback, customMessages = {}, options = {}) {
            return await this.confirmWithTemplate('publish', callback, customMessages, options);
        },
        
        async showWithCustomMessages(type, messages = {}, callback = null, options = {}) {
            const alertOptions = {
                title: messages.title,
                text: messages.text || messages.message,
                confirmButtonText: messages.confirmButton || messages.confirmButtonText,
                cancelButtonText: messages.cancelButton || messages.cancelButtonText,
                successTitle: messages.successTitle,
                successText: messages.successText,
                ...options
            };

            return await this.triggerAlert(type, alertOptions, callback);
        },

        
        async showDynamicConfirmation(operation, context = {}, callback = null) {
            // Allow dynamic message creation based on context
            let messages = {};

            if (typeof operation === 'string' && t.templates[operation]) {
                // Use template if available
                messages = this.getTemplate(operation);
            } else if (typeof operation === 'object') {
                // Use operation as messages object
                messages = operation;
            }

            // Interpolate context variables in messages
            if (context && Object.keys(context).length > 0) {
                messages = this.interpolateMessages(messages, context);
            }

            return await this.showWithCustomMessages('confirmation', messages, callback);
        },

        /**
         * Interpolate context variables into message strings
         * @param {Object} messages - Messages object
         * @param {Object} context - Context variables
         * @returns {Object} Messages with interpolated values
         */
        interpolateMessages(messages, context) {
            const interpolated = {};

            for (const [key, value] of Object.entries(messages)) {
                if (typeof value === 'string') {
                    interpolated[key] = value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
                        return context[variable] || match;
                    });
                } else {
                    interpolated[key] = value;
                }
            }

            return interpolated;
        },
        

        async Alert_1() {
            return new window.Swal({
                title: 'Saved successfully',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_2() {
            return new window.Swal({
                icon: 'success',
                title: 'Good job!',
                text: 'You clicked the button!',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_3() {
            const ipAPI = 'https://api.ipify.org?format=json';
            return new window.Swal({
                title: 'Your public IP',
                confirmButtonText: 'Show my public IP',
                text: 'Your public IP will be received via AJAX request',
                showLoaderOnConfirm: true,
                customClass: 'sweet-alerts',
                preConfirm: () => {
                    return fetch(ipAPI)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            new window.Swal({
                                title: data.ip,
                            });
                        })
                        .catch(() => {
                            new window.Swal({
                                type: 'error',
                                title: 'Unable to get your public IP',
                            });
                        });
                },
            });
        },

        async Alert_4() {
            return new window.Swal({
                icon: 'question',
                title: 'The Internet?',
                text: 'That thing is still around?',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_5() {
            const steps = ['1', '2', '3'];
            const swalQueueStep = window.Swal.mixin({
                confirmButtonText: 'Next →',
                showCancelButton: true,
                progressSteps: steps,
                input: 'text',
                inputAttributes: {
                    required: true,
                },
                validationMessage: 'This field is required',
                padding: '2em',
                customClass: 'sweet-alerts',
            });

            const values = [];
            let currentStep;

            for (currentStep = 0; currentStep < steps.length; ) {
                const result = await swalQueueStep.fire({
                    title: `Question ${steps[currentStep]}`,
                    text: currentStep == 0 ? 'Chaining swal modals is easy.' : '',
                    inputValue: values[currentStep],
                    showCancelButton: currentStep > 0,
                    currentProgressStep: currentStep,
                    customClass: 'sweet-alerts',
                });
                if (result.value) {
                    values[currentStep] = result.value;
                    currentStep++;
                } else if (result.dismiss === window.Swal.DismissReason.cancel) {
                    currentStep--;
                } else {
                    break;
                }
            }

            if (currentStep === steps.length) {
                return window.Swal.fire({
                    title: 'All done!',
                    padding: '2em',
                    html: 'Your answers: <pre>' + JSON.stringify(values) + '</pre>',
                    confirmButtonText: 'Lovely!',
                    customClass: 'sweet-alerts',
                });
            }
        },

        async Alert_6() {
            return new window.Swal({
                title: 'Custom animation with Animate.css',
                animation: false,
                showClass: {
                    popup: 'animate__animated animate__flip',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                },
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_7() {
            let timerInterval;

            return new window.Swal({
                title: 'Auto close alert!',
                html: 'I will close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                customClass: 'sweet-alerts',
                didOpen: () => {
                    window.Swal.showLoading();
                    const b = window.Swal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                        b.textContent = window.Swal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                if (result.dismiss === window.Swal.DismissReason.timer) {
                    console.log('I was closed by the timer');
                }
            });
        },

        async Alert_8() {
            return new window.Swal({
                title: 'Sweet!',
                text: 'Modal with a custom image.',
                imageUrl: 'assets/images/custom-swal.svg',
                imageWidth: 224,
                imageHeight: 'auto',
                imageAlt: 'Custom image',
                animation: false,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_9() {
            return new window.Swal({
                icon: 'info',
                title: '<i>HTML</i> <u>example</u>',
                html: 'You can use <b>bold text</b>, ' + '<a href="/github.com">links</a> ' + 'and other HTML tags',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="flaticon-checked-1"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText: '<i class="flaticon-cancel-circle"></i> Cancel',
                cancelButtonAriaLabel: 'Thumbs down',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_10() {
            return new window.Swal({
                icon: 'warning',
                title: t.deleteConfirmTitle,
                text: t.deleteConfirmText,
                showCancelButton: true,
                confirmButtonText: t.deleteConfirmButton,
                cancelButtonText: t.cancelButton,
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.value) {
                    return new window.Swal({
                        title: t.success,
                        text: t.operationSuccessful,
                        icon: 'success',
                        customClass: 'sweet-alerts'
                    });
                }
            });
        },

        async Alert_11() {
            const swalWithBootstrapButtons = window.Swal.mixin({
                confirmButtonClass: 'btn btn-secondary',
                cancelButtonClass: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                buttonsStyling: false,
                customClass: 'sweet-alerts',
            });
            return swalWithBootstrapButtons
                .fire({
                    title: t.deleteConfirmTitle,
                    text: t.deleteConfirmText,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: t.deleteConfirmButton,
                    cancelButtonText: t.noCancel,
                    reverseButtons: true,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                })
                .then((result) => {
                    if (result.value) {
                        return swalWithBootstrapButtons.fire(t.success, t.operationSuccessful, 'success');
                    } else if (result.dismiss === window.Swal.DismissReason.cancel) {
                        return swalWithBootstrapButtons.fire(t.GEN_002, 'Your imaginary file is safe :)', 'error');
                    }
                });
        },

        async Alert_12() {
            return new window.Swal({
                title: 'Custom width, padding, background.',
                width: 600,
                padding: '7em',
                customClass: 'background-modal sweet-alerts',
                background: '#fff url(assets/images/sweet-bg.jpg) no-repeat 100% 100%',
            });
        },

        async Alert_13() {
            return new window.Swal({
                icon: 'error',
                title: t.error,
                text: t.GEN_001,
                footer: `<a href="javascript:;">${t.whyIssue}</a>`,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_14() {
            return new window.Swal({
                title: 'هل تريد الاستمرار؟',
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
                showCancelButton: true,
                showCloseButton: true,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        },

        async Alert_15() {
            const toast = window.Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            return toast.fire({
                icon: 'success',
                title: t.signedInSuccessfully,
                padding: '10px 20px',
            });
        },

        // ========================================
        // ORIGINAL FUNCTIONALITY CONTINUES
        // ========================================

        // Main execution method - works with any API
        async execute(fn, options = {}) {
            const {
                progressMessage = t.defaultProgress,
                successMessage = null,
                successTitle = null,
                errorTitle = null,
                successCallback = null,
                errorCallback = null,
                finallyCallback = null,
                logErrors = true,
                showProgress = true,
                showSuccessAlert = true,
                showErrorAlert = true,
                autoHideSuccess = true,
                successTimer = 3000
            } = options;

            let loadingAlert = null;

            try {
                // Show loading alert if progress is enabled
                if (showProgress) {
                    loadingAlert = this.showLoadingAlert({
                        title: t.processing,
                        text: progressMessage
                    });
                }

                // Start execution
                this.setProgress(true, progressMessage, showProgress);

                // Execute the function
                const result = await fn();

                // Close loading alert
                if (loadingAlert) {
                    this.closeAlert();
                }

                // Handle success
                this.handleResponse(result, 'success', {
                    successCallback,
                    autoHide: autoHideSuccess
                });

                // Show success alert
                if (showSuccessAlert) {
                    this.showSuccessAlert({
                        title: successTitle || t.success,
                        text: successMessage || t.operationSuccessful,
                        timer: autoHideSuccess ? successTimer : undefined,
                        timerProgressBar: autoHideSuccess
                    });
                }

                return result;

            } catch (error) {
                
                if (loadingAlert) {
                    this.closeAlert();
                }

                
                this.handleResponse(error, 'error', {
                    errorCallback,
                    logErrors
                });

                // Show error alert
                const processedError = this.processResponse(error, 'error');
                if(processedError.type === 'warning') {
                    this.showWarningAlert({
                        text: processedError.message,
                    })
                }else if (showErrorAlert) {
                    this.showErrorAlert({
                        title: errorTitle || t.error,
                        text: processedError.message,
                    });
                }

                throw error;

            } finally {
                this.setProgress(false);

                if (finallyCallback) {
                    try {
                        await finallyCallback();
                    } catch (finallyError) {
                        console.error('Error in finally callback:', finallyError);
                    }
                }
            }
        },
        
        async executeWithTemplate(fn, templateName, options = {}) {
            const template = this.getTemplate(templateName);

            const executeOptions = {
                successTitle: template.successTitle,
                successMessage: template.successText,
                progressMessage: options.progressMessage || t.defaultProgress,
                ...options
            };

            return await this.execute(fn, executeOptions);
        },

        
        async executeWithConfirmation(fn, templateName, customMessages = {}, options = {}) {
            const confirmed = await this.confirmWithTemplate(templateName, null, customMessages, {
                showSuccessAlert: false, // Don't show success in confirmation, we'll show it after execution
                ...options
            });

            if (confirmed && confirmed.confirmed) {
                const template = this.getTemplate(templateName, customMessages);

                return await this.execute(fn, {
                    successTitle: template.successTitle,
                    successMessage: template.successText,
                    progressMessage: options.progressMessage || t.defaultProgress,
                    ...options
                });
            }

            return { cancelled: true };
        },

        // Set progress state
        setProgress(inProgress, message = '', show = true) {
            this.inProgress = inProgress && show;
            this.progressMessage = inProgress ? message : '';
        },

        // Handle different response types
        handleResponse(response, type, options = {}) {
            const { successCallback, errorCallback, logErrors = true, autoHide = true } = options;

            const processedResponse = this.processResponse(response, type);

            // Update response state
            this.response.status = true;
            this.response.type = processedResponse.type;
            this.response.msg = processedResponse.message;
            this.response.code = processedResponse.code;
            this.response.details = processedResponse.details;
            this.response.timestamp = new Date().toISOString();

            
            if (logErrors && processedResponse.type === 'error') {
                this.logError(processedResponse);
            }
            
            if (processedResponse.type === 'success' && successCallback) {
                successCallback(response);
            } else if (processedResponse.type === 'error' && errorCallback) {
                errorCallback(response);
            }

            // Auto-hide success messages
            if (processedResponse.type === 'success' && autoHide) {
                setTimeout(() => {
                    if (this.response.type === 'success') {
                        this.clearResponse();
                    }
                }, 3000);
            }
            
        },

        // Process different API response formats
        processResponse(response, forceType = null) {
            let processedResponse = {
                type: forceType || 'info',
                message: t.operationCompleted,
                code: '',
                details: ''
            };
            if (response instanceof Error) {
                // Handle JavaScript/Network errors
                processedResponse = this.processError(response);
            } else if (response && typeof response === 'object') {
                // Handle structured API responses
                processedResponse = this.processApiResponse(response, forceType);
            } else if (typeof response === 'string') {
                // Handle string responses
                processedResponse.message = response;
                processedResponse.type = forceType || 'info';
            }
            
            return processedResponse;
            
        },

        
        processApiResponse(response, forceType) {
            let processedResponse = {
                type: forceType || 'info',
                message: t.operationCompleted,
                code: '',
                details: ''
            };

            
            if (response.hasOwnProperty('success')) {
                processedResponse.type = response.success ? 'success' : 'error';
                processedResponse.message = response.message || (response.success ? t.operationSuccessful : t.operationFailed);
                processedResponse.code = response.code || response.errorCode || '';
                processedResponse.details = response.details || response.error || '';
            }

           
            else if (response.hasOwnProperty('valid')) {
                if (response.valid === true) {
                    processedResponse.type = 'success';
                    processedResponse.message = response.msg || t.operationSuccessful;
                } else {
                    processedResponse.type = response.warning ? 'warning' : 'error';
                    processedResponse.message = response.msg || t.operationFailed;
                }
                processedResponse.code = response.code || '';
                processedResponse.details = response.details || '';
            }
            
            else if (response.hasOwnProperty('status')) {
                processedResponse.type = response.status === 'success' ? 'success' : 'error';
                processedResponse.message = response.message || response.msg || t.operationCompleted;
                processedResponse.code = response.code || '';
                processedResponse.details = response.details || response.error || '';
            }

            
            else if (response.hasOwnProperty('ok')) {
                processedResponse.type = response.ok ? 'success' : 'error';
                processedResponse.message = response.statusText || (response.ok ? t.requestSuccessful : t.requestFailed);
                processedResponse.code = `HTTP_${response.status}`;
                processedResponse.details = response.url || '';
            }

            
            else if (forceType === 'success') {
                processedResponse.type = 'success';
                processedResponse.message = t.operationSuccessful;
            }
            
            if (processedResponse.code && t[processedResponse.code]) {
                processedResponse.message = t[processedResponse.code];
            }

            return processedResponse;
        },

        
        processError(error) {
            let errorInfo = {
                type: 'error',
                message: t.GEN_001,
                code: 'GEN_001',
                details: error.message || error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString()
            };

            
            if (error.isCustomException || error instanceof BaseException) {
                errorInfo.code = error.code || 'GEN_001';
                errorInfo.message = t[error.code] || error.message || t.GEN_001;
                errorInfo.details = error.details || '';
                errorInfo.type = error.dialogType
                errorInfo.data = error.data;
                errorInfo.stack = error.stack;
                return errorInfo;
            }

            if (error.code && t[error.code]) {
                errorInfo.code = error.code;
                errorInfo.message = t[error.code];
                errorInfo.details = error.details || error.message;
                errorInfo.stack = error.stack;
                return errorInfo;
            }

            // Handle standard JavaScript errors with mapping
            const errorMessage = error.message.toLowerCase();

            if (error.name === 'TypeError') {
                errorInfo.code = 'VAL_003';
                errorInfo.message = t.VAL_003;
            } else if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
                errorInfo.code = 'NET_001';
                errorInfo.message = t.NET_001;
            } else if (errorMessage.includes('timeout')) {
                errorInfo.code = 'NET_002';
                errorInfo.message = t.NET_002;
            } else if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
                errorInfo.code = 'AUTH_001';
                errorInfo.message = t.AUTH_001;
            } else if (errorMessage.includes('403') || errorMessage.includes('forbidden')) {
                errorInfo.code = 'BIZ_002';
                errorInfo.message = t.BIZ_002;
            } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
                errorInfo.code = 'BIZ_003';
                errorInfo.message = t.BIZ_003;
            } else if (errorMessage.includes('500') || errorMessage.includes('internal server')) {
                errorInfo.code = 'SYS_001';
                errorInfo.message = t.SYS_001;
            }
            
            return errorInfo;
        },

        logError(errorInfo) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                code: errorInfo.code,
                message: errorInfo.message,
                details: errorInfo.details,
                stack: errorInfo.stack, // Include full stack trace
                data: errorInfo.data, // Include any additional data
                locale: this.locale,
                context: {
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    userId: this.getCurrentUserId ? this.getCurrentUserId() : 'anonymous',
                    sessionId: this.getSessionId ? this.getSessionId() : null,
                    timestamp: errorInfo.timestamp
                },
                // Browser environment info
                environment: {
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    screen: {
                        width: screen.width,
                        height: screen.height
                    },
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    language: navigator.language
                }
            };

            // Console logging with proper formatting
            console.group(`🚨 Application Error [${errorInfo.code}]`);
            console.error('Message:', errorInfo.message);
            console.error('Details:', errorInfo.details);
            console.error('Stack Trace:', errorInfo.stack);
            if (errorInfo.data) {
                console.error('Additional Data:', errorInfo.data);
            }
            console.error('Full Log Entry:', logEntry);
            console.groupEnd();

            // Send to server if enabled
            if (this.shouldLogToServer && this.shouldLogToServer()) {
                this.sendErrorToServer(logEntry);
            }
        },
        
        async sendErrorToServer(logEntry) {
            const maxRetries = 3;
            let retryCount = 0;

            const attemptSend = async () => {
                try {
                    const response = await fetch('/api/logs/error', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Error-Log': 'true'
                        },
                        body: JSON.stringify(logEntry)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    console.log('✅ Error logged to server successfully');
                    return true;

                } catch (loggingError) {
                    retryCount++;
                    console.warn(`⚠️ Failed to log error to server (attempt ${retryCount}/${maxRetries}):`, loggingError.message);

                    if (retryCount < maxRetries) {
                        // Exponential backoff: 1s, 2s, 4s
                        const delay = Math.pow(2, retryCount - 1) * 1000;
                        console.log(`🔄 Retrying in ${delay}ms...`);

                        await new Promise(resolve => setTimeout(resolve, delay));
                        return attemptSend();
                    } else {
                        console.error('❌ Failed to log error to server after all retries');

                        // Store in localStorage as fallback
                        this.storeErrorLocally(logEntry);
                        return false;
                    }
                }
            };

            return attemptSend();
        },
        
        storeErrorLocally(logEntry) {
            try {
                const key = `error_log_${Date.now()}`;
                localStorage.setItem(key, JSON.stringify(logEntry));
                console.log('💾 Error stored locally for later sync');

                // Clean up old entries (keep only last 10)
                const errorKeys = Object.keys(localStorage)
                    .filter(key => key.startsWith('error_log_'))
                    .sort()
                    .slice(0, -10);

                errorKeys.forEach(key => localStorage.removeItem(key));

            } catch (storageError) {
                console.error('Failed to store error locally:', storageError);
            }
        },

        // Utility methods
        clearResponse() {
            this.response.status = false;
            this.response.type = '';
            this.response.msg = '';
            this.response.code = '';
            this.response.details = '';
            this.response.timestamp = null;
            this.showDetails = false;
        },

        // Direct message methods
        showSuccess(message, code = '') {
            this.handleResponse({ message, code }, 'success', { autoHide: true });
        },

        showError(message, code = '', details = '') {
            this.handleResponse({ message, code, details }, 'error');
        },

        showWarning(message, code = '') {
            this.handleResponse({ message, code }, 'warning');
        },

        showInfo(message, code = '') {
            this.handleResponse({ message, code }, 'info');
        },

        // Configuration methods (override these in your component)
        getCurrentUserId() {
            // Implement based on your authentication system
            return localStorage.getItem('userId') || 'anonymous';
        },

        shouldLogToServer() {
            // Implement based on your logging requirements
            return true; // Set to false to disable server logging
        }
    };
}

