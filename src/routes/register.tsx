import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — SAPAMS" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const next1 = () => {
    if (!name.trim() || !email.trim()) return toast.error("Name and email are required");
    setStep(2);
  };
  const finish = () => {
    register({ name: name.trim(), email: email.trim(), role, department: department.trim() || undefined });
    toast.success("Account created! Welcome aboard.");
    router.navigate({ to: `/${role}` as any });
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative hidden overflow-hidden gradient-hero p-12 text-primary-foreground md:flex md:flex-col md:justify-between">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-glow opacity-30 blur-3xl animate-float" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur"><GraduationCap className="h-5 w-5" /></div>
          <span className="text-lg font-semibold">SAPAMS</span>
        </Link>
        <div className="relative space-y-4">
          <h2 className="text-4xl font-bold leading-tight">Begin your premium academic journey.</h2>
          <ul className="space-y-3 text-sm">
            {["Unified project & achievement tracking","Real-time analytics dashboards","Verified certificates & portfolio","Mentor collaboration & feedback"].map(t => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{t}</li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs opacity-70">© 2025 SAPAMS</p>
      </motion.div>

      <div className="flex flex-col p-6 md:p-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
          <ThemeToggle />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 w-full max-w-md">
          <div className="mb-6 flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "gradient-primary" : "bg-secondary"}`} />
            ))}
          </div>

          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Step {step} of 3</p>

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {(["student","teacher","admin"] as const).map(r => (
                  <button key={r} onClick={() => setRole(r)} className={`rounded-xl border p-4 text-sm font-medium capitalize transition ${role === r ? "border-primary bg-primary/10" : "hover:bg-accent"}`}>{r}</button>
                ))}
              </div>
              <div><Label>Full name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" placeholder="Jane Doe" /></div>
              <div><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" type="email" placeholder="you@university.edu" /></div>
              <Button onClick={next1} className="w-full gradient-primary text-primary-foreground">Continue <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-6 space-y-4">
              <div><Label>Institution</Label><Input className="mt-1" placeholder="Massachusetts Institute of Tech." /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Department</Label><Input value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1" placeholder="Computer Science" /></div>
                <div><Label>Year</Label><Input className="mt-1" placeholder="2025" /></div>
              </div>
              <div><Label>Password</Label><Input className="mt-1" type="password" placeholder="At least 8 characters" /></div>
              <div className="flex gap-2"><Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button><Button onClick={() => setStep(3)} className="flex-1 gradient-primary text-primary-foreground">Continue</Button></div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mt-6 space-y-4">
              <p className="text-sm text-muted-foreground">We sent a 6-digit code to your email.</p>
              <div className="flex justify-between gap-2">
                {[...Array(6)].map((_, i) => <Input key={i} maxLength={1} className="h-14 w-12 text-center text-xl font-semibold" />)}
              </div>
              <Button onClick={finish} className="w-full gradient-primary text-primary-foreground">Verify & Continue</Button>
              <button className="block w-full text-center text-sm text-muted-foreground hover:text-foreground">Resend code</button>
            </motion.div>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
