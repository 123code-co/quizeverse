import Link from "next/link";

const quickLinks = [
  { href: "/play", label: "Start Playing" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/login", label: "Log In" },
  { href: "/signup", label: "Sign Up" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
            Welcome to Quizeverse
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Play quizzes, climb the leaderboard, and challenge friends.
          </h1>
          <p className="text-lg text-slate-300">
            Quizeverse is your interactive quiz platform for solo games, multiplayer rooms,
            and fast competition across categories.
          </p>

          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-cyan-500 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-cyan-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid w-full max-w-xl gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Live modes</p>
            <p className="mt-2 text-2xl font-semibold">Solo • Multiplayer • Timed Quiz</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Categories</p>
              <p className="mt-2 font-medium">Math, Science, Logic, Programming</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Goal</p>
              <p className="mt-2 font-medium">Score higher and rank faster</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
