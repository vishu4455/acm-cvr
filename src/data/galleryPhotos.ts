export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'Inauguration' | 'Coding Contests';
  title: string;
  subtitle: string;
}

export const galleryCategories = ['All Moments', 'Inauguration', 'Coding Contests'] as const;

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'inauguration-1',
    src: '/events/inauguration.jpg',
    alt: 'ACM Inauguration Ceremony',
    category: 'Inauguration',
    title: 'Inauguration',
    subtitle: 'Chapter Launch Ceremony',
  },
];
