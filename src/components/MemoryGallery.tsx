import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Maximize2, Camera } from 'lucide-react';
import { RIYA_PHOTOS, BirthdayPhoto } from '../assets/photos';
import { playChimeSound } from '../utils/audioSynth';

export function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<BirthdayPhoto | null>(null);

  const handlePhotoClick = (photo: BirthdayPhoto) => {
    playChimeSound('sparkle');
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    playChimeSound('pop');
    setSelectedPhoto(null);
  };

  return (
    <section id="riya-memory-gallery-section" className="relative w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Decorative Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 shadow-xs mb-3 text-pink-600 text-xs font-semibold tracking-widest uppercase">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          <span>Riya's Golden Memories</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-pink-900 leading-tight">
          Moments That Make You <span className="text-pink-500 font-script font-bold italic">Special</span> 🌸
        </h2>

        <p className="text-xs sm:text-sm text-pink-800/70 font-light italic mt-2 max-w-md mx-auto">
          Every snapshot tells a story of your kindness, your laughter, and your radiant spirit.
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {RIYA_PHOTOS.map((photo, index) => {
          // Subtle alternating polaroid tilts
          const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
          const tiltClass = rotations[index % rotations.length];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.3 } }}
              onClick={() => handlePhotoClick(photo)}
              className={`artistic-polaroid cursor-pointer group transform ${tiltClass} transition-all duration-300 relative select-none`}
            >
              {/* Cute top tape / pin accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-pink-200/60 backdrop-blur-xs rounded-xs border border-white/60 transform -rotate-2 z-10" />

              {/* Photo Frame Container */}
              <div className="relative aspect-[4/4.8] w-full bg-[#FFF0F5] rounded-xs overflow-hidden border border-pink-100/70 shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Date Tag Badge */}
                {photo.dateTag && (
                  <div className="absolute top-2.5 left-2.5 bg-white/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] text-pink-700 font-medium italic border border-white/70 shadow-xs">
                    {photo.dateTag}
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-pink-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/85 text-pink-600 flex items-center justify-center shadow-md transform scale-80 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="pt-3.5 pb-1 px-1 text-center">
                <h3 className="font-serif italic font-bold text-pink-900 text-base sm:text-lg">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-pink-700/80 italic line-clamp-2 mt-0.5">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal / High-Res Lightbox View */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-white select-none overflow-hidden"
            >
              {/* Close Button */}
              <button
                id="close-gallery-modal-btn"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-pink-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Full Image */}
              <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.5] bg-pink-50 rounded-2xl overflow-hidden shadow-inner border border-pink-100">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Caption */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-1 text-pink-500 text-xs font-semibold mb-1">
                  <Heart className="w-3.5 h-3.5 fill-pink-400" />
                  <span>{selectedPhoto.dateTag || 'Riya'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-pink-900 italic">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-pink-800/80 italic mt-1 max-w-sm mx-auto">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
