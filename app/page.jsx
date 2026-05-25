import { BookOpen, Play, Trophy } from "lucide-react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-wrap grid min-h-[calc(100dvh-9rem)] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-200">Arcade challenge</p>
          <h1 className="mt-4 text-5xl font-black leading-none text-white sm:text-7xl">Brick Breaker</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Customize your player, choose a brick layout, set the difficulty, and clear every destroyable brick.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/setup" className="sm:min-w-40"><Play size={18} aria-hidden="true" /> Start Game</Button>
            <Button href="/rules" variant="secondary"><BookOpen size={18} aria-hidden="true" /> Rules</Button>
            <Button href="/leaderboard" variant="secondary"><Trophy size={18} aria-hidden="true" /> Leaderboard</Button>
          </div>
        </div>

        <div className="panel p-4 shadow-glow">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-950">
            <div className="absolute inset-x-8 top-8 grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }, (_, index) => (
                <span
                  key={index}
                  className={`h-8 rounded-sm ${index % 7 === 0 ? "bg-slate-500" : index % 3 === 0 ? "bg-rose-400" : index % 2 === 0 ? "bg-yellow-300" : "bg-teal-300"}`}
                />
              ))}
            </div>
            <div className="absolute bottom-12 left-1/2 h-4 w-36 -translate-x-1/2 rounded-full bg-sky-300" />
            <div className="absolute bottom-28 left-[58%] size-6 rounded-full bg-teal-300 shadow-[0_0_35px_rgba(45,212,191,0.65)]" />
            <div className="absolute inset-0 border border-white/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
