import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
const sections = [{t:"Getting Started",items:["Quick start","Account setup","Roles overview"]},{t:"Projects",items:["Submit a project","Drafts & autosave","Status timeline"]},{t:"Achievements",items:["Categories","Verification flow","Visibility"]},{t:"Analytics",items:["Performance score","Reports & exports","Department insights"]}];
export const Route = createFileRoute("/docs")({ head: () => ({ meta: [{ title: "Documentation — SAPAMS" }] }), component: () => (
  <SimplePage title="Documentation" subtitle="Everything you need to master SAPAMS.">
    <div className="grid gap-6 md:grid-cols-2">{sections.map(s=>(
      <div key={s.t} className="rounded-2xl border bg-card p-6 shadow-card"><h3 className="font-semibold">{s.t}</h3><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{s.items.map(i=><li key={i} className="hover:text-foreground cursor-pointer">→ {i}</li>)}</ul></div>
    ))}</div>
  </SimplePage>
)});
