import Link from "next/link";
import { Signal, Swords, Users } from "lucide-react";

type LiveMultiplayerPageProps = {
  params: Promise<{ roomCode: string }>;
};

export default async function LiveMultiplayerPage({ params }: LiveMultiplayerPageProps) {
  const { roomCode } = await params;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),transparent_38%),#0f172a] p-6 shadow-[0_0_60px_rgba(217,70,239,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Live Room</p>
          <h1 className="mt-2 text-3xl font-black">Room Code: {roomCode}</h1>
          <p className="mt-2 text-slate-300">This room view is ready for your live socket-based multiplayer experience.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Signal className="h-5 w-5 text-emerald-300" />
            <p className="mt-3 text-sm text-slate-400">Connection</p>
            <p className="text-xl font-bold">Stable</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Users className="h-5 w-5 text-cyan-300" />
            <p className="mt-3 text-sm text-slate-400">Players joined</p>
            <p className="text-xl font-bold">3 / 6</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <Swords className="h-5 w-5 text-fuchsia-300" />
            <p className="mt-3 text-sm text-slate-400">Status</p>
            <p className="text-xl font-bold">Waiting to start</p>
          </div>
        </div>

        <Link href="/play/multiplayer" className="inline-flex rounded-2xl border border-slate-700 px-4 py-2.5 font-semibold text-slate-200 transition hover:border-cyan-400/40">
          Back to Multiplayer Lobby
        </Link>
      </div>
    </main>
  );
}