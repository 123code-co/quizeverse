import Link from "next/link";
import { Award, RotateCcw, Trophy } from "lucide-react";

type QuizResultsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuizResultsPage({ params }: QuizResultsPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-[28px] border border-emerald-500/20 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_38%),#0f172a] p-6 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Results</p>
          <h1 className="mt-2 text-3xl font-black">Mission #{id} complete</h1>
          <p className="mt-2 text-slate-300">A stylish results screen is now ready for real score and attempt data.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Trophy className="h-5 w-5 text-amber-300" />
            <p className="mt-3 text-sm text-slate-400">Score</p>
            <p className="text-2xl font-black">80%</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Award className="h-5 w-5 text-cyan-300" />
            <p className="mt-3 text-sm text-slate-400">Rank gain</p>
            <p className="text-2xl font-black">+24 XP</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <RotateCcw className="h-5 w-5 text-fuchsia-300" />
            <p className="mt-3 text-sm text-slate-400">Time used</p>
            <p className="text-2xl font-black">01:42</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/play/quiz/${id}`} className="rounded-2xl bg-cyan-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300">
            Replay Quiz
          </Link>
          <Link href="/dashboard" className="rounded-2xl border border-slate-700 px-4 py-2.5 font-semibold text-slate-200 transition hover:border-cyan-400/40">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}