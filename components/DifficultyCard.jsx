"use client";

import { useRouter } from "next/navigation";
import { Gauge } from "lucide-react";
import Button from "./Button";
import { saveSelectedDifficulty } from "@/lib/storage";

export default function DifficultyCard({ difficulty }) {
  const router = useRouter();

  function selectDifficulty() {
    saveSelectedDifficulty({ id: difficulty.id, label: difficulty.label });
    router.push("/game");
  }

  return (
    <article className="panel flex h-full flex-col p-5 transition hover:-translate-y-1 hover:border-teal-300/40">
      <div className="mb-4 grid size-11 place-items-center rounded-md bg-white/10 text-teal-200">
        <Gauge size={22} aria-hidden="true" />
      </div>
      <h2 className="text-xl font-black text-white">{difficulty.label}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{difficulty.description}</p>
      <div className="mt-4 flex gap-2">
        {difficulty.brickTypes.map((hp) => (
          <span key={hp} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs font-bold text-slate-100">
            {hp} hit{hp > 1 ? "s" : ""}
          </span>
        ))}
      </div>
      <Button className="mt-5 w-full" onClick={selectDifficulty}>Choose {difficulty.label}</Button>
    </article>
  );
}
