import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Save, Send, X, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/student/projects")({
  head: () => ({ meta: [{ title: "Submit Project — SAPAMS" }] }),
  component: ProjectSubmit,
});

const STEPS = ["Details", "Tech & Guide", "Files", "Review"];

function ProjectSubmit() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>(["React"]);
  const [tagInput, setTagInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles(prev => [...prev, ...accepted]);
    toast.success(`${accepted.length} file(s) added`);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addTag = () => { if (tagInput.trim()) { setTags([...tags, tagInput.trim()]); setTagInput(""); } };

  return (
    <DashboardLayout role="student" title="Submit Project">
      <PageTransition>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">New Project Submission</h1>
            <p className="text-sm text-muted-foreground">Auto-saves every change.  <span className="ml-2 inline-flex items-center gap-1 text-xs text-success"><Check className="h-3 w-3" /> Draft saved 2s ago</span></p>
          </div>

          {/* Stepper */}
          <div className="mb-8 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${i <= step ? "gradient-primary border-transparent text-primary-foreground" : "bg-card text-muted-foreground"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden text-sm font-medium md:inline ${i === step ? "" : "text-muted-foreground"}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <div><Label>Project Title *</Label><Input className="mt-1" placeholder="e.g. AI Chatbot for Campus Support" /></div>
                <div><Label>Abstract *</Label><Textarea rows={3} className="mt-1" placeholder="Brief 2-3 sentence summary…" /></div>
                <div><Label>Description *</Label><Textarea rows={6} className="mt-1" placeholder="Full project description…" /></div>
                <div><Label>Submission Deadline</Label><Input type="date" className="mt-1" /></div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label>Faculty Guide *</Label>
                  <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select a guide…" /></SelectTrigger>
                    <SelectContent>
                      {["Dr. Mehta", "Prof. Kapoor", "Dr. Rao", "Prof. Khan", "Prof. Shah"].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Technology Tags</Label>
                  <div className="mt-1 flex flex-wrap gap-2 rounded-lg border bg-background p-3">
                    {tags.map(t => (
                      <Badge key={t} variant="secondary" className="gap-1">{t}<button onClick={() => setTags(tags.filter(x => x !== t))}><X className="h-3 w-3" /></button></Badge>
                    ))}
                    <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag and press Enter" className="flex-1 bg-transparent text-sm outline-none" />
                  </div>
                </div>
                <div>
                  <Label>Project Type</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                    {["Capstone", "Mini", "Research", "Internship"].map(t => (
                      <button key={t} className="rounded-lg border bg-background p-3 text-sm hover:border-primary hover:bg-primary/5">{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div {...getRootProps()} className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition ${isDragActive ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-accent/30"}`}>
                  <input {...getInputProps()} />
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">Drop your files here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">PDF, PPT, ZIP up to 100MB</p>
                </div>
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((f, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-lg border p-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{f.name}</p><p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</p></div>
                        <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))}><X className="h-4 w-4 text-muted-foreground" /></button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Status Tracker</h3>
                <div className="space-y-3">
                  {[
                    { label: "Submitted", done: true },
                    { label: "Under Faculty Review", done: true, current: false },
                    { label: "Approval", done: false, current: true },
                    { label: "Final Verification", done: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${s.done ? "bg-success text-success-foreground" : s.current ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {s.done ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <span className={s.current ? "font-medium" : "text-muted-foreground"}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => toast.success("Draft saved")}><Save className="mr-2 h-4 w-4" />Save Draft</Button>
                {step < STEPS.length - 1 ? (
                  <Button onClick={() => setStep(step + 1)} className="gradient-primary text-primary-foreground">Next</Button>
                ) : (
                  <Button onClick={() => toast.success("Project submitted for review!")} className="gradient-primary text-primary-foreground"><Send className="mr-2 h-4 w-4" />Submit</Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
