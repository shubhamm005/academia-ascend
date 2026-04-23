import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: (origin?: { x: number; y: number }) => void; transitioning: boolean; origin: { x: number; y: number } | null };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [transitioning, setTransitioning] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && (localStorage.getItem("sapams-theme") as Theme)) || "light";
    setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("sapams-theme", theme); } catch {}
  }, [theme]);

  const toggle = useCallback((o?: { x: number; y: number }) => {
    setOrigin(o ?? { x: window.innerWidth - 60, y: 60 });
    setTransitioning(true);
    setTimeout(() => {
      setTheme((t) => (t === "light" ? "dark" : "light"));
    }, 250);
    setTimeout(() => setTransitioning(false), 900);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle, transitioning, origin }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
