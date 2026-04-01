import { Crown, Medal, Trophy } from "lucide-react";

const leaders = [
  { name: "NovaByte", score: "9,840", streak: "14 wins" },
  { name: "CodeSpark", score: "9,120", streak: "11 wins" },
  { name: "LogicFlux", score: "8,760", streak: "9 wins" },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-amber-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_38%),#0f172a] p-6 shadow-[0_0_50px_rgba(251,191,36,0.08)]">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Leaderboard</p>
        <h2 className="mt-2 text-3xl font-black">Top quiz pilots this week</h2>
        <p className="mt-2 text-slate-300">Keep answering accurately and push yourself into the top ranking slots.</p>
      </div>

      <div className="grid gap-4">
        {leaders.map((leader, index) => (
          <div key={leader.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-slate-800 p-3 text-amber-300">
                {index === 0 ? <Crown className="h-5 w-5" /> : index === 1 ? <Trophy className="h-5 w-5" /> : <Medal className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-semibold">#{index + 1} {leader.name}</p>
                <p className="text-sm text-slate-400">{leader.streak}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-amber-200">{leader.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}