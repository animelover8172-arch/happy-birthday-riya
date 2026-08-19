import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FloatingElement } from '../types';

export function FloatingParticles() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate subtle, balanced floating elements
    const items: FloatingElement[] = [];
    
    // Tiny hearts
    for (let i = 0; i < 9; i++) {
      items.push({
        id: i,
        type: 'heart',
        x: Math.random() * 95,
        y: Math.random() * 95,
        size: 14 + Math.random() * 10,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 4,
        opacity: 0.35 + Math.random() * 0.3,
        color: ['#f472b6', '#fb7185', '#ec4899', '#f9a8d4'][Math.floor(Math.random() * 4)]
      });
    }

    // Small stars / sparkles
    for (let i = 9; i < 20; i++) {
      items.push({
        id: i,
        type: 'sparkle',
        x: Math.random() * 95,
        y: Math.random() * 95,
        size: 8 + Math.random() * 8,
        duration: 6 + Math.random() * 5,
        delay: Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.4,
        color: ['#fef08a', '#fbcfe8', '#e9d5ff', '#fed7aa'][Math.floor(Math.random() * 4)]
      });
    }

    // 4 Elegant balloons floating gently in background
    const balloonColors = ['#fbcfe8', '#e9d5ff', '#fed7aa', '#fce7f3'];
    for (let i = 20; i < 24; i++) {
      items.push({
        id: i,
        type: 'balloon',
        x: 8 + (i - 20) * 26 + (Math.random() * 8 - 4),
        y: 65 + Math.random() * 25,
        size: 32 + Math.random() * 12,
        duration: 12 + Math.random() * 6,
        delay: (i - 20) * 1.5,
        opacity: 0.28 + Math.random() * 0.2,
        color: balloonColors[i - 20]
      });
    }

    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Dreamy soft gradient blobs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl"
        style={{ animation: 'softPulse 7s ease-in-out infinite alternate' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl"
        style={{ animation: 'softPulse 9s ease-in-out infinite alternate 1.5s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-rose-200/30 blur-3xl"
        style={{ animation: 'softPulse 8s ease-in-out infinite alternate 3s' }}
      />
      <div 
        className="absolute top-2/3 left-10 w-72 h-72 rounded-full bg-amber-100/30 blur-3xl"
      />

      {/* Floating particles */}
      {elements.map((el) => {
        if (el.type === 'heart') {
          return (
            <motion.div
              key={el.id}
              className="absolute select-none"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}px`,
                color: el.color,
                filter: 'drop-shadow(0 2px 6px rgba(244, 114, 182, 0.25))'
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, (el.id % 2 === 0 ? 12 : -12), 0],
                rotate: [-5, 8, -5],
                opacity: [el.opacity, el.opacity * 1.4, el.opacity],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
                ease: 'easeInOut'
              }}
            >
              💗
            </motion.div>
          );
        }

        if (el.type === 'balloon') {
          return (
            <motion.div
              key={el.id}
              className="absolute select-none flex flex-col items-center"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                opacity: el.opacity
              }}
              animate={{
                y: [0, -90, -180, 0],
                x: [0, 15, -10, 0],
                rotate: [-3, 4, -2, -3]
              }}
              transition={{
                duration: el.duration * 1.6,
                repeat: Infinity,
                delay: el.delay,
                ease: 'easeInOut'
              }}
            >
              <div 
                className="rounded-full relative shadow-sm border border-white/60"
                style={{
                  width: `${el.size}px`,
                  height: `${el.size * 1.25}px`,
                  background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${el.color} 55%, rgba(216, 180, 254, 0.6) 100%)`,
                  boxShadow: '0 8px 18px -4px rgba(244, 114, 182, 0.25)'
                }}
              >
                {/* Highlight gleam */}
                <div className="absolute top-2 left-2.5 w-2 h-3.5 bg-white/70 rounded-full rotate-[-25deg] blur-[0.5px]" />
                {/* Knot */}
                <div 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-sm"
                  style={{ backgroundColor: el.color }}
                />
              </div>
              {/* String */}
              <div className="w-[1px] h-8 bg-pink-300/40" />
            </motion.div>
          );
        }

        // Sparkle / Star
        return (
          <motion.div
            key={el.id}
            className="absolute select-none flex items-center justify-center"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
              color: el.color
            }}
            animate={{
              scale: [0.6, 1.2, 0.6],
              opacity: [el.opacity * 0.4, el.opacity, el.opacity * 0.4],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>
        );
      })}
    </div>
  );
}
