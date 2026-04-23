import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, FolderKanban } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFormDialog } from "@/components/projects/ProjectFormDialog";
import { ProjectDetailDialog } from "@/components/projects/ProjectDetailDialog";
import { useApp, type Project, type ProjectStatus } from "@/context/AppContext";

export const Route = createFileRoute("/student/projects")({
  head: () => ({ meta: [{ title: "My Projects — SAPAMS" }] }),
  component: StudentProjectsPage,
  validateSearch: (search: Record<string, unknown>): { new?: "1" } => {
    const v = search.new;
    return v === "1" || v === 1 ? { new: "1" } : {};
  },
});

function StudentProjectsPage() {
  const { projectsForCurrent, currentUser } = useApp();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [detail, setDetail] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");

  // Auto-open create dialog when navigated with ?new=1
  useEffect(() => {
    if (search.new === "1") {
      setEditing(null);
      setOpen(true);
      navigate({ search: {} as any, replace: true });
    }
  }, [search.new, navigate]);

  const all = projectsForCurrent();
  const filtered = useMemo(() => {
    return all.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (query && !`${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [all, filter, query]);

  const role = currentUser?.role ?? "student";

  return (
    <DashboardLayout role={role === "admin" ? "admin" : role === "teacher" ? "teacher" : "student"} title="Projects">
      <PageTransition>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
            <p className="text-sm text-muted-foreground">
              {all.length} total • {all.filter((p) => p.status === "Completed").length} completed
            </p>
          </div>
          <Button
            className="gradient-primary text-primary-foreground shadow-elegant"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tags…"
              className="pl-9"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Pending">Pending</TabsTrigger>
              <TabsTrigger value="In Progress">In Progress</TabsTrigger>
              <TabsTrigger value="Completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-card/40 p-16 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-primary-foreground">
              <FolderKanban className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold">No projects yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Create your first project to start tracking milestones, progress and feedback.
            </p>
            <Button
              className="mt-6 gradient-primary text-primary-foreground"
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Create project
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onEdit={(proj) => {
                  setEditing(proj);
                  setOpen(true);
                }}
                onOpen={(proj) => setDetail(proj)}
              />
            ))}
          </div>
        )}

        <ProjectFormDialog open={open} onOpenChange={setOpen} editing={editing} />
        <ProjectDetailDialog project={detail} onOpenChange={(o) => !o && setDetail(null)} />
      </PageTransition>
    </DashboardLayout>
  );
}
