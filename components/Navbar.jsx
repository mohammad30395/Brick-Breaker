import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Navbar() {
  return (
    <header className="mb-6 border-b border-white/10 pb-4">
      <nav className="content-wrap flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-wide text-white">
          <span className="grid size-9 place-items-center rounded-md bg-teal-300 text-slate-950">
            <Trophy size={19} aria-hidden="true" />
          </span>
          Brick Breaker
        </Link>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Link className="rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-white" href="/rules">
            Rules
          </Link>
          <Link className="rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-white" href="/leaderboard">
            Leaderboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
