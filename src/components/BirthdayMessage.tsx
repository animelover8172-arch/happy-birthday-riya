import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote } from 'lucide-react';

const FULL_MESSAGE = 
  "Today is all about celebrating you. May this new year of your life bring you countless smiles, beautiful memories, peaceful moments and everything your heart wishes for. Keep smiling, keep shining and always stay the wonderful person you are. Happy Birthday once again, Riya! 🎂✨";

export function BirthdayMessage() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const speed = 20; // Fast, smooth and pleasant typing speed
    
    const interval = setInterval(() => {
      if (index < FULL_MESSAGE.length) {
        setDisplayedText(FULL_MESSAGE.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="birthday-message-section" className="relative w-full max-w-lg mx-auto px-2 py-4">
      {/* Curved Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/40 backdrop-blur-lg border border-white/70 p-6 sm:p-8 rounded-[36px] sm:rounded-[40px] shadow-lg shadow-pink-200/20 relative"
      >
        {/* Floating Mail Badge */}
        <div className="absolute -top-4 right-5 sm:right-7 text-3xl sm:text-4xl select-none filter drop-shadow-xs animate-bounce" style={{ animationDuration: '4s' }}>
          💌
        </div>

        {/* Card Title */}
        <h3 className="text-pink-900 font-bold text-xs sm:text-sm mb-3 tracking-tight uppercase flex items-center gap-1.5">
          <span>A Little Birthday Message For You</span>
        </h3>

        {/* Card Body */}
        <p className="text-pink-800 leading-relaxed text-base sm:text-lg italic opacity-90 font-serif min-h-[100px]">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-1.5 h-4 bg-pink-400 ml-1 animate-pulse align-middle" />
          )}
        </p>

        {/* Delicate Bottom Accent */}
        <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-between text-[11px] text-pink-400 uppercase tracking-widest font-medium">
          <span>Made for Riya</span>
          <span className="italic font-serif normal-case text-pink-600">With Love 💗</span>
        </div>
      </motion.div>
    </div>
  );
}
