import React from 'react';
import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion/dom';


const RevealText = ({ text, className }) => {
  const words = text.split(' ');



  return (
    <div className={` gap-1 flex-wrap justify-center flex ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
    
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
           ease: "linear",
            delay: i * 0.03,
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </div>
  );
};

export default RevealText;
