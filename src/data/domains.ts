export interface Domain {
  id: string;
  label: string;
  icon: string;
  description: string;
}

// Only one domain is live on the current site — structured to extend cleanly
// as more domains are added.
export const domains: Domain[] = [
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    icon: '🤖',
    description: 'Machine learning and AI projects.',
  },
];
