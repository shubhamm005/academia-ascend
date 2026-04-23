import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { APP } from "@/data/app";
export const Route = createFileRoute("/contact")({ head: () => ({ meta: [{ title: "Contact — SAPAMS" }] }), component: () => (
  <SimplePage title="Contact us" subtitle="We'd love to hear from you. We respond within 24 hours.">
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        {[{i:Mail,l:"Email",v:APP.email},{i:Phone,l:"Phone",v:APP.phone},{i:MapPin,l:"Address",v:APP.address}].map(c => (
          <div key={c.l} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-card"><div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary text-primary-foreground"><c.i className="h-4 w-4" /></div><div><p className="text-xs text-muted-foreground">{c.l}</p><p className="font-medium">{c.v}</p></div></div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); }} className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
        <div><Label>Name</Label><Input className="mt-1" required /></div>
        <div><Label>Email</Label><Input className="mt-1" type="email" required /></div>
        <div><Label>Message</Label><Textarea className="mt-1" rows={5} required /></div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground">Send message</Button>
      </form>
    </div>
  </SimplePage>
)});
