import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Heart, Gift, Play, ArrowDown } from 'lucide-react';
import { speakBirthdayWish, stopVoiceSpeech, playChimeSound, startAmbientMusic } from '../utils/audioSynth';

interface BirthdayIntroProps {
  onComplete: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export function BirthdayIntro({ onComplete, isSoundMuted, onToggleSound }: BirthdayIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceFinished, setVoiceFinished] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const startVoiceWish = () => {
    setHasStarted(true);
    setAutoplayBlocked(false);

    if (isSoundMuted) {
      // If sound is muted, we still mark start and complete smoothly
      setIsSpeaking(false);
      setTimeout(() => setVoiceFinished(true), 1800);
      return;
    }

    const success = speakBirthdayWish(
      () => {
        setIsSpeaking(true);
      },
      () => {
        setIsSpeaking(false);
        setVoiceFinished(true);
      },
      (err) => {
        console.warn('Voice playback note:', err);
        setIsSpeaking(false);
        setVoiceFinished(true);
      }
    );

    if (!success) {
      setAutoplayBlocked(true);
    }
  };

  useEffect(() => {
    // Attempt graceful auto-start with brief delay for render settle
    const timer = setTimeout(() => {
      // Modern browsers might block initial audio if no user interaction
      // We attempt speakBirthdayWish; if speech is blocked, user will see the interactive start button
      const voiceAttempt = speakBirthdayWish(
        () => {
          setHasStarted(true);
          setIsSpeaking(true);
          setAutoplayBlocked(false);
        },
        () => {
          setIsSpeaking(false);
          setVoiceFinished(true);
        },
        () => {
          setAutoplayBlocked(true);
        }
      );

      if (voiceAttempt) {
        setHasStarted(true);
      } else {
        setAutoplayBlocked(true);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleManualStart = () => {
    playChimeSound('sparkle');
    startVoiceWish();
  };

  const handleSkipOrProceed = () => {
    stopVoiceSpeech();
    playChimeSound('warm_chord');
    onComplete();
  };

  return (
    <motion.div
      id="birthday-intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.04, 
        filter: 'blur(10px)',
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 bg-gradient-to-b from-[#fdf2f8] via-[#fdf4f7] to-[#fce7f3]"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute w-[28rem] h-[28rem] rounded-full bg-pink-300/30 blur-[90px] -top-10 -left-10 pointer-events-none animate-soft-pulse" />
      <div className="absolute w-[26rem] h-[26rem] rounded-full bg-purple-300/25 blur-[90px] -bottom-10 -right-10 pointer-events-none animate-soft-pulse" style={{ animationDelay: '2s' }} />

      {/* Top Floating Controls */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <button
          id="intro-sound-toggle-btn"
          onClick={onToggleSound}
          aria-label={isSoundMuted ? "Unmute sound" : "Mute sound"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-pink-700 glass-button transition-all duration-300 active:scale-95"
        >
          {isSoundMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-pink-400" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              <span>Sound On</span>
            </>
          )}
        </button>

        {hasStarted && (
          <button
            id="intro-skip-btn"
            onClick={handleSkipOrProceed}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-pink-600 bg-white/70 hover:bg-white border border-pink-200/80 transition-all duration-300 shadow-sm hover:shadow"
          >
            Enter Website →
          </button>
        )}
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center justify-center">
        
        {/* Subtle Decorative Ribbon / Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 shadow-xs mb-5 text-pink-600 text-xs sm:text-sm font-medium tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>A Special Celebration Just For You</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
        </motion.div>

        {/* Center Birthday Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-2 mb-6"
        >
          {/* Subtle Backglow */}
          <div className="absolute inset-0 bg-radial from-pink-200/50 to-transparent blur-xl pointer-events-none -z-10" />

          <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#4a2835] leading-tight select-none">
            Happy Birthday <br className="sm:hidden" />
            <span className="font-script text-pink-600 font-semibold px-2 inline-block transform hover:scale-105 transition-transform duration-300">
              Riya
            </span>{' '}
            <span className="inline-block animate-bounce" style={{ animationDuration: '2.5s' }}>
              🎂💗
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-pink-800/80 font-light tracking-wide max-w-md mx-auto">
            Today the universe shines a little brighter because of you.
          </p>
        </motion.div>

        {/* Voice Narration Live Indicator / Wave */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center gap-2 mb-6 px-4 py-2.5 rounded-2xl bg-white/75 border border-pink-200/90 shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                {[40, 75, 50, 90, 60, 80, 45].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['4px', `${h * 0.25}px`, '4px'] }}
                    transition={{
                      duration: 0.8 + (i % 3) * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.1
                    }}
                    className="w-1 bg-gradient-to-t from-pink-400 to-rose-400 rounded-full"
                    style={{ minHeight: '4px' }}
                  />
                ))}
              </div>
              <p className="text-xs text-pink-700 italic font-medium">
                “Happy Birthday Riya! Wishing you joy, smiles & endless love...”
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button: Either "Tap to Start Birthday Surprise" or "Enter Celebration" */}
        <div className="mt-2 flex flex-col items-center gap-3">
          {(!hasStarted || autoplayBlocked) ? (
            <motion.button
              id="tap-to-start-surprise-btn"
              onClick={handleManualStart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-lg shadow-pink-300/60 border border-white/60 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <Gift className="w-5 h-5 animate-pulse text-white" />
              <span>Tap to Start Birthday Surprise 🎁</span>
            </motion.button>
          ) : (
            <motion.button
              id="enter-birthday-website-btn"
              onClick={handleSkipOrProceed}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-pink-900 bg-white/90 hover:bg-white border border-pink-300 shadow-md shadow-pink-200/50 transition-all duration-300"
            >
              <span>Explore Riya's Birthday Celebration</span>
              <ArrowDown className="w-4 h-4 text-pink-500 animate-bounce" />
            </motion.button>
          )}

          {/* Micro Subtitle */}
          <p className="text-[11px] sm:text-xs text-pink-700/60 flex items-center gap-1">
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400 inline" />
            <span>Made with warm love for today, August 19</span>
          </p>
        </div>

      </div>

      {/* Floating subtle bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-pink-600/70"
      >
        <span>✨ A magical day crafted for Riya ✨</span>
      </motion.div>
    </motion.div>
  );
}
