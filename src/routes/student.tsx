import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, Sparkles, Bell, Trophy, FolderKanban, TrendingUp, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/context/AppContext";
import { monthlySubmissions, performanceData } from "@/data/stats";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — SAPAMS" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { currentUser, projectsForCurrent, notifications, userById } = useApp();
  const projects = projectsForCurrent();

  const stats = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const pending = projects.filter((p) => p.status !== "Completed").length;
    const avg = total
      ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / total)
      : 0;
    return { total, completed, pending, avg };
  }, [projects]);

  const myNotifs = currentUser
    ? notifications.filter((n) => n.userId === currentUser.id)
    : [];

  return (
    <DashboardLayout role="student" title="Dashboard">
      <PageTransition>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {currentUser?.name?.split(" ")[0] ?? "there"} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening with your academic profile today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/student/achievements">
                <Sparkles className="mr-2 h-4 w-4" />
                New Achievement
              </Link>
            </Button>
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to="/student/projects">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Projects" value={stats.total} icon="FolderKanban" color="chart-1" index={0} />
          <StatCard label="Completed" value={stats.completed} icon="Trophy" color="chart-2" index={1} />
          <StatCard label="In Progress" value={stats.pending} icon="Clock" color="chart-3" index={2} />
          <StatCard
            label="Avg Progress"
            value={stats.avg}
            suffix="%"
            icon="TrendingUp"
            color="chart-5"
            index={3}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2"
          >
            <div className="mb-4">
              <h3 className="font-semibold">Submission Activity</h3>
              <p className="text-xs text-muted-foreground">Projects vs Achievements</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlySubmissions}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Area type="monotone" dataKey="projects" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="achievements" stroke="var(--color-chart-2)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border bg-card p-6 shadow-card"
          >
            <h3 className="mb-4 font-semibold">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Active Projects</h3>
              <Link to="/student/projects" className="text-xs text-primary hover:underline">
                Manage →
              </Link>
            </div>
            {projects.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                <FolderKanban className="mx-auto mb-2 h-6 w-6" />
                No projects yet.{" "}
                <Link to="/student/projects" className="text-primary hover:underline">
                  Create your first one
                </Link>
                .
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="rounded-lg border p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Guide: {userById(p.guideId)?.name ?? "—"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          p.status === "Completed"
                            ? "border-success/30 bg-success/10 text-success"
                            : p.status === "In Progress"
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-warning/30 bg-warning/10 text-warning"
                        }
                      >
                        {p.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <Progress value={p.progress} className="h-1.5 flex-1" />
                      <span className="text-xs font-semibold">{p.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border bg-card p-6 shadow-card"
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Bell className="h-4 w-4" /> Notifications
            </h3>
            {myNotifs.length === 0 ? (
              <p className="text-sm text-muted-foreground">You're all caught up.</p>
            ) : (
              <div className="space-y-2">
                {myNotifs.slice(0, 6).map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-lg border p-3 text-sm ${n.read ? "opacity-60" : "bg-primary/5"}`}
                  >
                    <p>{n.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(n.at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
