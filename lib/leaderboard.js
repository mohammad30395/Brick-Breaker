"use client";

import { readStorage, STORAGE_KEYS, writeStorage } from "./storage";

export function getLeaderboardRecords() {
  const records = readStorage(STORAGE_KEYS.leaderboard, []);
  if (!Array.isArray(records)) return [];

  const uniqueRecords = new Map();
  records.forEach((record) => {
    const key = record.gameSessionId || [
      record.name,
      record.username,
      record.score,
      record.difficulty,
      record.outcome,
      record.speed,
      record.ground,
      record.timePlayed,
      record.playedAt,
    ].join("|");

    if (!uniqueRecords.has(key)) {
      uniqueRecords.set(key, record);
    }
  });

  return Array.from(uniqueRecords.values()).sort((a, b) => Number(b.score) - Number(a.score));
}

export function saveLeaderboardRecord(record) {
  const records = getLeaderboardRecords();
  const nextRecords = [
    record,
    ...records.filter((item) => {
      if (record.gameSessionId && item.gameSessionId) {
        return item.gameSessionId !== record.gameSessionId;
      }
      return item.id !== record.id;
    }),
  ].sort((a, b) => Number(b.score) - Number(a.score));
  writeStorage(STORAGE_KEYS.leaderboard, nextRecords);
  return nextRecords;
}

export function clearLeaderboardRecords() {
  writeStorage(STORAGE_KEYS.leaderboard, []);
}
