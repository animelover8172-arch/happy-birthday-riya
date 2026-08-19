import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Sun, Smile, Stars, Flower } from 'lucide-react';

interface MomentCard {
  icon: typeof Sparkles;
  title: string;
  subtitle: string;
  description: string;
}

const MOMENTS: MomentCard[] = [
  {
    icon: Smile,
    title: 'Your Contagious Smile',
    subtitle: 'Pure Happiness',
    description: 'The way your face lights up brings an instant feeling of peace and joy to everyone fortunate enough to know you.'
  },
  {
    icon: Heart,
    title: 'Your Kind & Pure Heart',
    subtitle: 'Endless Warmth',
    description: 'You always listen, always care, and make people feel truly appreciated. That rare kindness is your superpower.'
  },
  {
    icon: Sun,
    title: 'Your Golden Radiance',
    subtitle: 'Unmatched Energy',
    description: 'No matter how cloudy the day, your presence brings sunshine, calm energy, and effortless positivity.'
  },
  {
    icon: Stars,
    title: 'Your Inspiring Dreams',
    subtitle: 'Limitless Potential',
    description: 'Watching you grow, achieve, and pursue what you love is inspiring. May this new year unlock your biggest dreams.'
  }
];

export function SpecialMoments() {
  return (
    <section id="special-moments-section" className="relative w-full max-w-5xl mx-auto px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/70 text-pink-700 text-xs font-semibold uppercase tracking-widest border border-pink-200/60 mb-2">
          <Flower className="w-3.5 h-3.5 text-pink-500" />
          <span>Why You Are So Cherished</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-pink-900 leading-tight">
          A Celebration of <span className="text-pink-500 font-script font-bold italic">Everything You Are</span> ✨
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {MOMENTS.map((moment, index) => {
          const Icon = moment.icon;
          return (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-md border border-white/70 p-6 sm:p-7 rounded-[32px] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 text-white flex items-center justify-center shadow-md shadow-pink-200 shrink-0 group-hover:rotate-6 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
                    {moment.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-pink-900 mt-0.5">
                    {moment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-800/80 italic font-serif leading-relaxed mt-2">
                    {moment.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
