export interface EventLink {
  id: string;
  title: string;
  description: string;
  route: string;
}

export const eventLinks: EventLink[] = [
  {
    id: 'registrations',
    title: 'Registrations',
    description: 'Register for upcoming hackathons, workshops and technical programs.',
    route: '/events/registrations',
  },
  {
    id: 'gallery',
    title: 'Gallery',
    description: 'Explore highlights and memories from our past ACM events.',
    route: '/events/gallery',
  },
];
