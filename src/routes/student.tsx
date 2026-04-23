import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Calendar, FileText, Plus, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { studentStats, monthlySubmissions, performanceData, departmentData } from "@/data/stats";
import { projects, deadlines, activity } from "@/data/projects";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — SAPAMS" }] }),
  component: StudentDashboard,
});

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function StudentDashboard() {
  return (
    <DashboardLayout role="student" title="Dashboard">
      <PageTransition>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Aarav 👋</h1>
            <p className="text-sm text-muted-foreground">Here's what's happening with your academic profile today.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline"><Link to="/student/achievements"><Sparkles className="mr-2 h-4 w-4" />New Achievement</Link></Button>
            <Button asChild className="gradient-primary text-primary-foreground"><Link to="/student/projects"><Plus className="mr-2 h-4 w-4" />New Project</Link></Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studentStats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div><h3 className="font-semibold">Submission Activity</h3><p className="text-xs text-muted-foreground">Projects vs Achievements</p></div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlySubmissions}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="projects" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="achievements" stroke="var(--color-chart-2)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="score" fill="var(--color-chart-5)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Recent Submissions</h3>
              <Link to="/student/projects" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="pb-2">Title</th><th className="pb-2">Guide</th><th className="pb-2">Status</th><th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.slice(0, 5).map((p, i) => (
                    <motion.tr key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.05 }} className="border-b last:border-0">
                      <td className="py-3 font-medium">{p.title}</td>
                      <td className="py-3 text-muted-foreground">{p.guide}</td>
                      <td className="py-3"><StatusBadge status={p.status} /></td>
                      <td className="py-3 text-muted-foreground">{p.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${d.urgency === "high" ? "bg-destructive/15 text-destructive" : d.urgency === "medium" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}>
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.course} • {d.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Skill Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={departmentData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {departmentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2">
            <h3 className="mb-4 font-semibold">Activity Feed</h3>
            <div className="space-y-3">
              {activity.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.05 }} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><FileText className="h-4 w-4" /></div>
                  <div className="flex-1"><p className="text-sm">{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Approved: "bg-success/15 text-success border-success/30",
    Pending: "bg-warning/15 text-warning border-warning/30",
    "In Review": "bg-primary/15 text-primary border-primary/30",
    Rejected: "bg-destructive/15 text-destructive border-destructive/30",
    Draft: "bg-muted text-muted-foreground",
  };
  return <Badge variant="outline" className={map[status] || ""}>{status}</Badge>;
}
