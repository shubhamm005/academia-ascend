import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
const tickets = [{id:"#4821",t:"Cannot upload PDF over 50MB",s:"Open"},{id:"#4810",t:"Dark mode flicker on Safari",s:"In Progress"},{id:"#4795",t:"Achievement not showing",s:"Resolved"}];
export const Route = createFileRoute("/support")({ head: () => ({ meta: [{ title: "Support — SAPAMS" }] }), component: () => (
  <SimplePage title="Support Tickets" subtitle="Open a new ticket or track an existing one.">
    <div className="grid gap-8 md:grid-cols-2">
      <form onSubmit={(e)=>{e.preventDefault();toast.success("Ticket created! ID: #4822");}} className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
        <h3 className="font-semibold">New ticket</h3>
        <div><Label>Subject</Label><Input className="mt-1" required /></div>
        <div><Label>Description</Label><Textarea rows={4} className="mt-1" required /></div>
        <Button className="w-full gradient-primary text-primary-foreground">Submit ticket</Button>
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold">Recent tickets</h3>
        {tickets.map(t=>(<div key={t.id} className="flex items-center justify-between rounded-xl border bg-card p-4"><div><p className="font-medium">{t.t}</p><p className="text-xs text-muted-foreground">{t.id}</p></div><Badge variant={t.s==="Resolved"?"secondary":"outline"}>{t.s}</Badge></div>))}
      </div>
    </div>
  </SimplePage>
)});
