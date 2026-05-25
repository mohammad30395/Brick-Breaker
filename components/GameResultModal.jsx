"use client";

import { Home, ListRestart, Medal, RotateCcw, SlidersHorizontal } from "lucide-react";
import Button from "./Button";
import { formatTime } from "@/lib/gameConfig";

export default function GameResultModal({ result, onPlayAgain, onChangeDifficulty }) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <section className="panel max-h-[92dvh] w-full max-w-xl overflow-auto p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-md bg-teal-300 text-slate-950">
            <Medal size={23} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">{result.outcome}</p>
            <h2 className="text-2xl font-black text-white">Round summary</h2>
          </div>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Stat label="Player" value={result.name} />
          <Stat label="Username" value={`@${result.username}`} />
          <Stat label="Score" value={result.score} />
          <Stat label="Difficulty" value={result.difficulty} />
          <Stat label="Ball speed" value={`${result.speed}x`} />
          <Stat label="Ground layout" value={result.ground} />
          <Stat label="Lives remaining" value={result.livesRemaining} />
          <Stat label="Time played" value={formatTime(result.timePlayed)} />
          <Stat label="Date/time" value={new Date(result.playedAt).toLocaleString()} />
        </dl>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button onClick={onPlayAgain}><RotateCcw size={17} aria-hidden="true" /> Play Again</Button>
          <Button variant="secondary" onClick={onChangeDifficulty}><SlidersHorizontal size={17} aria-hidden="true" /> Change Difficulty</Button>
          <Button href="/leaderboard" variant="secondary"><ListRestart size={17} aria-hidden="true" /> Leaderboard</Button>
          <Button href="/" variant="ghost"><Home size={17} aria-hidden="true" /> Home</Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/50 p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 break-words font-bold text-white">{value}</dd>
    </div>
  );
}
