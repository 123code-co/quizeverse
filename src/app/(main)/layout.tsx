import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { BrainCircuit, LayoutDashboard, Rocket, ShieldCheck, Trophy, UserCircle2 } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { UserMenu } from "@/components/layout/user-menu";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/play", label: "Play Quiz", icon: Rocket },
  { href: "/play/multiplayer", label: "Multiplayer", icon: BrainCircuit },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: UserCircle2 },
];

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_30%),#020617] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-cyan-500/20 bg-slate-950/80 p-4 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur">
          <Link href="/dashboard" className="mb-6 block rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Quizeverse</p>
            <h2 className="mt-2 text-2xl font-bold">Mission Control</h2>
            <p className="mt-2 text-sm text-slate-400">A techy quiz space for fast play, rankings, and multiplayer sessions.</p>
          </Link>

          <nav className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-200">
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}

            {session.user.role === "ADMIN" && (
              <Link href="/admin" className="flex items-center gap-3 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-3 text-sm font-medium text-fuchsia-200 transition hover:bg-fuchsia-500/20">
                <ShieldCheck className="h-4 w-4" />
                Admin Console
              </Link>
            )}
          </nav>

          <div className="mt-6">
            <UserMenu name={session.user.name} email={session.user.email} role={session.user.role} />
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Mission Brief</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Welcome back, {session.user.name ?? "Player"}.</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Launch quick matches, explore quiz modes, and keep climbing the Quizeverse ranks from one futuristic dashboard.
            </p>
          </div>

          {children}
        </section>
      </div>
    </div>
  );
}