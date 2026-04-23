import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export const Route = createFileRoute("/coming-soon")({ head: () => ({ meta: [{ title: "Coming Soon — SAPAMS" }] }), component: () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
    <div className="absolute inset-0 -z-10 gradient-hero opacity-20"/>
    <div className="absolute -top-40 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-glow opacity-30 blur-3xl animate-float"/>
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center max-w-md">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs backdrop-blur"><Sparkles className="h-3 w-3 text-primary"/>Launching soon</div>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">Something <span className="text-gradient">amazing</span> is coming</h1>
      <p className="mt-3 text-muted-foreground">Be the first to know when we launch.</p>
      <form onSubmit={(e)=>{e.preventDefault();toast.success("You're on the list!");}} className="mt-6 flex gap-2"><Input type="email" placeholder="you@university.edu" required/><Button className="gradient-primary text-primary-foreground">Notify me</Button></form>
    </motion.div>
  </div>
)});
