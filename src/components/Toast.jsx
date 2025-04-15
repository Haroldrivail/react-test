import React, { useEffect, useState } from 'react';
import { TOAST_TYPES } from '../contexts/ToastContext';

export default function Toast({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);
  
  // Handle the animation before removing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsExiting(true);
    }, toast.duration - 300); // Start exit animation 300ms before removal

    return () => clearTimeout(timeoutId);
  }, [toast.duration]);

  // Get the correct icon and color based on toast type
  const getToastStyles = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return {
          bgColor: 'bg-green-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ),
        };
      case TOAST_TYPES.ERROR:
        return {
          bgColor: 'bg-red-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ),
        };
      case TOAST_TYPES.WARNING:
        return {
          bgColor: 'bg-yellow-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          ),
        };
      case TOAST_TYPES.INFO:
      default:
        return {
          bgColor: 'bg-indigo-500',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
        };
    }
  };

  const { bgColor, icon } = getToastStyles();

  const handleActionClick = () => {
    if (toast.action?.onClick) {
      toast.action.onClick();
    }
    onRemove(toast.id);
  };

  return (
    <div 
      className={`
        flex items-center p-3 rounded-lg shadow-lg mb-2 text-white 
        ${bgColor} ${isExiting ? 'animate-fade-out' : 'animate-slide-in'} 
        min-w-[250px] max-w-md
      `}
      role="alert"
    >
      <div className="flex-shrink-0 mr-2">
        {icon}
      </div>
      <div className="flex-1">
        <p>{toast.message}</p>
        
        {/* Action button */}
        {toast.action && (
          <button 
            onClick={handleActionClick}
            className="mt-1 px-3 py-1 bg-white bg-opacity-25 hover:bg-opacity-40 rounded text-sm font-medium transition-colors duration-200"
          >
            {toast.action.text}
          </button>
        )}
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="ml-2 bg-transparent text-current opacity-75 hover:opacity-100 focus:outline-none"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
}
