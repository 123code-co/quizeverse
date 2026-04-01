"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, Rocket } from "lucide-react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [registeredNotice, setRegisteredNotice] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRegisteredNotice(params.get("registered") === "1");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setError("");
    setRedirecting(false);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    setRedirecting(true);
    router.push(res?.url ?? "/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-cyan-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-8 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
          <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Pilot Access
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
            Enter the Quizeverse control room.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-300">
            Log in to launch solo missions, join multiplayer rooms, and unlock your live quiz dashboard.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="font-semibold">Solo Runs</p>
              <p className="mt-1 text-slate-400">Timed quiz missions</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="font-semibold">Multiplayer</p>
              <p className="mt-1 text-slate-400">Live rooms and battles</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="font-semibold">Progress</p>
              <p className="mt-1 text-slate-400">Ranks and profile growth</p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Log In</h2>
            <p className="mt-1 text-sm text-slate-400">Access your dashboard and start playing instantly.</p>
          </div>

          {registeredNotice && (
            <p className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              Account created successfully. Log in to continue.
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-3">
                <Mail className="h-4 w-4 text-cyan-300" />
                <input className="w-full bg-transparent p-3 outline-none" type="email" placeholder="you@example.com" {...register("email")} />
              </div>
              {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-3">
                <LockKeyhole className="h-4 w-4 text-cyan-300" />
                <input className="w-full bg-transparent p-3 outline-none" type="password" placeholder="••••••••" {...register("password")} />
              </div>
              {errors.password && <p className="mt-1 text-sm text-rose-400">{errors.password.message}</p>}
            </div>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70" disabled={isSubmitting || redirecting}>
              <Rocket className="h-4 w-4" />
              {isSubmitting ? "Checking access..." : redirecting ? "Redirecting..." : "Open Dashboard"}
            </button>

            {error && <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
          </form>

          <p className="mt-5 text-sm text-slate-400">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}