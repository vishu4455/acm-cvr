export interface PastEvent {
  id: string;
  tag: string;
  date: string;
  title: string;
  description: string[];
  image?: string;
  imageAlt?: string;
}

export const pastEvents: PastEvent[] = [
  {
    id: 'inauguration',
    tag: 'Inauguration',
    date: 'March 2, 2026',
    title: 'Inauguration Ceremony',
    description: [
      "The ACM Student Chapter was officially inaugurated with great enthusiasm, marking the beginning of a journey dedicated to fostering innovation, technical excellence, and collaborative learning. The event brought together faculty members, student representatives, and aspiring members to celebrate the launch of the chapter and its vision of promoting computing knowledge and professional development.",
      "The ceremony featured inspiring addresses by distinguished guests and faculty, highlighting the importance of technology, research, and active student participation. The inauguration concluded with an introduction to the chapter's objectives, upcoming initiatives, and opportunities for students to engage in workshops, competitions, seminars, and community-driven activities throughout the academic year.",
    ],
    image: '/events/inauguration.jpg',
    imageAlt: 'CVR ACM Student Chapter Inauguration Ceremony Group Photo',
  },
  {
    id: 'code-in-borderland',
    tag: 'Coding Contest',
    date: 'March 2026',
    title: 'Code in Borderland',
    description: [
      "Code in Borderland was an exciting coding challenge designed to test participants' programming skills, logical thinking, and problem-solving abilities in a fun and competitive environment. The event featured a series of coding problems with varying levels of difficulty, encouraging participants to think critically and develop efficient solutions within a limited time.",
      "The competition witnessed enthusiastic participation from students across different years, fostering teamwork, healthy competition, and continuous learning. By providing a platform to apply coding concepts to real-world challenges, Code in Borderland inspired participants to enhance their technical expertise while building confidence and preparing for future programming contests and career opportunities.",
    ],
  },
];
