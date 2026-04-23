import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { internships } from "@/data/events";
export const Route = createFileRoute("/internships")({ head: () => ({ meta: [{ title: "Internships — SAPAMS" }] }), component: () => (
  <DashboardLayout role="student" title="Internships">
    <PageTransition>
      <h1 className="text-2xl font-bold">Internship Opportunities 💼</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {internships.map((j,i)=>(<motion.div key={j.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} whileHover={{y:-4}} className="rounded-2xl border bg-card p-5 shadow-card transition hover:shadow-elegant">
          <div className="flex items-start justify-between"><div><p className="font-semibold">{j.role}</p><p className="text-sm text-muted-foreground">{j.company}</p></div><Badge variant="secondary">{j.type}</Badge></div>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{j.location}</span><span className="flex items-center gap-1"><Briefcase className="h-3 w-3"/>{j.stipend}</span></div>
          <div className="mt-3 flex flex-wrap gap-1">{j.tags.map(t=><Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}</div>
          <Button className="mt-4 w-full gradient-primary text-primary-foreground">Apply now</Button>
        </motion.div>))}
      </div>
    </PageTransition>
  </DashboardLayout>
)});
