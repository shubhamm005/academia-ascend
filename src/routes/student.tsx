import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Sparkles,
  Bell,
  FolderKanban,
  Minus,
  CheckCircle2,
  Circle,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — SAPAMS" }] }),
  component: StudentDashboard,
});

const FOCUS_KEY = "sapams-focus-project-v1";

function StudentDashboard() {
  const {
    currentUser,
    projectsForCurrent,
    notifications,
    userById,
    bumpProgress,
    toggleMilestone,
  } = useApp();
  const projects = projectsForCurrent();

  // Pick a "focus project" that the student is actively tracking.
  const [focusId, setFocusId] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      typeof localStorage !== "undefined" ? localStorage.getItem(FOCUS_KEY) : null;
    const exists = stored && projects.some((p) => p.id === stored);
    if (exists) setFocusId(stored);
    else if (projects.length) {
      // default to the most recently updated, not-yet-completed project
      const next =
        [...projects]
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .find((p) => p.status !== "Completed") ?? projects[0];
      setFocusId(next.id);
    } else {
      setFocusId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  useEffect(() => {
    if (focusId && typeof localStorage !== "undefined") {
      localStorage.setItem(FOCUS_KEY, focusId);
    }
  }, [focusId]);

  const focus = useMemo(
    () => projects.find((p) => p.id === focusId) ?? null,
    [projects, focusId],
  );

  const myNotifs = currentUser
    ? notifications.filter((n) => n.userId === currentUser.id)
    : [];

  const completedMilestones = focus
    ? focus.milestones.filter((m) => m.completed).length
    : 0;
  const totalMilestones = focus?.milestones.length ?? 0;
  const nextMilestone = focus?.milestones.find((m) => !m.completed);

  return (
    <DashboardLayout role="student" title="Dashboard">
      <PageTransition>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {currentUser?.name?.split(" ")[0] ?? "there"} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Track and update the performance of the project you're focused on.
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
              <Link to="/student/projects" search={{ new: "1" }}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Empty state */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-card/40 p-16 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-primary-foreground">
              <FolderKanban className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold">No project to track yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Create your first project and we'll help you track its milestones,
              progress and feedback right here.
            </p>
            <Button
              asChild
              className="mt-6 gradient-primary text-primary-foreground"
            >
              <Link to="/student/projects" search={{ new: "1" }}>
                <Plus className="mr-2 h-4 w-4" /> Create your first project
              </Link>
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Focus selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-4 shadow-card"
            >
              <Target className="h-5 w-5 text-primary" />
              <div className="mr-auto">
                <p className="text-sm font-semibold">Currently tracking</p>
                <p className="text-xs text-muted-foreground">
                  Switch the project you want to focus on right now.
                </p>
              </div>
              <Select
                value={focusId ?? undefined}
                onValueChange={(v) => setFocusId(v)}
              >
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Pick a project to track" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <AnimatePresence mode="wait">
              {focus && (
                <motion.div
                  key={focus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6 lg:grid-cols-3"
                >
                  {/* Performance card */}
                  <div className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Project performance
                        </p>
                        <h2 className="mt-1 text-xl font-bold">{focus.title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Guide: {userById(focus.guideId)?.name ?? "—"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          focus.status === "Completed"
                            ? "border-success/30 bg-success/10 text-success"
                            : focus.status === "In Progress"
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-warning/30 bg-warning/10 text-warning"
                        }
                      >
                        {focus.status}
                      </Badge>
                    </div>

                    {/* Big progress ring */}
                    <div className="mb-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                      <ProgressRing value={focus.progress} />
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold tabular-nums">
                            {focus.progress}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            complete
                          </span>
                        </div>
                        <Progress value={focus.progress} className="mt-3 h-2" />
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              bumpProgress(focus.id, -10);
                              toast.success("Progress decreased by 10%");
                            }}
                            disabled={focus.progress <= 0}
                          >
                            <Minus className="mr-1 h-4 w-4" /> 10%
                          </Button>
                          <Button
                            size="sm"
                            className="gradient-primary text-primary-foreground"
                            onClick={() => {
                              bumpProgress(focus.id, 10);
                              toast.success("Progress increased by 10%");
                            }}
                            disabled={focus.progress >= 100}
                          >
                            <Plus className="mr-1 h-4 w-4" /> 10%
                          </Button>
                          <Button asChild size="sm" variant="ghost">
                            <Link to="/student/projects">Open full view →</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Milestone tracker */}
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Milestones</h3>
                        <span className="text-xs text-muted-foreground">
                          {completedMilestones} of {totalMilestones} done
                        </span>
                      </div>
                      <div className="space-y-2">
                        {focus.milestones.map((m, i) => (
                          <motion.button
                            key={m.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            whileHover={{ x: 2 }}
                            onClick={() => {
                              toggleMilestone(focus.id, m.id);
                              toast.success(
                                m.completed
                                  ? `Milestone "${m.name}" reopened`
                                  : `Milestone "${m.name}" completed 🎉`,
                              );
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition ${
                              m.completed
                                ? "border-success/30 bg-success/5"
                                : "hover:bg-accent"
                            }`}
                          >
                            {m.completed ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                            ) : (
                              <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                            )}
                            <span
                              className={
                                m.completed
                                  ? "font-medium"
                                  : "text-muted-foreground"
                              }
                            >
                              {m.name}
                            </span>
                            {m.approvedBy && (
                              <Badge
                                variant="outline"
                                className="ml-auto border-success/30 text-success"
                              >
                                Approved
                              </Badge>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Side column: next-up + notifications */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-2xl border bg-card p-6 shadow-card"
                    >
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <TrendingUp className="h-4 w-4 text-primary" /> Up next
                      </h3>
                      {nextMilestone ? (
                        <div>
                          <p className="text-lg font-semibold">
                            {nextMilestone.name}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Complete this milestone to move your project forward.
                          </p>
                          <Button
                            size="sm"
                            className="mt-4 w-full gradient-primary text-primary-foreground"
                            onClick={() => {
                              toggleMilestone(focus.id, nextMilestone.id);
                              toast.success(
                                `Milestone "${nextMilestone.name}" completed 🎉`,
                              );
                            }}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark complete
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-success" />
                          <p className="text-sm font-semibold">
                            All milestones done!
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Great work — your project is fully tracked.
                          </p>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="rounded-2xl border bg-card p-6 shadow-card"
                    >
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <Clock className="h-4 w-4" /> Recent activity
                      </h3>
                      <ol className="relative space-y-3 border-l pl-4">
                        {focus.timeline.slice(0, 5).map((t) => (
                          <li key={t.id} className="relative">
                            <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                            <p className="text-sm">{t.text}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(t.at).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-2xl border bg-card p-6 shadow-card"
                    >
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <Bell className="h-4 w-4" /> Notifications
                      </h3>
                      {myNotifs.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          You're all caught up.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {myNotifs.slice(0, 4).map((n) => (
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
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </PageTransition>
    </DashboardLayout>
  );
}

function ProgressRing({ value }: { value: number }) {
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-muted)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums">{value}%</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          progress
        </span>
      </div>
    </div>
  );
}
