import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { leaderboard } from "@/data/achievements";
export const Route = createFileRoute("/leaderboard")({ head: () => ({ meta: [{ title: "Leaderboard — SAPAMS" }] }), component: () => (
  <DashboardLayout role="student" title="Leaderboard">
    <PageTransition>
      <h1 className="text-2xl font-bold">Top Performers 🏆</h1>
      <p className="text-sm text-muted-foreground">Updated in real-time across all departments.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {leaderboard.slice(0,3).map((u,i) => (
          <motion.div key={u.rank} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} className={`rounded-2xl border bg-card p-6 text-center shadow-card ${i===0?"ring-2 ring-warning":""}`}>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">{u.name[0]}</div>
            <p className="mt-3 font-semibold">{u.name}</p><p className="text-xs text-muted-foreground">{u.dept}</p>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-warning/15 px-3 py-1 text-warning"><Trophy className="h-3 w-3"/><span className="text-sm font-bold">#{u.rank}</span></div>
            <p className="mt-2 text-2xl font-bold text-gradient">{u.score}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-card">
        <table className="w-full text-sm"><thead className="border-b bg-muted/50 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Rank</th><th>Name</th><th>Dept</th><th>Projects</th><th>Achievements</th><th>Score</th></tr></thead>
          <tbody>{leaderboard.map((u,i)=>(<motion.tr key={u.rank} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}} className="border-b last:border-0 hover:bg-accent/50"><td className="p-3 font-semibold">#{u.rank}</td><td>{u.name}</td><td className="text-muted-foreground">{u.dept}</td><td>{u.projects}</td><td>{u.achievements}</td><td className="font-bold text-primary">{u.score}</td></motion.tr>))}</tbody>
        </table>
      </div>
    </PageTransition>
  </DashboardLayout>
)});
