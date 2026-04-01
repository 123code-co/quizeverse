import { BadgeCheck, BrainCircuit, Flame, UserRound } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-emerald-500/20 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_38%),#0f172a] p-6 shadow-[0_0_50px_rgba(16,185,129,0.08)]">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Player Profile</p>
        <h2 className="mt-2 text-3xl font-black">Your quiz identity</h2>
        <p className="mt-2 text-slate-300">Track your streaks, favorite categories, and growth across the platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <UserRound className="h-5 w-5 text-emerald-300" />
          <p className="mt-3 font-semibold">Pilot Rank</p>
          <p className="text-sm text-slate-400">Rising Strategist</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <Flame className="h-5 w-5 text-orange-300" />
          <p className="mt-3 font-semibold">Current Streak</p>
          <p className="text-sm text-slate-400">5 sessions in a row</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <BrainCircuit className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 font-semibold">Favorite Domain</p>
          <p className="text-sm text-slate-400">Programming & Logic</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
        <div className="flex items-center gap-3 text-emerald-300">
          <BadgeCheck className="h-5 w-5" />
          <p className="font-semibold">Progress Snapshot</p>
        </div>
        <p className="mt-3 text-sm text-slate-300">
          Your profile area is now styled as a proper player hub and ready for you to connect real stats, achievements, and recent match history.
        </p>
      </div>
    </div>
  );
}