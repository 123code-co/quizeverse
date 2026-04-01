"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Activity, RadioTower, Signal, Swords, Users } from "lucide-react";

const starterPlayers = [
  { name: "NovaByte", score: 180 },
  { name: "CodeSpark", score: 165 },
  { name: "LogicFlux", score: 150 },
];

const feedMessages = [
  "NovaByte answered a logic question in 4.2s.",
  "A new speed-round bonus is now active.",
  "CodeSpark just climbed into the lead.",
  "Room pulse stable — next question in 3 seconds.",
];

export function RealtimeBattlePanel() {
  const [nickname, setNickname] = useState("QuizPilot");
  const [roomCode, setRoomCode] = useState("QUIZ42");
  const [joined, setJoined] = useState(false);
  const [players, setPlayers] = useState(starterPlayers);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    if (!joined) return;

    const interval = window.setInterval(() => {
      setPlayers((current) =>
        [...current]
          .map((player, index) => ({
            ...player,
            score: player.score + (index === 0 ? 5 : index === 1 ? 8 : 6),
          }))
          .sort((a, b) => b.score - a.score),
      );
      setFeedIndex((current) => (current + 1) % feedMessages.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [joined]);

  const joinedPlayers = useMemo(() => {
    if (!joined) return players;
    const userAlreadyPresent = players.some((player) => player.name === nickname.trim());
    return userAlreadyPresent ? players : [{ name: nickname.trim() || "QuizPilot", score: 140 }, ...players];
  }, [joined, nickname, players]);

  return (
    <section className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/75 p-5 shadow-2xl backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Realtime Multiplayer</p>
        <h2 className="mt-2 text-2xl font-black">Build, join, and monitor live battle rooms.</h2>
        <p className="mt-1 text-sm text-slate-400">This panel simulates a live room feed and gives you a more game-ready multiplayer tab.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Nickname</label>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-400/40"
              placeholder="Enter your player tag"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Room code</label>
            <input
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-400/40"
              placeholder="QUIZ42"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setJoined(true)}
              className="rounded-2xl bg-fuchsia-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-fuchsia-300"
            >
              Join Room
            </button>
            <Link
              href={`/play/multiplayer/${roomCode || "QUIZ42"}`}
              className="rounded-2xl border border-fuchsia-400/40 px-4 py-2.5 font-semibold text-fuchsia-200 transition hover:bg-fuchsia-500/10"
            >
              Open Live Room
            </Link>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">Live room feed</p>
              <p className="text-lg font-bold text-white">Room {roomCode || "QUIZ42"}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <Signal className="h-3.5 w-3.5" />
              {joined ? "Connected" : "Standby"}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-fuchsia-200">
              <RadioTower className="h-4 w-4" />
              <p className="font-semibold">Realtime event</p>
            </div>
            <p className="mt-2">{joined ? feedMessages[feedIndex] : "Join a room to activate the live battle feed."}</p>
          </div>

          <div className="space-y-3">
            {joinedPlayers.map((player, index) => (
              <div key={`${player.name}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-800 p-2 text-cyan-200">
                    {index === 0 ? <Swords className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                  </div>
                  <p className="font-semibold text-white">{player.name}</p>
                </div>
                <p className="text-sm font-semibold text-cyan-200">{player.score} pts</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-amber-200">
              <Activity className="h-4 w-4" />
              Match status: <span className="font-semibold">{joined ? "Warmup round active" : "Waiting for players"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
