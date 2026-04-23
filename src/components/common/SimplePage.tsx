import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";

export function SimplePage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-10" />
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold md:text-5xl">{title}</motion.h1>
          {subtitle && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</motion.p>}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-8">{children}</section>
      <Footer />
    </div>
  );
}
