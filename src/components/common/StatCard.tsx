import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

type Props = { label: string; value: number; suffix?: string; change?: string; icon: string; color?: string; index?: number };

export function StatCard({ label, value, suffix, change, icon, color = "chart-1", index = 0 }: Props) {
  const Icon = (Icons as any)[icon] ?? Icons.Activity;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-shadow hover:shadow-elegant"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20" style={{ background: `var(--color-${color})` }} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            <AnimatedCounter value={value} suffix={suffix} />
          </p>
          {change && <p className="mt-1 text-xs text-success">{change}</p>}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, var(--color-${color}) 15%, transparent)`, color: `var(--color-${color})` }}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
