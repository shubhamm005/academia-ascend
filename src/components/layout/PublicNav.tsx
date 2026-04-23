import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { APP, NAV_LINKS } from "@/data/app";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 w-full border-b transition-all ${scrolled ? "glass-strong border-border" : "border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">{APP.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild><Link to="/login">Sign in</Link></Button>
          <Button asChild className="gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
            <Link to="/register">Get started</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="rounded-md border p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t bg-background md:hidden">
          <div className="flex flex-col gap-3 p-4">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="text-sm font-medium">
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1"><Link to="/login">Sign in</Link></Button>
              <Button asChild className="flex-1 gradient-primary text-primary-foreground"><Link to="/register">Get started</Link></Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
