import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { BrainCircuit, RadioTower, Rocket, Trophy } from "lucide-react";
import { QuizArena } from "@/components/quiz/quiz-arena";
import { authOptions } from "@/lib/auth";

const quickLaunch = [
  {
    title: "Solo Missions",
    description: "Play multiple quiz types with live scoring and a countdown.",
    href: "/play/quiz/code-rush",
    icon: Rocket,
  },
  {
    title: "Realtime Rooms",
    description: "Open the multiplayer arena and battle in shared rooms.",
    href: "/play/multiplayer",
    icon: RadioTower,
  },
  {
    title: "Leaderboard Push",
    description: "Compete for higher placement across the weekly ranking table.",
    href: "/leaderboard",
    icon: Trophy,
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
        <div className="rounded-[28px] border border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),#0f172a] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Play Hub</p>
          <h1 className="mt-2 text-3xl font-black">Real quiz games now live inside your tabs.</h1>
          <p className="mt-2 max-w-2xl text-slate-300">
            Train across multiple quiz modes, switch tabs instantly, and jump into different game styles from one modern control center.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickLaunch.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-cyan-400/40 hover:-translate-y-1">
              <Icon className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 font-semibold">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </Link>
          ))}
        </div>

        <QuizArena
          title="Multi-mode Quiz Tabs"
          subtitle="Play multiple-choice, true/false, fill-in-the-blank, and logic sprint modes from the same tabbed game console."
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2 text-fuchsia-300">
            <BrainCircuit className="h-4 w-4" />
            <span className="font-semibold">Next step ready:</span>
          </div>
          Hook these game panels to your real quiz database and attempts API when you want persistent scoring.
        </div>
      </div>
    </main>
  );
}