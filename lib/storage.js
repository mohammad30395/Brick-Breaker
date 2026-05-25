"use client";

export const STORAGE_KEYS = {
  playerSetup: "brickBreakerPlayerSetup",
  selectedGround: "brickBreakerSelectedGround",
  difficulty: "brickBreakerDifficulty",
  leaderboard: "brickBreakerLeaderboard",
};

const canUseStorage = () => typeof window !== "undefined" && window.localStorage;

export function readStorage(key, fallback = null) {
  if (!canUseStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key) {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(key);
}

export const savePlayerSetup = (setup) => writeStorage(STORAGE_KEYS.playerSetup, setup);
export const getPlayerSetup = () => readStorage(STORAGE_KEYS.playerSetup);

export const saveSelectedGround = (ground) => writeStorage(STORAGE_KEYS.selectedGround, ground);
export const getSelectedGround = () => readStorage(STORAGE_KEYS.selectedGround);

export const saveSelectedDifficulty = (difficulty) => writeStorage(STORAGE_KEYS.difficulty, difficulty);
export const getSelectedDifficulty = () => readStorage(STORAGE_KEYS.difficulty);
