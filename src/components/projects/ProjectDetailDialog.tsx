import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApp, type Project } from "@/context/AppContext";

export function ProjectDetailDialog({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { currentUser, userById, addFeedback } = useApp();
  const [feedbackText, setFeedbackText] = useState("");

  if (!project) return null;
  const guide = userById(project.guideId);
  const owner = userById(project.ownerId);
  const canFeedback = currentUser?.role === "teacher" || currentUser?.role === "admin";

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            Owner: {owner?.name} • Guide: {guide?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-sm">{project.description || "No description."}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Overall progress</span>
              <span className="font-semibold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Milestones</h4>
            <div className="space-y-2">
              {project.milestones.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${m.completed ? "bg-success" : "bg-muted-foreground/40"}`} />
                    <span className={m.completed ? "" : "text-muted-foreground"}>{m.name}</span>
                    {m.approvedBy && <Badge variant="outline" className="border-success/30 text-success">Approved</Badge>}
                  </div>
                  {m.completedAt && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(m.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Feedback</h4>
            {project.feedback.length === 0 && (
              <p className="text-xs text-muted-foreground">No feedback yet.</p>
            )}
            <div className="space-y-2">
              {project.feedback.map((f) => (
                <div key={f.id} className="rounded-lg border bg-muted/30 p-3 text-sm">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{userById(f.from)?.name ?? "Someone"}</span>
                    <span>{new Date(f.at).toLocaleString()}</span>
                  </div>
                  <p className="mt-1">{f.text}</p>
                </div>
              ))}
            </div>

            {canFeedback && (
              <div className="mt-3 flex gap-2">
                <Textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Leave feedback for the student…"
                  rows={2}
                />
                <Button
                  className="gradient-primary text-primary-foreground"
                  onClick={() => {
                    if (!feedbackText.trim()) return toast.error("Type some feedback first");
                    addFeedback(project.id, feedbackText);
                    toast.success("Feedback sent");
                    setFeedbackText("");
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Timeline</h4>
            <ol className="relative space-y-3 border-l pl-4">
              {project.timeline.slice(0, 12).map((t, i) => (
                <motion.li
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="relative"
                >
                  <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm">{t.text}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.at).toLocaleString()}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
