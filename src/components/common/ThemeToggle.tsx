import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle, transitioning, origin } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <button
        aria-label="Toggle theme"
        onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
        className="relative inline-flex h-8 w-14 items-center rounded-full border bg-secondary transition-colors hover:bg-accent"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-md ${isDark ? "ml-7" : "ml-1"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <Moon className="h-3.5 w-3.5 text-primary" />
              </motion.span>
            ) : (
              <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Sun className="h-3.5 w-3.5 text-warning" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </button>

      <AnimatePresence>
        {transitioning && origin && (
          <motion.div
            initial={{ clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(160% at ${origin.x}px ${origin.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="theme-sweep"
            style={{ background: isDark ? "oklch(0.99 0.005 250)" : "oklch(0.18 0.04 260)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
