"use client";

import { readStorage, STORAGE_KEYS, writeStorage } from "./storage";

export function getLeaderboardRecords() {
  const records = readStorage(STORAGE_KEYS.leaderboard, []);
  return Array.isArray(records)
    ? records.sort((a, b) => Number(b.score) - Number(a.score))
    : [];
}

export function saveLeaderboardRecord(record) {
  const records = getLeaderboardRecords();
  const nextRecords = [record, ...records].sort((a, b) => Number(b.score) - Number(a.score));
  writeStorage(STORAGE_KEYS.leaderboard, nextRecords);
  return nextRecords;
}

export function clearLeaderboardRecords() {
  writeStorage(STORAGE_KEYS.leaderboard, []);
}
