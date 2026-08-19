import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, Flower2, Star, Flame, Cake, RefreshCw } from 'lucide-react';
import { playChimeSound } from '../utils/audioSynth';

export function SurpriseSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [candleBlown, setCandleBlown] = useState(false);

  const triggerConfettiBurst = () => {
    // Elegant pastel and gold confetti burst
    const colors = ['#f472b6', '#fb7185', '#ec4899', '#fef08a', '#e9d5ff', '#fed7aa'];
    
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors,
      disableForReducedMotion: true
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.6 },
        colors
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.6 },
        colors
      });
    }, 250);
  };

  const handleOpenSurprise = () => {
    playChimeSound('sparkle');
    triggerConfettiBurst();
    setIsOpen(true);
  };

  const handleBlowCandle = () => {
    if (candleBlown) return;
    playChimeSound('candle_blow');
    setCandleLit(false);
    setCandleBlown(true);

    setTimeout(() => {
      playChimeSound('sparkle');
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#f472b6', '#fef08a', '#fbcfe8']
      });
    }, 400);
  };

  const handleResetCandle = () => {
    playChimeSound('pop');
    setCandleLit(true);
    setCandleBlown(false);
  };

  return (
    <div id="birthday-surprise-section" className="relative w-full max-w-lg mx-auto px-2 py-4 text-center">
      {/* Trigger Button or Revealed Surprise */}
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center"
        >
          <motion.button
            id="open-birthday-surprise-btn"
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative cursor-pointer outline-none"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 rounded-full blur-md opacity-30 group-hover:opacity-65 transition duration-500" />
            
            {/* Button Surface */}
            <div className="relative px-8 py-4 bg-white border border-pink-100/80 rounded-full leading-none flex items-center justify-center space-x-2 shadow-sm">
              <Gift className="w-4 h-4 text-pink-500" />
              <span className="text-pink-600 font-bold tracking-wider uppercase text-xs sm:text-sm">
                Open Your Birthday Surprise 🎁
              </span>
            </div>
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            id="revealed-surprise-card"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/45 backdrop-blur-xl border border-white/80 rounded-[36px] sm:rounded-[40px] p-6 sm:p-8 shadow-xl shadow-pink-200/25 relative overflow-hidden text-center"
          >
            {/* Sparkle badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 text-pink-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 border border-pink-200/60">
              <Sparkles className="w-3 h-3 text-pink-500" />
              <span>Secret Birthday Surprise</span>
              <Sparkles className="w-3 h-3 text-pink-500" />
            </div>

            {/* Primary Hidden Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-pink-900 leading-tight mb-2">
                You are truly special,{' '}
                <span className="font-script text-pink-500 block sm:inline font-bold">
                  Riya!
                </span>{' '}
                <span className="inline-block text-2xl sm:text-3xl">💗✨</span>
              </h2>

              <p className="font-serif text-base sm:text-lg text-pink-800 italic opacity-90 leading-relaxed">
                “Keep smiling, keep shining and keep being you. 🌸”
              </p>
            </motion.div>

            {/* Interactive Candle / Cake Wish Moment */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 p-4 rounded-3xl bg-white/60 border border-pink-100 shadow-inner max-w-sm mx-auto flex flex-col items-center justify-center"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-700 mb-2">
                <Cake className="w-3.5 h-3.5 text-pink-500" />
                <span>Make a Birthday Wish, Riya!</span>
              </div>

              {/* Candle flame interaction */}
              <div className="relative my-1.5 flex flex-col items-center">
                {candleLit && (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      y: [0, -2, 0, -1, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="text-amber-500 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] cursor-pointer"
                    onClick={handleBlowCandle}
                    title="Tap to blow the candle"
                  >
                    <Flame className="w-6 h-6 fill-amber-400" />
                  </motion.div>
                )}
                {!candleLit && (
                  <div className="text-gray-400 flex flex-col items-center">
                    <span className="text-xs text-pink-600 font-medium italic font-serif">✨ Wish Made! May it come true ✨</span>
                  </div>
                )}
                <div className="w-3.5 h-10 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 rounded-t-xs shadow-inner mt-1 border-t border-pink-200" />
              </div>

              {candleLit ? (
                <button
                  id="blow-candle-btn"
                  onClick={handleBlowCandle}
                  className="mt-2.5 text-[11px] font-medium text-pink-700 bg-pink-100/90 hover:bg-pink-200 px-3.5 py-1 rounded-full border border-pink-300/80 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  🌬️ Tap to Blow Candle & Make Wish
                </button>
              ) : (
                <button
                  id="relight-candle-btn"
                  onClick={handleResetCandle}
                  className="mt-2.5 text-[11px] font-medium text-pink-600 hover:text-pink-800 flex items-center gap-1 underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Relight Candle</span>
                </button>
              )}
            </motion.div>

            {/* Shower More Confetti */}
            <div className="mt-5 flex items-center justify-center">
              <button
                id="shower-more-confetti-btn"
                onClick={triggerConfettiBurst}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-pink-600 bg-white/90 hover:bg-white border border-pink-200 shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Shower Confetti 🎉</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
