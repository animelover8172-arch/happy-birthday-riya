import photo1 from './images/IMG-20260819-WA0029.jpg.jpeg';
import photo2 from './images/IMG-20260819-WA0030.jpg.jpeg';
import photo3 from './images/IMG-20260819-WA0032.jpg.jpeg';
import photo4 from './images/IMG-20260819-WA0033.jpg.jpeg';
import photo5 from './images/IMG-20260819-WA0035.jpg.jpeg';
import photo6 from './images/IMG-20260819-WA0036.jpg.jpeg';

export interface BirthdayPhoto {
  id: string;
  url: string;
  fallbackUrl?: string;
  altFallbackUrl?: string;
  title: string;
  caption: string;
  dateTag?: string;
}

export const RIYA_PHOTOS: BirthdayPhoto[] = [
  {
    id: 'riya-1',
    url: photo1,
    fallbackUrl: '/images/riya-1.jpeg',
    altFallbackUrl: '/images/IMG-20260819-WA0029.jpg.jpeg',
    title: 'Radiant Smile',
    caption: 'Your smile lights up every room and brings joy to all around you.',
    dateTag: 'Precious Memory'
  },
  {
    id: 'riya-2',
    url: photo2,
    fallbackUrl: '/images/riya-2.jpeg',
    altFallbackUrl: '/images/IMG-20260819-WA0030.jpg.jpeg',
    title: 'Grace & Elegance',
    caption: 'Always carrying yourself with kindness, warmth, and grace.',
    dateTag: 'Pure Beauty'
  },
  {
    id: 'riya-3',
    url: photo3,
    fallbackUrl: '/images/riya-3.jpeg',
    altFallbackUrl: '/images/IMG-20260819-WA0032.jpg.jpeg',
    title: 'Cherished Moment',
    caption: 'A snapshot of happiness that will always be treasured.',
    dateTag: 'Forever Special'
  },
  {
    id: 'riya-4',
    url: photo4,
    fallbackUrl: '/images/riya-4.jpeg',
    altFallbackUrl: '/images/IMG-20260819-WA0033.jpg.jpeg',
    title: 'Sweet Memories',
    caption: 'Every moment spent with you is a gift of pure laughter and joy.',
    dateTag: 'Unforgettable'
  },
  {
    id: 'riya-5',
    url: photo5,
    fallbackUrl: '/images/riya-5.jpeg',
    altFallbackUrl: '/images/IMG-20260819-WA0035.jpg.jpeg',
    title: 'Pure Sunshine',
    caption: 'Bringing warmth, positivity, and love everywhere you go.',
    dateTag: 'Golden Hour'
  },
  {
    id: 'riya-6',
    url: photo6,
    fallbackUrl: '/images/riya-6.jpeg',
    altFallbackUrl: '/images/IMG-20260819-WA0036.jpg.jpeg',
    title: 'Happy Birthday Riya',
    caption: 'Celebrating the incredible, wonderful, unforgettable person you are.',
    dateTag: 'Today • Celebrated'
  }
];
