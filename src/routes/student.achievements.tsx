import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { achievementCategories } from "@/data/achievements";

export const Route = createFileRoute("/student/achievements")({
  head: () => ({ meta: [{ title: "Add Achievement — SAPAMS" }] }),
  component: AchievementUpload,
});

function AchievementUpload() {
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  return (
    <DashboardLayout role="student" title="Add Achievement">
      <PageTransition>
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold">Showcase your wins 🏆</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pick a category and we'll handle the rest.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {achievementCategories.map((c, i) => {
              const Icon = (Icons as any)[c.icon] ?? Icons.Award;
              const isSel = selected === c.id;
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(c.id)}
                  className={`group rounded-2xl border bg-card p-5 text-left shadow-card transition ${isSel ? "border-primary ring-2 ring-primary/30" : ""}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, var(--color-${c.color}) 15%, transparent)`, color: `var(--color-${c.color})` }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.count} this semester</p>
                </motion.button>
              );
            })}
          </div>

          {selected && (
            <motion.form
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={(e) => { e.preventDefault(); toast.success("Achievement submitted for verification!"); }}
              className="mt-8 grid gap-5 rounded-2xl border bg-card p-6 shadow-card md:grid-cols-2"
            >
              <div className="md:col-span-2"><Label>Achievement Title *</Label><Input className="mt-1" placeholder="e.g. SIH 2024 National Winner" required /></div>
              <div><Label>Issued By *</Label><Input className="mt-1" placeholder="Organization / Authority" required /></div>
              <div><Label>Date *</Label><Input type="date" className="mt-1" required /></div>
              <div className="md:col-span-2"><Label>Description</Label><Textarea rows={4} className="mt-1" placeholder="Tell us about it…" /></div>
              <div className="md:col-span-2">
                <Label>Certificate / Proof</Label>
                <div className="mt-1 rounded-xl border-2 border-dashed p-8 text-center">
                  <Icons.Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm">Drop image, PDF or click to upload</p>
                </div>
              </div>
              <div className="md:col-span-2 flex items-center justify-between rounded-lg border p-4">
                <div><p className="text-sm font-medium">Public visibility</p><p className="text-xs text-muted-foreground">Show this on your portfolio & leaderboard</p></div>
                <Switch checked={visible} onCheckedChange={setVisible} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
                <Button type="submit" className="gradient-primary text-primary-foreground">Submit for Verification</Button>
              </div>
            </motion.form>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
