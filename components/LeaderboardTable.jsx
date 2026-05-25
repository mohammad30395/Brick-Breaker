"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import Button from "./Button";
import { DIFFICULTIES, formatTime } from "@/lib/gameConfig";
import { clearLeaderboardRecords, getLeaderboardRecords } from "@/lib/leaderboard";

export default function LeaderboardTable() {
  const [records, setRecords] = useState([]);
  const [difficulty, setDifficulty] = useState("all");

  useEffect(() => {
    setRecords(getLeaderboardRecords());
  }, []);

  const filteredRecords = useMemo(() => {
    return difficulty === "all"
      ? records
      : records.filter((record) => record.difficultyId === difficulty);
  }, [difficulty, records]);

  function clearRecords() {
    clearLeaderboardRecords();
    setRecords([]);
  }

  return (
    <section className="panel p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-200">Filter by difficulty</span>
          <select className="field min-w-48" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="all">All difficulties</option>
            {DIFFICULTIES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
        <Button variant="danger" onClick={clearRecords} disabled={records.length === 0}>
          <Trash2 size={17} aria-hidden="true" /> Clear leaderboard
        </Button>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="rounded-md border border-dashed border-white/15 p-8 text-center text-slate-300">
          No records saved yet.
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-md border border-white/10 lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-wide text-slate-300">
                <tr>
                  {["Rank", "Name", "Username", "Score", "Difficulty", "Result", "Speed", "Layout", "Time", "Date/time"].map((heading) => (
                    <th key={heading} className="px-3 py-3">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredRecords.map((record, index) => (
                  <tr key={record.id} className="bg-slate-950/30">
                    <td className="px-3 py-3 font-black text-teal-200">#{index + 1}</td>
                    <td className="px-3 py-3">{record.name}</td>
                    <td className="px-3 py-3">@{record.username}</td>
                    <td className="px-3 py-3 font-bold">{record.score}</td>
                    <td className="px-3 py-3">{record.difficulty}</td>
                    <td className="px-3 py-3">{record.outcome}</td>
                    <td className="px-3 py-3">{record.speed}x</td>
                    <td className="px-3 py-3">{record.ground}</td>
                    <td className="px-3 py-3">{formatTime(record.timePlayed)}</td>
                    <td className="px-3 py-3">{new Date(record.playedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 lg:hidden">
            {filteredRecords.map((record, index) => (
              <article key={record.id} className="rounded-md border border-white/10 bg-slate-950/40 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-teal-200">Rank #{index + 1}</p>
                    <h2 className="mt-1 text-lg font-black text-white">{record.name}</h2>
                    <p className="text-sm text-slate-300">@{record.username}</p>
                  </div>
                  <p className="text-2xl font-black text-white">{record.score}</p>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <MobileStat label="Difficulty" value={record.difficulty} />
                  <MobileStat label="Result" value={record.outcome} />
                  <MobileStat label="Speed" value={`${record.speed}x`} />
                  <MobileStat label="Layout" value={record.ground} />
                  <MobileStat label="Time" value={formatTime(record.timePlayed)} />
                  <MobileStat label="Date" value={new Date(record.playedAt).toLocaleString()} />
                </dl>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function MobileStat({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 font-semibold text-slate-100">{value}</dd>
    </div>
  );
}
