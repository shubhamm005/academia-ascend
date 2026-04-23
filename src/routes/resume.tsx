import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
import { toast } from "sonner";
export const Route = createFileRoute("/resume")({ head: () => ({ meta: [{ title: "Resume Builder — SAPAMS" }] }), component: () => (
  <DashboardLayout role="student" title="Resume Builder">
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-semibold">Edit your resume</h2>
          <div><Label>Full Name</Label><Input className="mt-1" defaultValue="Aarav Sharma"/></div>
          <div><Label>Headline</Label><Input className="mt-1" defaultValue="CS Senior · AI Enthusiast · Hackathon Winner"/></div>
          <div><Label>Summary</Label><Textarea rows={4} className="mt-1" defaultValue="Computer Science senior passionate about building AI products that matter."/></div>
          <Button className="w-full gradient-primary text-primary-foreground" onClick={()=>toast.success("Resume PDF exported")}><Download className="mr-2 h-4 w-4"/>Export PDF</Button>
        </div>
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <h2 className="text-3xl font-bold">Aarav Sharma</h2>
          <p className="text-muted-foreground">CS Senior · AI Enthusiast · Hackathon Winner</p>
          <hr className="my-4"/>
          <h3 className="font-semibold">Summary</h3><p className="text-sm text-muted-foreground mt-1">Computer Science senior passionate about building AI products that matter.</p>
          <h3 className="mt-4 font-semibold">Highlights</h3><ul className="mt-1 text-sm text-muted-foreground space-y-1"><li>• 12 projects shipped</li><li>• 28 verified achievements</li><li>• Performance score: 92%</li></ul>
        </div>
      </div>
    </PageTransition>
  </DashboardLayout>
)});
