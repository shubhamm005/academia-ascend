import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
import { BookOpen, MessageSquare, LifeBuoy, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export const Route = createFileRoute("/help")({ head: () => ({ meta: [{ title: "Help Center — SAPAMS" }] }), component: () => (
  <SimplePage title="Help Center" subtitle="Find answers, guides and ways to reach support.">
    <div className="relative max-w-xl"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search articles…" /></div>
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {[{i:BookOpen,t:"Documentation",d:"Detailed guides for every feature.",to:"/docs"},{i:MessageSquare,t:"Live Chat",d:"Talk to a real human.",to:"/messages"},{i:LifeBuoy,t:"Support Tickets",d:"Track your open issues.",to:"/support"}].map(c => (
        <Link key={c.t} to={c.to as any} className="group rounded-2xl border bg-card p-6 shadow-card transition hover:shadow-elegant"><div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><c.i className="h-5 w-5" /></div><h3 className="mt-4 font-semibold">{c.t}</h3><p className="mt-1 text-sm text-muted-foreground">{c.d}</p></Link>
      ))}
    </div>
  </SimplePage>
)});
