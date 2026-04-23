import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Trophy, FolderKanban, BarChart3, ShieldCheck,
  Users, Zap, Star, Check, GraduationCap, Rocket,
} from "lucide-react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { APP } from "@/data/app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP.name} — ${APP.tagline}` },
      { name: "description", content: APP.description },
      { property: "og:title", content: `${APP.name} — ${APP.tagline}` },
      { property: "og:description", content: APP.description },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: FolderKanban, title: "Smart Project Submissions", desc: "Multi-step forms with auto-save, drag & drop uploads and a live status timeline." },
  { icon: Trophy, title: "Achievement Verification", desc: "Faculty-verified hackathons, internships, certifications and research papers." },
  { icon: BarChart3, title: "Performance Analytics", desc: "Beautiful charts that reveal trends across departments, batches and individuals." },
  { icon: ShieldCheck, title: "Role-Based Access", desc: "Tailored dashboards for Students, Teachers and Admins with granular permissions." },
  { icon: Users, title: "Team Collaboration", desc: "Built-in messaging, mentions, comments and shared project workspaces." },
  { icon: Zap, title: "Lightning Fast", desc: "Optimized React frontend with delightful Framer Motion animations everywhere." },
];

const testimonials = [
  { name: "Dr. Ananya Mehta", role: "Dean of Engineering", quote: "SAPAMS transformed how we track student excellence — it's the polished platform our campus deserves." },
  { name: "Aarav Sharma", role: "Final Year, CS", quote: "Submitting projects feels effortless now. The analytics motivate me to keep raising my game." },
  { name: "Prof. Rajan Kapoor", role: "Faculty Mentor", quote: "Reviewing 40 student projects used to be chaos. Now it's a clean, joyful workflow." },
];

const faqs = [
  { q: "Who can use SAPAMS?", a: "Any university or college — students, teachers and administrators all get tailored dashboards." },
  { q: "Is my data secure?", a: "Yes. We use role-based access control, encrypted storage and full audit logs." },
  { q: "Can I export my data?", a: "Absolutely. PDF & Excel exports are built into every list, table and report." },
  { q: "Does it support dark mode?", a: "Of course — with a buttery sliding theme transition you'll want to toggle for fun." },
];

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-[0.07] dark:opacity-20" />
        <div className="absolute -top-40 -right-32 -z-10 h-[40rem] w-[40rem] rounded-full bg-primary-glow opacity-20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-32 -z-10 h-[40rem] w-[40rem] rounded-full bg-primary opacity-10 blur-3xl animate-float" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs backdrop-blur">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Introducing SAPAMS 2.0 — Now with AI insights</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Your academic journey,{" "}
              <span className="text-gradient">beautifully organized</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{APP.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
                <Link to="/register">Start free <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/student">Live Demo</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> No credit card</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> 14-day free trial</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Cancel anytime</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl gradient-primary opacity-30 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border bg-card p-2 shadow-elegant">
              <div className="rounded-2xl gradient-card p-5">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/70" />
                    <div className="h-3 w-3 rounded-full bg-warning" />
                    <div className="h-3 w-3 rounded-full bg-success" />
                  </div>
                  <span className="text-xs text-muted-foreground">student.sapams.edu</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { l: "Projects", v: "12", c: "chart-1" },
                    { l: "Achievements", v: "28", c: "chart-2" },
                    { l: "Pending", v: "4", c: "chart-3" },
                    { l: "Score", v: "92%", c: "chart-5" },
                  ].map((s, i) => (
                    <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="rounded-xl border bg-card p-4">
                      <p className="text-xs text-muted-foreground">{s.l}</p>
                      <p className="mt-1 text-2xl font-bold" style={{ color: `var(--color-${s.c})` }}>{s.v}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border bg-card p-4">
                  <p className="text-xs font-semibold text-muted-foreground">PERFORMANCE</p>
                  <div className="mt-3 flex items-end gap-1.5 h-24">
                    {[40, 55, 48, 70, 65, 82, 75, 92, 88, 95].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.8 + i * 0.05, duration: 0.6 }} className="flex-1 rounded-t-md gradient-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Everything you need, nothing you don't</h2>
          <p className="mt-4 text-muted-foreground">Premium tools that make academic management feel modern, fast and joyful.</p>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border bg-card p-6 shadow-card transition-shadow hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-4 md:px-8">
          {[
            { v: "120+", l: "Universities" },
            { v: "85k+", l: "Active students" },
            { v: "4.9/5", l: "User rating" },
            { v: "99.9%", l: "Uptime SLA" },
          ].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="text-4xl font-bold text-gradient">{s.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Loved by educators & students</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex gap-1 text-warning">{[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">{t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl gradient-primary p-12 text-center text-primary-foreground shadow-elegant">
          <Rocket className="absolute -right-10 -top-10 h-48 w-48 opacity-10" />
          <GraduationCap className="absolute -bottom-10 -left-10 h-48 w-48 opacity-10" />
          <h2 className="text-3xl font-bold md:text-4xl">Ready to elevate your campus?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Join hundreds of universities reimagining academic excellence with SAPAMS.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" variant="secondary"><Link to="/register">Get started free</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Talk to sales</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
