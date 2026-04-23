import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
export const Route = createFileRoute("/maintenance")({ head: () => ({ meta: [{ title: "Maintenance — SAPAMS" }] }), component: () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
    <div className="absolute inset-0 -z-10 gradient-hero opacity-20"/>
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="text-center max-w-md">
      <motion.div animate={{rotate:[0,15,-15,0]}} transition={{repeat:Infinity,duration:3}} className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl gradient-primary text-primary-foreground shadow-glow"><Wrench className="h-12 w-12"/></motion.div>
      <h1 className="mt-6 text-3xl font-bold">We're tuning things up</h1>
      <p className="mt-2 text-muted-foreground">SAPAMS will be back shortly. Thanks for your patience.</p>
    </motion.div>
  </div>
)});
