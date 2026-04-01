"use client";

import { LogOut, Sparkles } from "lucide-react";
import { signOut } from "next-auth/react";

type UserMenuProps = {
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export function UserMenu({ name, email, role }: UserMenuProps) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-200">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-white">{name ?? "Quiz Pilot"}</p>
          <p className="text-xs text-slate-400">{email ?? "Signed in"}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
        Role: {role ?? "PLAYER"}
      </div>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-rose-400/40 hover:text-rose-200"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </div>
  );
}
