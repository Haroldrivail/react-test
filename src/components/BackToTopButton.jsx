import React, { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
      
      // Calculate scroll progress (0 to 100)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed right-6 bottom-20 z-50">
          {/* Circle progress indicator */}
          <div 
            className="relative w-12 h-12 cursor-pointer"
            onClick={scrollToTop}
          >
            {/* Background circle */}
            <svg className="w-12 h-12" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#1F2937"
                stroke="#4B5563"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#4F46E5"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            
            {/* Arrow icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
