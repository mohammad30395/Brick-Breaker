import { ArrowLeftRight, BrickWall, CircleDot, Database, Shield, Trophy } from "lucide-react";
import Button from "./Button";

const sections = [
  {
    icon: ArrowLeftRight,
    title: "How to play",
    text: "Move the paddle to keep the ball in play. Break every destroyable brick before the ball falls below the paddle.",
  },
  {
    icon: CircleDot,
    title: "Controls",
    text: "Use the left and right arrow keys on a keyboard. On laptops and mobile devices, move with the mouse or drag/touch across the game area.",
  },
  {
    icon: BrickWall,
    title: "Brick types",
    text: "Normal bricks break in 1 hit, strong bricks in 2 hits, and heavy bricks in 3 hits. Unbreakable bricks are gray and remain on the board.",
  },
  {
    icon: Shield,
    title: "Difficulty",
    text: "Easy uses only normal bricks. Medium adds strong bricks. Hard adds strong and heavy bricks for longer rounds.",
  },
  {
    icon: Trophy,
    title: "Winning and game over",
    text: "You start with 3 lives. You lose one life when the ball drops below the paddle. You win when all destroyable bricks are gone, and the game ends when all lives are used.",
  },
  {
    icon: Database,
    title: "Leaderboard",
    text: "Round records are saved in your browser localStorage only. Clearing browser data or using another device removes those records.",
  },
];

export default function RulesContent() {
  return (
    <section className="panel mx-auto max-w-4xl p-5 sm:p-7">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">Rules</h1>
        <p className="mt-2 text-sm text-slate-300">Learn the board, bricks, scoring, and saved records.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <article key={section.title} className="rounded-md border border-white/10 bg-slate-950/40 p-4">
              <div className="mb-3 grid size-10 place-items-center rounded-md bg-white/10 text-teal-200">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h2 className="font-black text-white">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{section.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-6">
        <Button href="/">Back to Home</Button>
      </div>
    </section>
  );
}
