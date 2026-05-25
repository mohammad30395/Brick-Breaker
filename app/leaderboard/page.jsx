import Button from "@/components/Button";
import LeaderboardTable from "@/components/LeaderboardTable";
import Navbar from "@/components/Navbar";

export default function LeaderboardPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-wrap">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Leaderboard</h1>
            <p className="mt-2 text-sm text-slate-300">Records are sorted by highest score and stored only in this browser.</p>
          </div>
          <Button href="/" variant="secondary">Back to Home</Button>
        </div>
        <LeaderboardTable />
      </section>
    </main>
  );
}
