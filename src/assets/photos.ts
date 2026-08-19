import photo1 from './images/IMG-20260819-WA0029.jpg.jpeg';
import photo2 from './images/IMG-20260819-WA0030.jpg.jpeg';
import photo3 from './images/IMG-20260819-WA0032.jpg.jpeg';
import photo4 from './images/IMG-20260819-WA0033.jpg.jpeg';
import photo5 from './images/IMG-20260819-WA0035.jpg.jpeg';
import photo6 from './images/IMG-20260819-WA0036.jpg.jpeg';

export interface BirthdayPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  dateTag?: string;
}

export const RIYA_PHOTOS: BirthdayPhoto[] = [
  {
    id: 'riya-1',
    url: photo1,
    title: 'Radiant Smile',
    caption: 'Your smile lights up every room and brings joy to all around you.',
    dateTag: 'Precious Memory'
  },
  {
    id: 'riya-2',
    url: photo2,
    title: 'Grace & Elegance',
    caption: 'Always carrying yourself with kindness, warmth, and grace.',
    dateTag: 'Pure Beauty'
  },
  {
    id: 'riya-3',
    url: photo3,
    title: 'Cherished Moment',
    caption: 'A snapshot of happiness that will always be treasured.',
    dateTag: 'Forever Special'
  },
  {
    id: 'riya-4',
    url: photo4,
    title: 'Sweet Memories',
    caption: 'Every moment spent with you is a gift of pure laughter and joy.',
    dateTag: 'Unforgettable'
  },
  {
    id: 'riya-5',
    url: photo5,
    title: 'Pure Sunshine',
    caption: 'Bringing warmth, positivity, and love everywhere you go.',
    dateTag: 'Golden Hour'
  },
  {
    id: 'riya-6',
    url: photo6,
    title: 'Happy Birthday Riya',
    caption: 'Celebrating the incredible, wonderful, unforgettable person you are.',
    dateTag: 'Today • Celebrated'
  }
];
