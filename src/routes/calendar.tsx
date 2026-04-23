import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { events } from "@/data/events";
import { Badge } from "@/components/ui/badge";
export const Route = createFileRoute("/calendar")({ head: () => ({ meta: [{ title: "Calendar — SAPAMS" }] }), component: () => {
  const today = new Date(); const year = today.getFullYear(); const month = today.getMonth();
  const first = new Date(year, month, 1).getDay(); const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({length: first + days}, (_,i) => i < first ? null : i - first + 1);
  const eventDays = new Set(events.map(e => parseInt(e.date.slice(8))));
  return (
  <DashboardLayout role="student" title="Calendar">
    <PageTransition>
      <h1 className="text-2xl font-bold">{today.toLocaleString("default",{month:"long"})} {year}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-card lg:col-span-2">
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">{["S","M","T","W","T","F","S"].map(d=><div key={d} className="p-2">{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1">{cells.map((d,i)=>(<div key={i} className={`aspect-square rounded-lg p-2 text-sm ${d?"border bg-background hover:bg-accent":""} ${d===today.getDate()?"gradient-primary text-primary-foreground border-transparent":""} ${d && eventDays.has(d)?"ring-2 ring-primary/40":""}`}>{d ?? ""}</div>))}</div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-3">This month</h3>
          <div className="space-y-2">{events.map(e=>(<div key={e.id} className="rounded-lg border p-3"><p className="text-sm font-medium">{e.title}</p><div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">{e.date}<Badge variant="secondary" className="text-[10px]">{e.type}</Badge></div></div>))}</div>
        </div>
      </div>
    </PageTransition>
  </DashboardLayout>
)}});
