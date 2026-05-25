export const BALL_SPEEDS = [
  { label: "1x", value: "1", velocity: 290 },
  { label: "2x", value: "2", velocity: 370 },
  { label: "3x", value: "3", velocity: 455 },
];

export const DIFFICULTIES = [
  {
    id: "easy",
    label: "Easy",
    description: "All destroyable bricks break in one hit.",
    brickTypes: [1],
  },
  {
    id: "medium",
    label: "Medium",
    description: "Normal and strong bricks. Strong bricks take two hits.",
    brickTypes: [1, 2],
  },
  {
    id: "hard",
    label: "Hard",
    description: "Normal, strong, and heavy bricks. Heavy bricks take three hits.",
    brickTypes: [1, 2, 3],
  },
];

export const BRICK_COLORS = {
  1: 0x2dd4bf,
  2: 0xfacc15,
  3: 0xfb7185,
  unbreakable: 0x64748b,
};

export const BRICK_COLOR_CLASSES = {
  1: "bg-teal-300",
  2: "bg-yellow-300",
  3: "bg-rose-400",
  unbreakable: "bg-slate-500",
};

export function getDifficulty(id) {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id) || DIFFICULTIES[0];
}

export function getBallVelocity(speedValue) {
  return BALL_SPEEDS.find((speed) => speed.value === speedValue)?.velocity || BALL_SPEEDS[0].velocity;
}

export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
