import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { RadioTower, Users, Zap } from "lucide-react";
import { authOptions } from "@/lib/auth";

export default async function MultiplayerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.16),_transparent_38%),#0f172a] p-6 shadow-[0_0_60px_rgba(217,70,239,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Multiplayer Arena</p>
          <h1 className="mt-2 text-3xl font-black">Create or join a live quiz room.</h1>
          <p className="mt-2 text-slate-300">
            Challenge your friends, share a room code, and compete in a realtime tech-themed battle zone.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-5">
            <RadioTower className="h-6 w-6 text-fuchsia-300" />
            <h2 className="mt-4 text-xl font-bold">Host a Room</h2>
            <p className="mt-2 text-sm text-slate-400">Set up a match, invite players, and launch a live quiz race.</p>
            <button className="mt-4 rounded-2xl bg-fuchsia-400 px-4 py-2 font-semibold text-slate-950">Create Match</button>
          </div>

          <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-5">
            <Users className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-4 text-xl font-bold">Join with Code</h2>
            <p className="mt-2 text-sm text-slate-400">Use a room code from a friend and jump directly into the battle lobby.</p>
            <Link href="/dashboard" className="mt-4 inline-flex rounded-2xl border border-cyan-400/40 px-4 py-2 font-semibold text-cyan-200">
              Go to Dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
          <Zap className="mb-2 h-5 w-5 text-amber-300" />
          Multiplayer room actions are styled and ready here. You can next connect the room creation flow to your existing socket logic.
        </div>
      </div>
    </main>
  );
}