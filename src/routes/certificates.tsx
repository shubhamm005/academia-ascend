import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { certificates } from "@/data/achievements";
export const Route = createFileRoute("/certificates")({ head: () => ({ meta: [{ title: "Certificates — SAPAMS" }] }), component: () => (
  <DashboardLayout role="student" title="Certificates">
    <PageTransition>
      <h1 className="text-2xl font-bold">My Certificates Gallery</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c,i)=>(
          <motion.div key={c.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} whileHover={{y:-4}} className="group overflow-hidden rounded-2xl border bg-card shadow-card">
            <div className="relative h-40 gradient-hero"><Award className="absolute inset-0 m-auto h-16 w-16 text-primary-foreground/40" /></div>
            <div className="p-5"><p className="font-semibold">{c.title}</p><p className="text-xs text-muted-foreground">{c.issuer} • {c.date}</p>
              <button className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"><Download className="h-3 w-3"/>Download</button></div>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  </DashboardLayout>
)});
