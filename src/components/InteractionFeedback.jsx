import React, { useState, useEffect } from 'react';

export function useButtonFeedback() {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const buttonProps = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseLeave: () => {
      setIsPressed(false);
      setIsHovered(false);
    },
    onMouseEnter: () => setIsHovered(true),
    className: `transition-all duration-200 transform ${isPressed ? 'scale-95' : isHovered ? 'scale-102' : ''}`
  };
  
  return buttonProps;
}

export function ButtonFeedback({ children, onClick, className = '', disabled = false }) {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => !disabled && setIsPressed(false)}
      onMouseLeave={() => !disabled && setIsPressed(false)}
      className={`${className} transition-transform duration-100 ${isPressed && !disabled ? 'transform scale-95' : ''}`}
    >
      {children}
    </button>
  );
}

export function RippleEffect({ color = 'rgba(255, 255, 255, 0.7)' }) {
  const [ripples, setRipples] = useState([]);
  
  const addRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const rippleId = Date.now();
    
    setRipples([...ripples, { id: rippleId, x, y }]);
    
    setTimeout(() => {
      setRipples(ripples => ripples.filter(ripple => ripple.id !== rippleId));
    }, 1000);
  };
  
  useEffect(() => {
    const elements = document.querySelectorAll('.ripple-container');
    
    const handleClick = (event) => {
      addRipple(event);
    };
    
    elements.forEach(element => {
      element.addEventListener('click', handleClick);
    });
    
    return () => {
      elements.forEach(element => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, []);
  
  return (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            transform: 'translate(-50%, -50%)',
            backgroundColor: color,
            width: '5px',
            height: '5px'
          }}
        />
      ))}
    </>
  );
}

export default function InteractionFeedback() {
  return null; // Utility component, doesn't render anything
}
