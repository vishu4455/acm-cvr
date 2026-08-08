export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  tier: 'core' | 'lead';
}

export const facultyCoordinator = {
  id: 'lakshmi-hn',
  name: 'Dr. Lakshmi H.N',
  credentials: 'M.S., Ph.D.',
  role: 'Associate Dean, Emerging Technologies — Faculty Coordinator',
  photo: '/team/lakshmi.jpg',
  bio: 'Serves as the Faculty Coordinator of the ACM Student Chapter at CVR College of Engineering, mentoring students in research, innovation, and professional development.',
};

export const coreCommittee: TeamMember[] = [
  { id: 'nidhi', name: 'P. Nidhi Varma', role: 'Chair', photo: '/team/nidhi.jpg', tier: 'core' },
  { id: 'chandrika', name: 'M. Chandrika', role: 'Vice-Chair', photo: '/team/chandrika.jpg', tier: 'core' },
  { id: 'bala-aditya', name: 'K. Bala Aditya Reddy', role: 'Treasurer', photo: '/team/bala-aditya.jpg', tier: 'core' },
  { id: 'hima-sanjana', name: 'M. Hima Sanjana', role: 'Secretary', photo: '/team/hima.jpg', tier: 'core' },
];

export const leadsAndCoLeads: TeamMember[] = [
  { id: 'chaitanya', name: 'K. Sai Chaitanya', role: 'Web-Master', photo: '/team/chaitanya.jpg', tier: 'lead' },
  { id: 'kartheek', name: 'T. Kartheek', role: 'Web-Master', photo: '/team/kartheek.jpg', tier: 'lead' },
  { id: 'komal-sai', name: 'R. Komal Sai', role: 'Membership Head', photo: '/team/komal.jpg', tier: 'lead' },
  { id: 'sriyanjali', name: 'T. Sriyanjali', role: 'Membership Team', photo: '/team/shriyanjali.jpg', tier: 'lead' },
  { id: 'raghu', name: 'G. Raghu Sharan', role: 'Social Media', photo: '/team/raghu.jpg', tier: 'lead' },
  { id: 'rahul', name: 'B. Rahul Reddy', role: 'Social Media', photo: '/team/rahul.jpg', tier: 'lead' },
  { id: 'rajeevi', name: 'M. Rajeevi', role: 'Technical Lead', photo: '/team/rajeevi.jpg', tier: 'lead' },
  { id: 'hanish', name: 'Gajji Hanish', role: 'Technical Team', photo: '/team/hanish.jpg', tier: 'lead' },
  { id: 'ozas', name: 'Ozas Dixit', role: 'Technical Team', photo: '/team/ozas.jpg', tier: 'lead' },
  { id: 'lahari', name: 'S. Lahari', role: 'Documentation Team', photo: '/team/lahari.jpg', tier: 'lead' },
  { id: 'srinidhi', name: 'E. Srinidhi', role: 'Documentation Team', photo: '/team/srinidhi.jpg', tier: 'lead' },
  { id: 'navadeep', name: 'B. Navadeep', role: 'Coding Team', photo: '/team/navadeep.jpg', tier: 'lead' },
  { id: 'tejasvvi', name: 'S. Tejasvvi', role: 'Coding Team', photo: '/team/tejasvvi.jpg', tier: 'lead' },
  { id: 'sankeerth', name: 'K. Sankeerth', role: 'Events & PR Team', photo: '/team/sankeerth.jpg', tier: 'lead' },
];

export interface GraphEdge {
  source: string;
  target: string;
}

/**
 * Edges are derived from tier membership, not hand-authored — with 18+ named
 * people already on the live site, a hand-maintained edge list is exactly the
 * kind of thing that silently goes stale the next time officers change.
 * Every core-committee member connects to the faculty coordinator; every
 * lead/co-lead connects to the nearest core-committee member (round-robin,
 * since the source site doesn't expose a finer-grained reporting structure).
 */
export function buildTeamGraphEdges(): GraphEdge[] {
  const edges: GraphEdge[] = [];
  coreCommittee.forEach((member) => {
    edges.push({ source: facultyCoordinator.id, target: member.id });
  });
  leadsAndCoLeads.forEach((member, i) => {
    const parent = coreCommittee[i % coreCommittee.length];
    edges.push({ source: parent.id, target: member.id });
  });
  return edges;
}
