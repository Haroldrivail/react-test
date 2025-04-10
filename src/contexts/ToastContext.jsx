import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext(null);

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a new toast notification
  const addToast = (message, type = TOAST_TYPES.INFO, options = {}) => {
    const id = Date.now().toString();
    const { duration = 3000, action = null } = options;
    
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type, duration, action },
    ]);

    // Auto-remove the toast after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  // Remove a toast by id
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Create convenience methods for different toast types
  const success = (message, options = {}) => 
    addToast(message, TOAST_TYPES.SUCCESS, options);
    
  const error = (message, options = {}) => 
    addToast(message, TOAST_TYPES.ERROR, options);
    
  const info = (message, options = {}) => 
    addToast(message, TOAST_TYPES.INFO, options);
    
  const warning = (message, options = {}) => 
    addToast(message, TOAST_TYPES.WARNING, options);

  // Value provided by the context
  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

// Custom hook to use the toast context
export function useToast() {
  return useContext(ToastContext);
}
