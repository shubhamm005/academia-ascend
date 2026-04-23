import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp, type Project } from "@/context/AppContext";

export function ProjectFormDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Project | null;
}) {
  const { users, createProject, updateProject } = useApp();
  const teachers = users.filter((u) => u.role === "teacher");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [guideId, setGuideId] = useState<string>(teachers[0]?.id ?? "");

  useEffect(() => {
    if (open) {
      setTitle(editing?.title ?? "");
      setDescription(editing?.description ?? "");
      setTags(editing?.tags ?? []);
      setGuideId(editing?.guideId ?? teachers[0]?.id ?? "");
      setTagInput("");
    }
  }, [open, editing, teachers]);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (!tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  const submit = () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!guideId) return toast.error("Please pick a faculty guide");
    if (editing) {
      updateProject(editing.id, { title: title.trim(), description: description.trim(), tags, guideId });
      toast.success("Project updated");
    } else {
      createProject({ title: title.trim(), description: description.trim(), tags, guideId });
      toast.success("Project created");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit project" : "Create new project"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update the details below." : "Fill in the details to start tracking."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="p-title">Title *</Label>
            <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="AI-powered Tutor" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="p-desc">Description</Label>
            <Textarea id="p-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of the project" className="mt-1" />
          </div>
          <div>
            <Label>Faculty Guide *</Label>
            <Select value={guideId} onValueChange={setGuideId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a guide…" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tags</Label>
            <div className="mt-1 flex flex-wrap gap-2 rounded-lg border bg-background p-3">
              {tags.map((t) => (
                <Badge key={t} variant="secondary" className="gap-1">
                  {t}
                  <button onClick={() => setTags(tags.filter((x) => x !== t))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Type and press Enter"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gradient-primary text-primary-foreground" onClick={submit}>
            {editing ? "Save changes" : "Create project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
