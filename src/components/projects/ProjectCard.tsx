import { motion } from "framer-motion";
import { Plus, Minus, Pencil, Trash2, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useApp, type Project } from "@/context/AppContext";

const statusColors: Record<Project["status"], string> = {
  Pending: "bg-warning/15 text-warning border-warning/30",
  "In Progress": "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
};

export function ProjectCard({
  project,
  onEdit,
  onOpen,
  index = 0,
  canEdit = true,
  canDelete = true,
  canApprove = false,
}: {
  project: Project;
  onEdit?: (p: Project) => void;
  onOpen?: (p: Project) => void;
  index?: number;
  canEdit?: boolean;
  canDelete?: boolean;
  canApprove?: boolean;
}) {
  const { bumpProgress, deleteProject, userById, toggleMilestone, approveMilestone } = useApp();
  const guide = userById(project.guideId);
  const owner = userById(project.ownerId);
  const doneCount = project.milestones.filter((m) => m.completed).length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border bg-card p-5 shadow-card transition-shadow hover:shadow-elegant"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <button
            onClick={() => onOpen?.(project)}
            className="text-left text-base font-semibold hover:text-primary"
          >
            {project.title}
          </button>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {project.description || "No description yet."}
          </p>
        </div>
        <Badge variant="outline" className={statusColors[project.status]}>
          {project.status}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Badge key={t} variant="secondary" className="text-xs">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold text-foreground">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {project.milestones.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              if (canApprove) {
                approveMilestone(project.id, m.id);
                toast.success(`Approved "${m.name}"`);
              } else if (canEdit) {
                toggleMilestone(project.id, m.id);
                toast.success(`Milestone ${m.completed ? "reopened" : "completed"}`);
              }
            }}
            disabled={!canEdit && !canApprove}
            title={`${m.name}${m.approvedBy ? " — approved" : ""}`}
            className={`group flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px] transition ${
              m.completed
                ? "border-success/40 bg-success/10 text-success"
                : "border-border bg-background text-muted-foreground hover:border-primary"
            } ${!canEdit && !canApprove ? "cursor-default" : "cursor-pointer"}`}
          >
            {m.completed ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
            <span className="truncate">{m.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Guide: <span className="text-foreground">{guide?.name ?? "—"}</span>
        </span>
        <span>
          {doneCount}/{project.milestones.length} milestones
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
        {(canEdit || canApprove) && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                bumpProgress(project.id, -10);
                toast.success("Progress -10%");
              }}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                bumpProgress(project.id, 10);
                toast.success("Progress +10%");
              }}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
        {onOpen && (
          <Button size="sm" variant="ghost" onClick={() => onOpen(project)}>
            View
          </Button>
        )}
        {canEdit && onEdit && (
          <Button size="sm" variant="ghost" onClick={() => onEdit(project)}>
            <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
          </Button>
        )}
        {canDelete && (
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm(`Delete "${project.title}"? This cannot be undone.`)) {
                deleteProject(project.id);
                toast.success("Project deleted");
              }
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">
        {owner?.name && <>Owner: {owner.name} • </>}
        Updated {new Date(project.updatedAt).toLocaleDateString()}
      </p>
    </motion.article>
  );
}
