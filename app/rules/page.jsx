import Navbar from "@/components/Navbar";
import RulesContent from "@/components/RulesContent";

export default function RulesPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <div className="content-wrap">
        <RulesContent />
      </div>
    </main>
  );
}
