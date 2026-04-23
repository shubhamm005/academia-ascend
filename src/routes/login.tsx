import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — SAPAMS" }, { name: "description", content: "Sign in to your SAPAMS account." }] }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(`Welcome back! Signing in as ${role}…`);
      router.navigate({ to: `/${role}` as any });
    }, 700);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Brand side */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative hidden overflow-hidden gradient-hero p-12 text-primary-foreground md:flex md:flex-col md:justify-between">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-glow opacity-30 blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur"><GraduationCap className="h-5 w-5" /></div>
          <span className="text-lg font-semibold">SAPAMS</span>
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Welcome back to your academic command center.</h2>
          <p className="mt-4 max-w-md opacity-90">Track projects, verify achievements and watch your performance soar — all in one beautifully designed platform.</p>
          <div className="mt-10 flex gap-2">{[0,1,2].map(i => <div key={i} className={`h-1 rounded-full ${i === 0 ? "w-8 bg-white" : "w-4 bg-white/30"}`} />)}</div>
        </div>
        <p className="relative text-xs opacity-70">© 2025 SAPAMS. Crafted for excellence.</p>
      </motion.div>

      {/* Form side */}
      <div className="relative flex flex-col p-6 md:p-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
          <ThemeToggle />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 w-full max-w-md">
          <h1 className="text-3xl font-bold">Sign in to SAPAMS</h1>
          <p className="mt-2 text-muted-foreground">Choose your role and continue.</p>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl border bg-secondary p-1">
            {(["student","teacher","admin"] as const).map(r => (
              <button key={r} onClick={() => setRole(r)} className={`relative rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${role === r ? "text-primary-foreground" : "text-muted-foreground"}`}>
                {role === r && <motion.span layoutId="rolePill" className="absolute inset-0 rounded-lg gradient-primary" />}
                <span className="relative">{r}</span>
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@university.edu" required className="pl-9" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/login" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" required className="pl-9" />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
              {loading ? "Signing in…" : <>Continue <ArrowRight className="ml-1 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={() => toast.info("Google sign-in (demo)")}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
