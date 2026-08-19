import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FloatingParticles } from './components/FloatingParticles';
import { BirthdayIntro } from './components/BirthdayIntro';
import { PhotoSlideshow } from './components/PhotoSlideshow';
import { BirthdayMessage } from './components/BirthdayMessage';
import { MemoryGallery } from './components/MemoryGallery';
import { SpecialMoments } from './components/SpecialMoments';
import { SurpriseSection } from './components/SurpriseSection';
import { AudioControls } from './components/AudioControls';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const handleToggleSound = () => {
    setIsSoundMuted((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5F7] text-[#4a2835] font-sans selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, #FFF0F5 0%, #F5F0FF 40%, #FFF5EE 100%)' }}>
      
      {/* Ambient Floating Elements & Blur Orbs */}
      <FloatingParticles />

      {/* Birthday Opening Screen Overlay */}
      <AnimatePresence>
        {showIntro && (
          <BirthdayIntro
            onComplete={() => setShowIntro(false)}
            isSoundMuted={isSoundMuted}
            onToggleSound={handleToggleSound}
          />
        )}
      </AnimatePresence>

      {/* Main Birthday Surprise Page Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center min-h-screen w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8"
      >
        {/* Top Artistic Header */}
        <header className="flex justify-between items-start w-full mb-6 sm:mb-10">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              id="header-sound-btn"
              onClick={handleToggleSound}
              className="bg-white/60 backdrop-blur-md border border-white/80 rounded-full px-3.5 sm:px-4 py-2 flex items-center space-x-1.5 sm:space-x-2 text-pink-500 text-xs font-medium shadow-sm hover:bg-white/80 transition-all cursor-pointer active:scale-95"
            >
              <span>{isSoundMuted ? '🔇' : '🔊'}</span>
              <span>{isSoundMuted ? 'Muted' : 'Sound'}</span>
            </button>

            <AudioControls
              isSoundMuted={isSoundMuted}
              onToggleSound={handleToggleSound}
              variant="header"
            />
          </div>

          <div className="text-right">
            <p className="text-pink-300 uppercase tracking-widest text-[10px] font-bold mb-0.5 sm:mb-1">
              Special Occasion
            </p>
            <h2 className="text-pink-800 text-base sm:text-lg font-light italic font-serif">
              Today • Celebrating You
            </h2>
          </div>
        </header>

        {/* 1. Hero Showcase Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full my-4 sm:my-8">
          {/* Left Column: Polaroid Photo Showcase */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <PhotoSlideshow />
          </div>

          {/* Right Column: Title, Letter & Birthday Surprise */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Grand Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-pink-900 leading-tight mb-2 select-none"
            >
              Happy Birthday<br />
              <span className="text-pink-500 italic ml-2 sm:ml-8 font-script font-bold inline-block">
                Riya
              </span>{' '}
              <span className="inline-block text-3xl sm:text-5xl">🎂💗</span>
            </motion.h1>

            {/* Letter Card */}
            <div className="w-full mt-4 sm:mt-6">
              <BirthdayMessage />
            </div>

            {/* Surprise Button & Interaction */}
            <div className="w-full mt-4 sm:mt-6 flex justify-center lg:justify-start">
              <SurpriseSection />
            </div>
          </div>
        </section>

        {/* Subtle Decorative Section Divider */}
        <div className="w-full max-w-md my-8 flex items-center justify-center space-x-3 text-pink-200">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent flex-1" />
          <Heart className="w-4 h-4 fill-pink-300 text-pink-300" />
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent flex-1" />
        </div>

        {/* 2. Full Memory Gallery with Riya's Photos */}
        <MemoryGallery />

        {/* Subtle Decorative Section Divider */}
        <div className="w-full max-w-md my-8 flex items-center justify-center space-x-3 text-pink-200">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent flex-1" />
          <Sparkles className="w-4 h-4 text-pink-300" />
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent flex-1" />
        </div>

        {/* 3. Special Moments / Why Riya is Cherished */}
        <SpecialMoments />

        {/* 4. Artistic Closing Footer */}
        <footer className="mt-12 pt-8 pb-6 w-full flex flex-col items-center justify-center text-center border-t border-pink-100/60">
          <div className="flex items-center space-x-1.5 text-pink-500 mb-2">
            <Heart className="w-4 h-4 fill-pink-400" />
            <span className="font-serif italic text-base font-bold text-pink-900">Happy Birthday, Riya!</span>
            <Heart className="w-4 h-4 fill-pink-400" />
          </div>

          <div className="text-pink-400 text-[10px] uppercase tracking-widest flex items-center space-x-2">
            <span>Beautifully crafted for Riya</span>
            <span className="w-1 h-1 bg-pink-300 rounded-full inline-block"></span>
            <span>August 19 • Celebrating You</span>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}
