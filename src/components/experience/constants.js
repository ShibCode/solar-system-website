export const planets = [
  {
    size: 0.2,
    positionIndex: 0.75,
    color: "mediumpurple",
    label: "Blogs",
  },
  {
    size: 0.25,
    positionIndex: 0.1,
    color: "pink",
    label: "News",
  },
  {
    size: 0.3,
    positionIndex: 0.55,
    color: "turquoise",
    label: "About us",
  },
  {
    size: 0.35,
    positionIndex: 0.92,
    color: "blue",
    label: "Projects",
  },
  {
    size: 0.4,
    positionIndex: 0.35,
    color: "red",
    label: "Services",
  },
];

export const orbits = [
  {
    scale: 1,
    rotation: Math.PI * 0.09,
  },
  {
    scale: 1.5,
    rotation: Math.PI * 0.105,
  },
  {
    scale: 2.2,
    rotation: Math.PI * 0.11,
  },
  {
    scale: 3.5,
    rotation: Math.PI * 0.09,
  },
  {
    scale: 5.5,
    rotation: Math.PI * 0.08,
  },
];

const ORBIT_STAGGER_FACTOR = 0.6;

export const INITIAL_DELAY = 1;

export const FIRST_ORBIT_FADE_IN_DURATION = 0.5;

export const ORBIT_SCALE_UP_DURATION = 0.4;
export const ORBIT_SCALE_UP_STAGGER =
  ORBIT_SCALE_UP_DURATION * ORBIT_STAGGER_FACTOR;

export const ORBIT_SCALE_UP_COMPLETE_DURATION =
  ORBIT_SCALE_UP_STAGGER * (orbits.length - 1) +
  0.5 +
  ORBIT_SCALE_UP_DURATION +
  INITIAL_DELAY;

export const PLANET_FADE_IN_DURATION = 0.6;
