import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { BrainCircuit, Clock3, Gamepad2, Sparkles, Swords, Trophy } from "lucide-react";
import { authOptions } from "@/lib/auth";

const modes = [
  {
    title: "Quick Solo Run",
    description: "Jump into a fast-paced challenge and test your reflexes.",
    icon: Gamepad2,
    badge: "Fast start",
    href: "/play/quiz/demo",
  },
  {
    title: "Multiplayer Arena",
    description: "Battle with friends in a live room and race to the top.",
    icon: Swords,
    badge: "Live battle",
    href: "/play/multiplayer",
  },
  {
    title: "Rank Push",
    description: "Focus on accuracy and climb the leaderboard with every round.",
    icon: Trophy,
    badge: "High score",
    href: "/leaderboard",
  },
];

export default async function QuizBrowserPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[28px] border border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),#0f172a] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Play Hub</p>
          <h1 className="mt-2 text-3xl font-black">Choose your next quiz mission.</h1>
          <p className="mt-2 max-w-2xl text-slate-300">
            Switch between solo challenges, multiplayer rooms, and leaderboard-focused runs from one streamlined game hub.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {modes.map(({ title, description, icon: Icon, badge, href }) => (
            <Link key={title} href={href} className="group rounded-[24px] border border-slate-800 bg-slate-900/80 p-5 shadow-xl transition hover:border-cyan-400/50 hover:-translate-y-1">
              <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-cyan-300">{badge}</p>
              <h2 className="mt-2 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-cyan-200">Launch →</span>
            </Link>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <BrainCircuit className="h-5 w-5 text-fuchsia-300" />
            <p className="mt-3 font-semibold">Adaptive questions</p>
            <p className="mt-1 text-sm text-slate-400">Tackle logic, science, math, and programming in one place.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <Clock3 className="h-5 w-5 text-amber-300" />
            <p className="mt-3 font-semibold">Time-pressure rounds</p>
            <p className="mt-1 text-sm text-slate-400">Stay calm under countdown pressure and maximize every point.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <Sparkles className="h-5 w-5 text-emerald-300" />
            <p className="mt-3 font-semibold">Fresh experience</p>
            <p className="mt-1 text-sm text-slate-400">A cleaner, more exciting quiz cockpit ready for real play.</p>
          </div>
        </div>
      </div>
    </main>
  );
}