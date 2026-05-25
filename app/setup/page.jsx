import Navbar from "@/components/Navbar";
import SetupForm from "@/components/SetupForm";

export default function SetupPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <div className="content-wrap">
        <SetupForm />
      </div>
    </main>
  );
}
