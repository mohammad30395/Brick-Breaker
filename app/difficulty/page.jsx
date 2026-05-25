import DifficultyCard from "@/components/DifficultyCard";
import Navbar from "@/components/Navbar";
import { DIFFICULTIES } from "@/lib/gameConfig";

export default function DifficultyPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-wrap">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">Choose difficulty</h1>
          <p className="mt-2 text-sm text-slate-300">Difficulty changes destroyable brick durability. Unbreakable bricks stay the same.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {DIFFICULTIES.map((difficulty) => (
            <DifficultyCard key={difficulty.id} difficulty={difficulty} />
          ))}
        </div>
      </section>
    </main>
  );
}
