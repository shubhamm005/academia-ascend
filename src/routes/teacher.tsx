import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, ClipboardCheck, BadgeCheck, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { PageTransition } from "@/components/common/PageTransition";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailDialog } from "@/components/projects/ProjectDetailDialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useApp, type Project } from "@/context/AppContext";

export const Route = createFileRoute("/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — SAPAMS" }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const { currentUser, projects, projectsForCurrent, users } = useApp();
  const [detail, setDetail] = useState<Project | null>(null);

  const myProjects = projectsForCurrent();
  const studentIds = useMemo(() => new Set(myProjects.map((p) => p.ownerId)), [myProjects]);
  const students = users.filter((u) => studentIds.has(u.id));

  const pending = myProjects.filter((p) => p.status !== "Completed");
  const verified = myProjects.reduce(
    (acc, p) => acc + p.milestones.filter((m) => m.approvedBy === currentUser?.id).length,
    0,
  );
  const avgScore = myProjects.length
    ? Math.round(myProjects.reduce((a, p) => a + p.progress, 0) / myProjects.length)
    : 0;

  const chartData = useMemo(() => {
    // synthetic weekly trend from project progress sample
    return [0, 1, 2, 3, 4, 5, 6, 7].map((w) => ({
      week: `W${w + 1}`,
      score: Math.max(50, Math.min(100, avgScore - 12 + w * 2 + ((projects.length + w) % 5))),
    }));
  }, [avgScore, projects.length]);

  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <PageTransition>
        <h1 className="mb-1 text-2xl font-bold">
          Good morning, {currentUser?.name ?? "Teacher"} 👋
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {pending.length} project{pending.length === 1 ? "" : "s"} awaiting your input.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Assigned Students" value={students.length} icon="Users" color="chart-1" index={0} />
          <StatCard
            label="Active Projects"
            value={pending.length}
            icon="ClipboardCheck"
            color="chart-3"
            index={1}
          />
          <StatCard
            label="Milestones Approved"
            value={verified}
            icon="BadgeCheck"
            color="chart-2"
            index={2}
          />
          <StatCard
            label="Avg Class Score"
            value={avgScore}
            suffix="%"
            icon="TrendingUp"
            color="chart-5"
            index={3}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Projects to review</h3>
              <Badge variant="secondary">{pending.length} open</Badge>
            </div>
            {pending.length === 0 ? (
              <div className="rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground">
                Nothing to review — all caught up. 🎉
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pending.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    index={i}
                    onOpen={(proj) => setDetail(proj)}
                    canEdit={false}
                    canDelete={false}
                    canApprove={true}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6 shadow-card"
          >
            <h3 className="mb-4 font-semibold">Class Performance</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="score" stroke="var(--color-chart-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>

            <h4 className="mt-6 mb-2 text-sm font-semibold">Your students</h4>
            <ul className="space-y-1.5 text-sm">
              {students.length === 0 && (
                <li className="text-xs text-muted-foreground">No students assigned yet.</li>
              )}
              {students.map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <span>{s.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {myProjects.filter((p) => p.ownerId === s.id).length} projects
                  </Badge>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <ProjectDetailDialog project={detail} onOpenChange={(o) => !o && setDetail(null)} />
      </PageTransition>
    </DashboardLayout>
  );
}

// silence unused-import warning when icons are referenced via lucide name
void Users; void ClipboardCheck; void BadgeCheck; void TrendingUp;
