import Link from "next/link";
import { QuizArena } from "@/components/quiz/quiz-arena";

type QuizPlayerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuizPlayerPage({ params }: QuizPlayerPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[28px] border border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),#0f172a] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Live Quiz Session</p>
          <h1 className="mt-2 text-3xl font-black">Mission: {id}</h1>
          <p className="mt-2 text-slate-300">
            This dedicated quiz route now loads a playable game mode instead of just a placeholder screen.
          </p>
          <Link href={`/play/quiz/${id}/results`} className="mt-4 inline-flex rounded-2xl border border-cyan-400/40 px-4 py-2 font-semibold text-cyan-200 transition hover:bg-cyan-500/10">
            View results screen
          </Link>
        </div>

        <QuizArena
          initialQuizId={id}
          title="Focused Quiz Run"
          subtitle="This route opens a selected game mode with live scoring, timing, and multi-question flow."
        />
      </div>
    </main>
  );
}