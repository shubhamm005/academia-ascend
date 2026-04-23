import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { PageTransition } from "@/components/common/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { monthlySubmissions } from "@/data/stats";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — SAPAMS" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { users, projects } = useApp();
  const [filter, setFilter] = useState<"all" | "Pending" | "In Progress" | "Completed">("all");
  const [query, setQuery] = useState("");

  const studentCount = users.filter((u) => u.role === "student").length;
  const teacherCount = users.filter((u) => u.role === "teacher").length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const active = projects.filter((p) => p.status !== "Completed").length;
  const avgCompletion = projects.length
    ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length)
    : 0;
  const approvalRate = projects.length
    ? Math.round((completed / projects.length) * 100)
    : 0;

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [projects, filter, query]);

  const filteredUsers = useMemo(() => {
    if (!query) return users;
    return users.filter((u) =>
      `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [users, query]);

  return (
    <DashboardLayout role="admin" title="Admin Overview">
      <PageTransition>
        <h1 className="mb-1 text-2xl font-bold">Platform Overview</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Live stats across the institution. Numbers update as data changes.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Students" value={studentCount} icon="Users" color="chart-1" index={0} />
          <StatCard label="Faculty Members" value={teacherCount} icon="GraduationCap" color="chart-2" index={1} />
          <StatCard label="Active Projects" value={active} icon="FolderKanban" color="chart-3" index={2} />
          <StatCard
            label="Avg Completion"
            value={avgCompletion}
            suffix="%"
            icon="TrendingUp"
            color="chart-5"
            index={3}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2"
          >
            <h3 className="mb-4 font-semibold">Monthly Submissions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySubmissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="projects" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="achievements" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-6 shadow-card"
          >
            <h3 className="mb-4 font-semibold">Approval Rate</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                innerRadius="60%"
                outerRadius="100%"
                data={[{ name: "Approved", value: approvalRate, fill: "var(--color-chart-2)" }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-center text-3xl font-bold text-gradient">{approvalRate}%</p>
            <p className="text-center text-xs text-muted-foreground">
              {completed} of {projects.length} completed
            </p>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6 shadow-card"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">All Projects</h3>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="In Progress">Active</TabsTrigger>
                  <TabsTrigger value="Completed">Done</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="pl-9" />
            </div>
            <div className="max-h-[360px] space-y-2 overflow-y-auto">
              {filteredProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.progress}% • {p.milestones.filter((m) => m.completed).length}/{p.milestones.length} milestones</p>
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
              ))}
              {filteredProjects.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">No projects match.</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border bg-card p-6 shadow-card"
          >
            <h3 className="mb-4 font-semibold">Users ({filteredUsers.length})</h3>
            <div className="max-h-[420px] space-y-2 overflow-y-auto">
              {filteredUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
                      {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {u.role}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
