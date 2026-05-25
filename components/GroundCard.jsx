"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { BRICK_COLOR_CLASSES } from "@/lib/gameConfig";
import { GRID } from "@/lib/brickLayouts";
import { saveSelectedGround } from "@/lib/storage";

export default function GroundCard({ ground }) {
  const router = useRouter();

  function selectGround() {
    saveSelectedGround({ id: ground.id, label: ground.label });
    router.push("/difficulty");
  }

  return (
    <article className="panel flex h-full flex-col p-4 transition hover:-translate-y-1 hover:border-teal-300/40">
      <LayoutPreview bricks={ground.bricks} />
      <div className="mt-4 flex flex-1 flex-col">
        <h2 className="text-lg font-black text-white">{ground.label}</h2>
        <p className="mt-2 flex-1 text-sm text-slate-300">{ground.description}</p>
        <Button className="mt-4 w-full" onClick={selectGround}>Select layout</Button>
      </div>
    </article>
  );
}

export function LayoutPreview({ bricks }) {
  const brickMap = new Map(bricks.map((brick) => [`${brick.row}-${brick.column}`, brick]));

  return (
    <div
      className="grid aspect-[11/7] gap-1 rounded-md border border-white/10 bg-slate-950/70 p-2"
      style={{ gridTemplateColumns: `repeat(${GRID.columns}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: GRID.rows * GRID.columns }, (_, index) => {
        const row = Math.floor(index / GRID.columns);
        const column = index % GRID.columns;
        const brick = brickMap.get(`${row}-${column}`);
        return (
          <span
            key={`${row}-${column}`}
            className={`rounded-sm ${brick ? (brick.unbreakable ? BRICK_COLOR_CLASSES.unbreakable : BRICK_COLOR_CLASSES[1]) : "bg-transparent"}`}
          />
        );
      })}
    </div>
  );
}
