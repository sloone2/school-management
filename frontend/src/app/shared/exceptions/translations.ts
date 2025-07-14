export const TRANSLATIONS = {
  ERRORS: {
    GENERIC: {
      UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
      NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
      SERVER_ERROR: 'Server error occurred. Please try again later.',
      TIMEOUT_ERROR: 'Request timed out. Please try again.',
      PERMISSION_DENIED: 'You do not have permission to perform this action.',
      RESOURCE_NOT_FOUND: 'The requested resource was not found.',
      VALIDATION_FAILED: 'Please check your input and try again.',
      OPERATION_FAILED: 'Operation failed. Please try again.'
    },
    CODES: {
      'NETWORK_ERROR': 'Network connection failed. Please check your internet connection.',
      'AUTH_ERROR': 'Authentication failed. Please log in again.',
      'VALIDATION_ERROR': 'Please check your input and try again.',
      'BUSINESS_ERROR': 'Business rule violation occurred.',
      'SERVER_ERROR': 'Server error occurred. Please try again later.',
      'TIMEOUT_ERROR': 'Request timed out. Please try again.',
      'PERMISSION_DENIED': 'You do not have permission to perform this action.',
      'RESOURCE_NOT_FOUND': 'The requested resource was not found.',
      'DUPLICATE_ENTRY': 'This entry already exists.',
      'INVALID_INPUT': 'Invalid input provided.',
      'OPERATION_NOT_ALLOWED': 'This operation is not allowed.',
      'QUOTA_EXCEEDED': 'Quota limit exceeded.',
      'SERVICE_UNAVAILABLE': 'Service is temporarily unavailable.'
    },
    TITLES: {
      VALIDATION_ERROR: 'Validation Error',
      BUSINESS_ERROR: 'Business Error',
      NETWORK_ERROR: 'Network Error',
      AUTH_ERROR: 'Authentication Error',
      GENERIC_ERROR: 'Error'
    }
  },
  SUCCESS: {
    OPERATION_COMPLETED: 'Operation completed successfully!',
    SAVE_SUCCESS: 'Data saved successfully!',
    DELETE_SUCCESS: 'Item deleted successfully!',
    UPDATE_SUCCESS: 'Item updated successfully!',
    CREATE_SUCCESS: 'Item created successfully!',
    ACTIONS: {
      SAVE: 'Data saved successfully!',
      UPDATE: 'Item updated successfully!',
      DELETE: 'Item deleted successfully!',
      CREATE: 'Item created successfully!',
      SUBMIT: 'Form submitted successfully!',
      SEND: 'Message sent successfully!',
      UPLOAD: 'File uploaded successfully!',
      DOWNLOAD: 'File downloaded successfully!'
    }
  },
  CONFIRMATIONS: {
    DEFAULT_TITLE: 'Confirm Action',
    DEFAULT_TEXT: 'Are you sure you want to proceed?',
    ACTIONS: {
      DELETE: {
        TITLE: 'Confirm Delete',
        TEXT: 'Are you sure you want to delete this item? This action cannot be undone.',
        ICON: 'warning',
        CONFIRM: 'Yes, Delete'
      },
      SAVE: {
        TITLE: 'Confirm Save',
        TEXT: 'Are you sure you want to save these changes?',
        ICON: 'question',
        CONFIRM: 'Yes, Save'
      },
      UPDATE: {
        TITLE: 'Confirm Update',
        TEXT: 'Are you sure you want to update this item?',
        ICON: 'question',
        CONFIRM: 'Yes, Update'
      },
      SUBMIT: {
        TITLE: 'Confirm Submit',
        TEXT: 'Are you sure you want to submit this form?',
        ICON: 'question',
        CONFIRM: 'Yes, Submit'
      },
      CANCEL: {
        TITLE: 'Confirm Cancel',
        TEXT: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
        ICON: 'warning',
        CONFIRM: 'Yes, Cancel'
      }
    }
  },
  BUTTONS: {
    OK: 'OK',
    CANCEL: 'Cancel',
    CONFIRM: 'Confirm',
    YES: 'Yes',
    NO: 'No',
    SAVE: 'Save',
    DELETE: 'Delete',
    EDIT: 'Edit',
    VIEW: 'View',
    CLOSE: 'Close',
    SUBMIT: 'Submit',
    RETRY: 'Retry',
    CONTINUE: 'Continue'
  },
  PROGRESS: {
    PROCESSING: 'Processing...',
    LOADING: 'Loading...',
    SAVING: 'Saving...',
    DELETING: 'Deleting...',
    UPDATING: 'Updating...',
    UPLOADING: 'Uploading...',
    DOWNLOADING: 'Downloading...',
    PLEASE_WAIT: 'Please wait...'
  },
  ALERTS: {
    DEFAULT_TITLES: {
      SUCCESS: 'Success',
      ERROR: 'Error',
      WARNING: 'Warning',
      INFO: 'Information'
    }
  },
  VALIDATION: {
    REQUIRED: 'This field is required.',
    EMAIL: 'Please enter a valid email address.',
    MIN_LENGTH: 'Minimum length is {min} characters.',
    MAX_LENGTH: 'Maximum length is {max} characters.',
    PATTERN: 'Please enter a valid format.',
    NUMBER: 'Please enter a valid number.',
    DATE: 'Please enter a valid date.',
    URL: 'Please enter a valid URL.',
    PHONE: 'Please enter a valid phone number.',
    PASSWORD: 'Password must be at least 8 characters long.',
    CONFIRM_PASSWORD: 'Passwords do not match.'
  }
};
