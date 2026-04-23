import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Badge } from "@/components/ui/badge";
import { events, announcements } from "@/data/events";
export const Route = createFileRoute("/events")({ head: () => ({ meta: [{ title: "Events — SAPAMS" }] }), component: () => (
  <DashboardLayout role="student" title="Events & Announcements">
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {events.map((e,i)=>(<motion.div key={e.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card hover:shadow-elegant transition">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl gradient-primary text-primary-foreground"><span className="text-xs">{e.date.slice(5,7)}</span><span className="text-xl font-bold">{e.date.slice(8)}</span></div>
              <div className="flex-1"><div className="flex items-center gap-2"><p className="font-semibold">{e.title}</p><Badge variant="secondary">{e.type}</Badge></div><p className="mt-1 text-xs text-muted-foreground flex items-center gap-3"><span className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{e.time}</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{e.location}</span></p></div>
            </motion.div>))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold">Announcements</h2>
          <div className="space-y-3">{announcements.map(a=>(<div key={a.id} className="rounded-xl border bg-card p-4 shadow-card"><div className="flex items-start justify-between"><p className="font-medium">{a.title}</p><Badge variant={a.priority==="high"?"destructive":"secondary"}>{a.priority}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{a.body}</p><p className="mt-2 text-xs text-muted-foreground">{a.date}</p></div>))}</div>
        </div>
      </div>
    </PageTransition>
  </DashboardLayout>
)});
