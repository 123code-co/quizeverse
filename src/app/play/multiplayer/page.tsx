import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { RealtimeBattlePanel } from "@/components/multiplayer/realtime-battle-panel";
import { authOptions } from "@/lib/auth";

export default async function MultiplayerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),transparent_38%),#0f172a] p-6 shadow-[0_0_60px_rgba(217,70,239,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Multiplayer Arena</p>
          <h1 className="mt-2 text-3xl font-black">Realtime battle tools now live in this tab.</h1>
          <p className="mt-2 text-slate-300">
            Join rooms, watch a simulated live scoreboard, and prepare the multiplayer tab for real socket-based play.
          </p>
        </div>

        <RealtimeBattlePanel />
      </div>
    </main>
  );
}