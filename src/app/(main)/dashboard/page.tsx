import Link from "next/link";
import { Activity, ArrowRight, BrainCircuit, Layers3, Rocket, Trophy, Users } from "lucide-react";
import { QuizArena } from "@/components/quiz/quiz-arena";

const featureCards = [
  {
    title: "Solo Challenge",
    description: "Start a fast-paced personal quiz session and sharpen your speed.",
    href: "/play",
    icon: Rocket,
    accent: "from-cyan-500/20 to-sky-500/5",
  },
  {
    title: "Multiplayer Arena",
    description: "Join a room and compete live with friends in a realtime battle.",
    href: "/play/multiplayer",
    icon: Users,
    accent: "from-fuchsia-500/20 to-purple-500/5",
  },
  {
    title: "Leaderboard Run",
    description: "Push your score higher and see how you compare with other players.",
    href: "/leaderboard",
    icon: Trophy,
    accent: "from-amber-500/20 to-yellow-500/5",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Primary Dashboard</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">A tech-friendly quiz cockpit built for action.</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Launch into solo runs, multiplayer showdowns, and leaderboard races from one animated control center.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/play" className="rounded-2xl bg-cyan-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Start Playing
            </Link>
            <Link href="/play/multiplayer" className="rounded-2xl border border-cyan-400/40 px-4 py-2.5 font-semibold text-cyan-200 transition hover:bg-cyan-500/10">
              Join Multiplayer
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Activity className="h-5 w-5 text-emerald-300" />
            <p className="mt-3 text-sm text-slate-400">Status</p>
            <p className="text-xl font-bold">System ready for gameplay</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <BrainCircuit className="h-5 w-5 text-fuchsia-300" />
            <p className="mt-3 text-sm text-slate-400">Theme</p>
            <p className="text-xl font-bold">3D neon quiz experience</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {featureCards.map(({ title, description, href, icon: Icon, accent }) => (
          <Link
            key={title}
            href={href}
            className={`group rounded-3xl border border-slate-800 bg-linear-to-br ${accent} p-5 shadow-xl transition duration-300 hover:border-cyan-400/50 hover:transform-[perspective(1200px)_rotateX(0deg)_rotateY(0deg)_translateY(-6px)] transform-[perspective(1200px)_rotateX(8deg)_rotateY(-8deg)]`}
          >
            <div className="inline-flex rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-cyan-200">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              Open module <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <Layers3 className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 font-semibold">Flexible dashboard</p>
          <p className="mt-1 text-sm text-slate-400">Easy to extend with real stats, recent games, and recommended quizzes.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <Users className="h-5 w-5 text-fuchsia-300" />
          <p className="mt-3 font-semibold">Social play</p>
          <p className="mt-1 text-sm text-slate-400">Invite friends and battle through multiplayer quiz rooms.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <Trophy className="h-5 w-5 text-amber-300" />
          <p className="mt-3 font-semibold">Score-focused</p>
          <p className="mt-1 text-sm text-slate-400">Climb the rankings with faster answers and better accuracy.</p>
        </div>
      </section>

      <QuizArena
        title="Dashboard Instant Play"
        subtitle="Users can now log in and start playing quiz modes directly from the dashboard without leaving the page."
      />
    </div>
  );
}
