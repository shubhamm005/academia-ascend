import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { teacherStats, performanceData } from "@/data/stats";
import { projects } from "@/data/projects";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — SAPAMS" }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const [open, setOpen] = useState<typeof projects[0] | null>(null);
  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <PageTransition>
        <h1 className="mb-1 text-2xl font-bold">Good morning, Dr. Mehta 👋</h1>
        <p className="mb-6 text-sm text-muted-foreground">12 reviews waiting for you today.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teacherStats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2">
            <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Pending Approvals</h3><Badge variant="secondary">{projects.filter(p => p.status === "Pending" || p.status === "In Review").length} open</Badge></div>
            <div className="space-y-2">
              {projects.filter(p => p.status === "Pending" || p.status === "In Review").map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex flex-wrap items-center gap-3 rounded-lg border p-3 hover:bg-accent">
                  <div className="min-w-0 flex-1"><p className="font-medium">{p.title}</p><p className="text-xs text-muted-foreground">{p.id} • Submitted {p.date}</p></div>
                  <Button size="sm" variant="ghost" onClick={() => setOpen(p)}><Eye className="mr-1 h-4 w-4" />Review</Button>
                  <Button size="sm" variant="outline" className="text-success" onClick={() => toast.success("Approved")}><Check className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.error("Rejected")}><X className="h-4 w-4" /></Button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Class Performance</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="score" stroke="var(--color-chart-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{open?.title}</DialogTitle>
              <DialogDescription>{open?.id} • {open?.date}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3"><p className="text-sm">A premium project submission with detailed abstract, files and tags. Use the actions below to approve or reject.</p>
              <div className="flex flex-wrap gap-2">{open?.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
              <div className="flex justify-end gap-2 pt-3"><Button variant="outline" onClick={() => { toast.error("Rejected"); setOpen(null); }}>Reject</Button><Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Approved"); setOpen(null); }}>Approve</Button></div>
            </div>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </DashboardLayout>
  );
}
