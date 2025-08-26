export interface SimpleErrorHandler {
  inProgress: boolean;
  showSuccess(message: string): void;
  showError(message: string): void;
  showWarning(message: string): void;
  executeWithConfirmation(operation: () => Promise<any>, confirmMessage: string): Promise<any>;
}

export function createSimpleErrorHandler(): SimpleErrorHandler {
  let inProgress = false;

  const showSuccess = (message: string): void => {
    // You can replace this with Angular Material Snackbar or any other notification system
    console.log('SUCCESS:', message);
    alert(`Success: ${message}`);
  };

  const showError = (message: string): void => {
    console.error('ERROR:', message);
    alert(`Error: ${message}`);
  };

  const showWarning = (message: string): void => {
    console.warn('WARNING:', message);
    alert(`Warning: ${message}`);
  };

  const executeWithConfirmation = async (
    operation: () => Promise<any>,
    confirmMessage: string
  ): Promise<any> => {
    const confirmed = confirm(confirmMessage);
    
    if (!confirmed) {
      throw new Error('Operation cancelled by user');
    }

    inProgress = true;
    try {
      const result = await operation();
      return result;
    } catch (error) {
      throw error;
    } finally {
      inProgress = false;
    }
  };

  return {
    get inProgress() { return inProgress; },
    showSuccess,
    showError,
    showWarning,
    executeWithConfirmation
  };
}

