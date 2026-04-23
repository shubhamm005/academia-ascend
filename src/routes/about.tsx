import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
import { motion } from "framer-motion";
export const Route = createFileRoute("/about")({ head: () => ({ meta: [{ title: "About — SAPAMS" }] }), component: () => (
  <SimplePage title="About SAPAMS" subtitle="We're on a mission to help universities celebrate every academic milestone — beautifully.">
    <div className="grid gap-6 md:grid-cols-3">
      {[{n:"120+",l:"Universities"},{n:"85k+",l:"Students"},{n:"6.2k+",l:"Achievements verified"}].map((s,i)=>(
        <motion.div key={s.l} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} className="rounded-2xl border bg-card p-6 shadow-card text-center">
          <p className="text-3xl font-bold text-gradient">{s.n}</p><p className="text-sm text-muted-foreground mt-1">{s.l}</p>
        </motion.div>
      ))}
    </div>
    <div className="mt-10 prose prose-sm max-w-none">
      <p className="text-muted-foreground">SAPAMS was born from a simple frustration: academic excellence deserved better tools. We rebuilt the experience from the ground up with modern design, real-time collaboration and analytics that actually help students grow.</p>
    </div>
  </SimplePage>
)});
