export interface PhotoItem {
  id: string;
  url: string;
  title?: string;
  caption?: string;
}

export interface FloatingElement {
  id: number;
  type: 'heart' | 'star' | 'sparkle' | 'balloon' | 'petal';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color?: string;
}
