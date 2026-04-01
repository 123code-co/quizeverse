"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess("Registration complete. Redirecting to login...");
    setTimeout(() => router.push("/login?registered=1"), 900);
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.16),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-8 shadow-[0_0_60px_rgba(217,70,239,0.10)]">
          <span className="inline-flex rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
            New Pilot Setup
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight">Create your Quizeverse account.</h1>
          <p className="mt-4 text-slate-300">
            Set up your player identity and unlock the dashboard, multiplayer rooms, and live score tracking.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">Personalized dashboard and profile</div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">Access to solo and multiplayer quiz modes</div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">Leaderboard-ready progress tracking</div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="mt-1 text-sm text-slate-400">Join the platform and get your quiz cockpit ready.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Name</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-3">
                <UserRound className="h-4 w-4 text-fuchsia-300" />
                <input className="w-full bg-transparent p-3 outline-none" placeholder="Your display name" {...register("name")} />
              </div>
              {errors.name && <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-3">
                <Mail className="h-4 w-4 text-fuchsia-300" />
                <input className="w-full bg-transparent p-3 outline-none" type="email" placeholder="you@example.com" {...register("email")} />
              </div>
              {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-3">
                <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                <input className="w-full bg-transparent p-3 outline-none" type="password" placeholder="••••••••" {...register("password")} />
              </div>
              {errors.password && <p className="mt-1 text-sm text-rose-400">{errors.password.message}</p>}
            </div>

            <button type="submit" className="w-full rounded-2xl bg-fuchsia-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-fuchsia-300 disabled:cursor-not-allowed disabled:opacity-70" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>

            {error && <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
            {success && <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p>}
          </form>

          <p className="mt-5 text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-fuchsia-300 hover:text-fuchsia-200">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}