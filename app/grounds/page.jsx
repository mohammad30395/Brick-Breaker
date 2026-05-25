import GroundCard from "@/components/GroundCard";
import Navbar from "@/components/Navbar";
import { GROUNDS } from "@/lib/brickLayouts";

export default function GroundsPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-wrap">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">Choose a ground</h1>
          <p className="mt-2 text-sm text-slate-300">Every layout includes gray unbreakable bricks that do not count toward winning.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROUNDS.map((ground) => (
            <GroundCard key={ground.id} ground={ground} />
          ))}
        </div>
      </section>
    </main>
  );
}
