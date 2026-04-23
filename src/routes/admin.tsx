import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { PageTransition } from "@/components/common/PageTransition";
import { Badge } from "@/components/ui/badge";
import { adminStats, monthlySubmissions, departmentData } from "@/data/stats";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — SAPAMS" }] }),
  component: AdminDashboard,
});

const auditLog = [
  { user: "Aarav Sharma", action: "Submitted project P-1042", time: "2m ago" },
  { user: "Dr. Mehta", action: "Approved 4 submissions", time: "15m ago" },
  { user: "Admin", action: "Created new department: AI/ML", time: "1h ago" },
  { user: "Priya Patel", action: "Uploaded 2 certificates", time: "2h ago" },
  { user: "System", action: "Backup completed", time: "5h ago" },
];

function AdminDashboard() {
  return (
    <DashboardLayout role="admin" title="Admin Overview">
      <PageTransition>
        <h1 className="mb-1 text-2xl font-bold">Platform Overview</h1>
        <p className="mb-6 text-sm text-muted-foreground">Real-time stats across the institution.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2">
            <h3 className="mb-4 font-semibold">Monthly Submissions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySubmissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="projects" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="achievements" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Approval Rate</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: "Approved", value: 87, fill: "var(--color-chart-2)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-center text-3xl font-bold text-gradient">87%</p>
            <p className="text-center text-xs text-muted-foreground">approved this month</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Departments</h3>
            <div className="space-y-3">
              {departmentData.map((d, i) => (
                <div key={d.name}>
                  <div className="flex justify-between text-sm"><span>{d.name}</span><span className="text-muted-foreground">{d.value}</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${(d.value / 500) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-semibold">Audit Log</h3>
            <div className="space-y-3">
              {auditLog.map((a, i) => (
                <div key={i} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <Badge variant="outline" className="shrink-0">{a.user}</Badge>
                  <p className="flex-1 text-sm">{a.action}</p>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
