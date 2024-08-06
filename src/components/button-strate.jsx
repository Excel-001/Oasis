import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({
  text = "Shop Now",
  onClick,
  buttonClass = "",
  textClass = "",
  textColor = "" // Default text color
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPlus, setShowPlus] = useState(true);
  const [showText, setShowText] = useState(false); // State to control text visibility
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          setTimeout(() => {
            setShowPlus(false);
            // Show text after a delay to ensure expansion is complete
            setTimeout(() => setShowText(true), 1000); // Adjust delay based on animation time
          }, 2000);
        } else {
          setIsVisible(false);
          setShowPlus(true); // Reset to '+' when scrolling out of view
          setShowText(false);
        }
      },
      { threshold: 0.1 }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={buttonRef}
      initial={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
      animate={{
        width: isVisible ? (showPlus ? '3rem' : '10rem') : '3rem',
        height: isVisible ? (showPlus ? '3rem' : '3rem') : '3rem',
        borderRadius: isVisible ? (showPlus ? '50%' : '1.5rem') : '50%',
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.5, ease: 'easeInOut' }}
      className={`flex items-center justify-center border ${isVisible ? buttonClass:""} border-slate-950 p-2 ${showPlus ? buttonClass : ""}`}
      onClick={onClick}
    >
      {/* Content for initial circle state */}
      {showPlus && isVisible && (
        <p className={`text-xl font-semibold transition-opacity duration-300 opacity-100 ${textColor} ${textClass}`}>+</p>
      )}

      {/* Content for expanded state */}
      {!showPlus && isVisible && (
        <div className="flex items-center space-x-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: showText ? [1] : 0 }}
            transition={{ delay: 0.01, duration: .4 }} // Adjust delay and duration as needed
            className={`transition-opacity text-base font-semibold duration-300 ${showText ? 'opacity-100' : 'opacity-0'} ${textColor} ${textClass}`}
          >
            {text}
          </motion.p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path d="M14.4301 19.3201C14.2401 19.3201 14.0501 19.2501 13.9001 19.1001C13.6101 18.8101 13.6101 18.3301 13.9001 18.0401L19.4401 12.5001L13.9001 6.96012C13.6101 6.67012 13.6101 6.19012 13.9001 5.90012C14.1901 5.61012 14.6701 5.61012 14.9601 5.90012L21.0301 11.9701C21.3201 12.2601 21.3201 12.7401 21.0301 13.0301L14.9601 19.1001C14.8101 19.2501 14.6201 19.3201 14.4301 19.3201Z" fill="#292D32" />
            <path d="M20.33 13.25H3.5C3.09 13.25 2.75 12.91 2.75 12.5C2.75 12.09 3.09 11.75 3.5 11.75H20.33C20.74 11.75 21.08 12.09 21.08 12.5C21.08 12.91 20.74 13.25 20.33 13.25Z" fill="#292D32" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedButton;
