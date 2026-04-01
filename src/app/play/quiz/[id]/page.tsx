import Link from "next/link";
import { CheckCircle2, Clock3, Lightbulb, PlayCircle } from "lucide-react";

type QuizPlayerPageProps = {
  params: Promise<{ id: string }>;
};

const choices = [
  "HyperText Markup Language",
  "High Transfer Machine Language",
  "Home Tool Markup Logic",
  "Hybrid Text Machine Link",
];

export default async function QuizPlayerPage({ params }: QuizPlayerPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-[28px] border border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),#0f172a] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Live Quiz Session</p>
          <h1 className="mt-2 text-3xl font-black">Mission #{id}</h1>
          <p className="mt-2 text-slate-300">A polished demo player screen where you can wire in real quiz questions and scoring logic.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Clock3 className="h-5 w-5 text-amber-300" />
            <p className="mt-3 text-sm text-slate-400">Time left</p>
            <p className="text-xl font-bold">00:24</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <PlayCircle className="h-5 w-5 text-cyan-300" />
            <p className="mt-3 text-sm text-slate-400">Question</p>
            <p className="text-xl font-bold">1 / 10</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Lightbulb className="h-5 w-5 text-fuchsia-300" />
            <p className="mt-3 text-sm text-slate-400">Difficulty</p>
            <p className="text-xl font-bold">Medium</p>
          </div>
        </div>

        <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Sample Question</p>
          <h2 className="mt-3 text-2xl font-bold">What does HTML stand for?</h2>

          <div className="mt-5 grid gap-3">
            {choices.map((choice, index) => (
              <button
                key={choice}
                type="button"
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                  index === 0
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                    : "border-slate-700 bg-slate-950/70 text-slate-200 hover:border-cyan-400/40"
                }`}
              >
                <span>{choice}</span>
                {index === 0 && <CheckCircle2 className="h-4 w-4" />}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/play/quiz/${id}/results`} className="rounded-2xl bg-cyan-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Submit Demo Answer
            </Link>
            <Link href="/play" className="rounded-2xl border border-slate-700 px-4 py-2.5 font-semibold text-slate-200 transition hover:border-cyan-400/40">
              Back to Play Hub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}