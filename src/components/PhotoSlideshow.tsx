import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Heart, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';
import { playChimeSound } from '../utils/audioSynth';
import { RIYA_PHOTOS } from '../assets/photos';

export function PhotoSlideshow() {
  const [photos, setPhotos] = useState<PhotoItem[]>(RIYA_PHOTOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [customPhotos, setCustomPhotos] = useState<PhotoItem[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Set initial photos from RIYA_PHOTOS or custom uploads
  useEffect(() => {
    if (customPhotos.length > 0) {
      setPhotos(customPhotos);
    } else {
      setPhotos(RIYA_PHOTOS);
    }
  }, [customPhotos]);

  // Automatic slideshow timer: 3.5 seconds per photo
  useEffect(() => {
    if (!isPlaying || photos.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying, photos.length, isHovered]);

  const handlePrev = () => {
    if (photos.length === 0) return;
    playChimeSound('pop');
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    if (photos.length === 0) return;
    playChimeSound('pop');
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleDotClick = (idx: number) => {
    playChimeSound('pop');
    setCurrentIndex(idx);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: PhotoItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const url = URL.createObjectURL(file);
        newPhotos.push({
          id: `upload-${Date.now()}-${i}`,
          url,
          title: `Riya #${i + 1}`,
          caption: `A precious moment 🌸`
        });
      }
    }

    playChimeSound('sparkle');
    setCustomPhotos(newPhotos);
    setCurrentIndex(0);
  };

  return (
    <section id="riya-photo-gallery" className="relative w-full max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
      {/* Background Artistic Sparkle Watermark */}
      <div className="absolute -top-6 -left-6 text-pink-200 text-6xl opacity-40 select-none pointer-events-none -z-10">
        ✨
      </div>
      <div className="absolute -bottom-6 -right-6 text-pink-200 text-6xl opacity-30 select-none pointer-events-none -z-10">
        🌸
      </div>

      {/* Polaroid Art Frame */}
      <div
        className="artistic-polaroid w-full max-w-md sm:max-w-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500 relative group select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Photo Viewport */}
        <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.5] bg-[#FFF0F5] rounded-xs overflow-hidden flex items-center justify-center border border-pink-100/80 shadow-inner">
          {photos.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={photos[currentIndex]?.id || currentIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={photos[currentIndex].url}
                  alt={`Riya photo ${currentIndex + 1}`}
                  className="w-full h-full object-cover select-none"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const photo = photos[currentIndex];
                    if (photo?.fallbackUrl && !target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = photo.fallbackUrl;
                    } else if (photo?.altFallbackUrl && !target.dataset.triedAltFallback) {
                      target.dataset.triedAltFallback = 'true';
                      target.src = photo.altFallbackUrl;
                    }
                  }}
                />

                {/* Subtle soft vignette */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />

                {/* Index Pill at bottom right */}
                <div className="absolute bottom-3 right-3 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-pink-700 italic border border-white/70 shadow-xs">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            // Placeholder when photos are being added into /src/assets/images/
            <div className="flex flex-col items-center justify-center text-center p-6 text-[#7a5b67]">
              <span className="text-pink-300 text-4xl block mb-2">🌸</span>
              <h3 className="font-serif italic text-lg font-bold text-pink-900">
                Moment Captured
              </h3>
              <p className="text-xs text-pink-700/70 italic mt-1 max-w-xs leading-relaxed">
                /src/assets/images/riya-1.jpg
              </p>

              <button
                id="upload-riya-photos-btn"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-pink-600 bg-white hover:bg-pink-50 border border-pink-200 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photos</span>
              </button>
            </div>
          )}

          {/* Manual Previous Button */}
          {photos.length > 1 && (
            <button
              id="slideshow-prev-btn"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-pink-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 border border-pink-100 opacity-80 hover:opacity-100 z-10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Manual Next Button */}
          {photos.length > 1 && (
            <button
              id="slideshow-next-btn"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-pink-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 border border-pink-100 opacity-80 hover:opacity-100 z-10 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Polaroid Bottom Title */}
        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center font-serif italic text-pink-800 text-base sm:text-lg opacity-85 tracking-wide">
          {photos[currentIndex]?.title || 'Moment Captured'}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Navigation Dots & Controls Underneath */}
      <div className="mt-6 flex items-center justify-between gap-4 w-full max-w-sm px-2">
        {/* Navigation Dots */}
        <div className="flex items-center justify-center space-x-2" role="tablist" aria-label="Slideshow photo dots">
          {photos.map((_, idx) => (
            <button
              key={idx}
              id={`slideshow-dot-${idx}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to photo ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-2.5 h-2.5 bg-pink-500 scale-110 shadow-xs'
                  : 'w-2 h-2 bg-pink-200 hover:bg-pink-300'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {photos.length > 1 && (
            <button
              id="slideshow-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[11px] text-pink-600 hover:text-pink-800 bg-white/70 hover:bg-white px-2.5 py-1 rounded-full border border-pink-200/80 transition-all cursor-pointer shadow-xs"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          )}

          <button
            id="upload-add-photos-inline-btn"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] text-pink-500 hover:text-pink-700 bg-white/50 hover:bg-white px-2.5 py-1 rounded-full border border-pink-200/60 flex items-center gap-1 cursor-pointer transition-all"
            title="Add or update photos"
          >
            <Upload className="w-3 h-3" />
            <span>{photos.length > 0 ? 'Update' : 'Add'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
