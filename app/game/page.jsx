"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Pause, Play, RotateCcw } from "lucide-react";
import Button from "@/components/Button";
import GameResultModal from "@/components/GameResultModal";
import PhaserGame from "@/components/PhaserGame";
import { formatTime, getDifficulty } from "@/lib/gameConfig";
import { getGround } from "@/lib/brickLayouts";
import { saveLeaderboardRecord } from "@/lib/leaderboard";
import { getPlayerSetup, getSelectedDifficulty, getSelectedGround } from "@/lib/storage";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function GamePage() {
  const router = useRouter();
  const [playerSetup, setPlayerSetup] = useState(null);
  const [ground, setGround] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [stats, setStats] = useState({ score: 0, remaining: 0, timePlayed: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [result, setResult] = useState(null);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    document.body.classList.add("game-page-lock");
    return () => document.body.classList.remove("game-page-lock");
  }, []);

  useEffect(() => {
    const setup = getPlayerSetup();
    const selectedGround = getSelectedGround();
    const selectedDifficulty = getSelectedDifficulty();

    if (!setup || !selectedGround || !selectedDifficulty) {
      router.replace("/setup");
      return;
    }

    setPlayerSetup(setup);
    setGround(getGround(selectedGround.id));
    setDifficulty(getDifficulty(selectedDifficulty.id));
  }, [router]);

  const handleStats = useCallback((nextStats) => {
    setStats(nextStats);
  }, []);

  const handleResult = useCallback((roundResult) => {
    setIsPaused(false);
    setResult((existing) => {
      if (existing || !playerSetup || !ground || !difficulty) return existing;

      const record = {
        id: makeId(),
        name: playerSetup.name,
        username: playerSetup.username,
        score: roundResult.score,
        difficulty: difficulty.label,
        difficultyId: difficulty.id,
        outcome: roundResult.outcome,
        speed: playerSetup.speed,
        ground: ground.label,
        groundId: ground.id,
        timePlayed: roundResult.timePlayed,
        playedAt: new Date().toISOString(),
      };

      saveLeaderboardRecord(record);
      return record;
    });
  }, [difficulty, ground, playerSetup]);

  const gameDataReady = useMemo(() => playerSetup && ground && difficulty, [difficulty, ground, playerSetup]);

  function restartRound() {
    setResult(null);
    setStats({ score: 0, remaining: 0, timePlayed: 0 });
    setIsPaused(false);
    setGameKey((current) => current + 1);
  }

  function changeDifficulty() {
    router.push("/difficulty");
  }

  if (!gameDataReady) {
    return (
      <main className="grid h-dvh place-items-center bg-slate-950 px-4 text-center text-slate-200">
        <div>
          <p className="text-lg font-bold">Loading game setup...</p>
          <p className="mt-2 text-sm text-slate-400">You will be redirected if setup is missing.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-slate-950 px-2 py-2 text-white sm:px-4 sm:py-3">
      <section className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col gap-2">
        <header className="panel flex shrink-0 flex-wrap items-center justify-between gap-2 px-3 py-2">
          <div className="min-w-0">
            <h1 className="truncate text-base font-black sm:text-xl">Brick Breaker</h1>
            <p className="truncate text-xs text-slate-300">
              {playerSetup.name} @{playerSetup.username} · {difficulty.label} · {ground.label} · {playerSetup.speed}x
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:min-w-72">
            <HudStat label="Score" value={stats.score} />
            <HudStat label="Left" value={stats.remaining} />
            <HudStat label="Time" value={formatTime(stats.timePlayed)} />
          </div>
        </header>

        <div className="panel min-h-0 flex-1 overflow-hidden p-1 sm:p-2">
          <PhaserGame
            key={gameKey}
            playerSetup={playerSetup}
            ground={ground}
            difficulty={difficulty}
            isPaused={isPaused || Boolean(result)}
            onStats={handleStats}
            onResult={handleResult}
          />
        </div>

        <footer className="panel grid shrink-0 grid-cols-2 gap-2 p-2 sm:grid-cols-4">
          <Button variant="secondary" onClick={() => setIsPaused((current) => !current)} disabled={Boolean(result)}>
            {isPaused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button variant="secondary" onClick={restartRound}>
            <RotateCcw size={17} aria-hidden="true" /> Restart
          </Button>
          <Button variant="secondary" onClick={changeDifficulty}>Difficulty</Button>
          <Button href="/" variant="ghost">
            <Home size={17} aria-hidden="true" /> Home
          </Button>
        </footer>
      </section>

      <GameResultModal result={result} onPlayAgain={restartRound} onChangeDifficulty={changeDifficulty} />
    </main>
  );
}

function HudStat({ label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/50 px-2 py-1">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-sm font-black text-white sm:text-base">{value}</p>
    </div>
  );
}
