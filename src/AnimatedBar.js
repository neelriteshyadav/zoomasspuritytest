import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedProgressBar = ({ score }) => {
    // eslint-disable-next-line
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation completion (optional)
  const handleAnimationComplete = () => {
    setIsAnimating(false); // Reset animation state if needed
  };

  return (
    score > 0 && (
      <div className='mt-4 w-full'>
        <div className='relative pt-1'>
          <div className='flex mb-2 items-center justify-between'>
            <div>
              <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200'>
                Your Purity %:
              </span>
            </div>
            <div className='text-right'>
              <span className='text-xs font-semibold inline-block text-blue-600'>{`${score.toFixed(
                1,
              )}%`}</span>
            </div>
          </div>
          <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200'>
            <motion.div
              initial={{ width: 0 }} // Start from 0 width for a clear animation
              animate={{ width: `${score.toFixed(1)}%` }} // Animate to score percentage
              transition={{ duration: 1, ease: 'easeInOut' }} // Customize animation duration and easing
              onAnimationComplete={handleAnimationComplete} // Optional completion handler
              className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500'
            />
          </div>
        </div>
      </div>
    )
  );
};

export default AnimatedProgressBar;
