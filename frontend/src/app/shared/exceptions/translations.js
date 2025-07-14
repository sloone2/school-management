export const TRANSLATIONS = {
    en: {
        // General messages
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
        processing: 'Processing',
        
        // Operation messages
        operationSuccessful: 'Operation completed successfully',
        operationCompleted: 'Operation completed',
        operationFailed: 'Operation failed',
        requestSuccessful: 'Request successful',
        requestFailed: 'Request failed',
        signedInSuccessfully: 'Signed in successfully',
        
        // Progress messages
        defaultProgress: 'Please wait...',
        
        // Confirmation messages
        confirmTitle: 'Are you sure?',
        confirmText: 'This action cannot be undone',
        confirmButton: 'Yes, Continue',
        cancelButton: 'Cancel',
        noCancel: 'No, Cancel',
        
        // Delete confirmation
        deleteConfirmTitle: 'Delete Confirmation',
        deleteConfirmText: 'Are you sure you want to delete this item?',
        deleteConfirmButton: 'Yes, Delete',
        
        // Error codes
        GEN_001: 'An unexpected error occurred. Please try again.',
        GEN_002: 'Operation cancelled',
        VAL_001: 'Please check your input and try again',
        VAL_003: 'Invalid data type provided',
        NET_001: 'Network error. Please check your connection.',
        NET_002: 'Request timeout. Please try again.',
        AUTH_001: 'Authentication required. Please log in.',
        BIZ_002: 'Access denied. You do not have permission.',
        BIZ_003: 'Resource not found',
        SYS_001: 'Server error. Please try again later.',
        
        // Other messages
        whyIssue: 'Why did this issue occur?',
        
        // Templates for different operations
        templates: {
            save: {
                title: 'Save Changes',
                text: 'Are you sure you want to save these changes?',
                confirmButton: 'Yes, Save',
                successTitle: 'Saved',
                successText: 'Changes have been saved successfully'
            },
            delete: {
                title: 'Delete Item',
                text: 'Are you sure you want to delete this item? This action cannot be undone.',
                confirmButton: 'Yes, Delete',
                successTitle: 'Deleted',
                successText: 'Item has been deleted successfully'
            },
            update: {
                title: 'Update Item',
                text: 'Are you sure you want to update this item?',
                confirmButton: 'Yes, Update',
                successTitle: 'Updated',
                successText: 'Item has been updated successfully'
            },
            logout: {
                title: 'Logout',
                text: 'Are you sure you want to logout?',
                confirmButton: 'Yes, Logout',
                successTitle: 'Logged Out',
                successText: 'You have been logged out successfully'
            },
            cancel: {
                title: 'Cancel Operation',
                text: 'Are you sure you want to cancel this operation?',
                confirmButton: 'Yes, Cancel',
                successTitle: 'Cancelled',
                successText: 'Operation has been cancelled'
            },
            submit: {
                title: 'Submit Form',
                text: 'Are you sure you want to submit this form?',
                confirmButton: 'Yes, Submit',
                successTitle: 'Submitted',
                successText: 'Form has been submitted successfully'
            },
            reset: {
                title: 'Reset Form',
                text: 'Are you sure you want to reset this form? All changes will be lost.',
                confirmButton: 'Yes, Reset',
                successTitle: 'Reset',
                successText: 'Form has been reset successfully'
            },
            archive: {
                title: 'Archive Item',
                text: 'Are you sure you want to archive this item?',
                confirmButton: 'Yes, Archive',
                successTitle: 'Archived',
                successText: 'Item has been archived successfully'
            },
            restore: {
                title: 'Restore Item',
                text: 'Are you sure you want to restore this item?',
                confirmButton: 'Yes, Restore',
                successTitle: 'Restored',
                successText: 'Item has been restored successfully'
            },
            publish: {
                title: 'Publish Item',
                text: 'Are you sure you want to publish this item?',
                confirmButton: 'Yes, Publish',
                successTitle: 'Published',
                successText: 'Item has been published successfully'
            }
        }
    }
};

