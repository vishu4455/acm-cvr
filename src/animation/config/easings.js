// Single source of truth for easing curves — every GSAP call in the project
// imports from here rather than typing 'power3.out' inline. Changing the
// system's entrance curve later is a one-file edit.
export const EASE = {
    gentle: 'power1.out',
    standard: 'power2.out',
    entrance: 'power3.out', // headings, hero sequence, section reveals
    symmetric: 'power2.inOut', // page transitions, camera moves
    breathing: 'sine.inOut', // reserved: Events "live" pulse dot ONLY
};
