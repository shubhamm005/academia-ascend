import { useState, type ReactNode } from "react";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Trophy, Calendar, MessageSquare, Users,
  Settings, Bell, Search, Menu, X, ChevronLeft, LogOut, GraduationCap,
  BarChart3, ShieldCheck, HelpCircle, Sparkles, Award,
} from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { APP } from "@/data/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

type Role = "student" | "teacher" | "admin";

const NAV: Record<Role, { label: string; icon: any; to: string }[]> = {
  student: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/student" },
    { label: "Projects", icon: FolderKanban, to: "/student/projects" },
    { label: "Achievements", icon: Trophy, to: "/student/achievements" },
    { label: "Calendar", icon: Calendar, to: "/calendar" },
    { label: "Messages", icon: MessageSquare, to: "/messages" },
    { label: "Leaderboard", icon: Award, to: "/leaderboard" },
  ],
  teacher: [
    { label: "Dashboard", icon: LayoutDashboard, to: "/teacher" },
    { label: "Students", icon: Users, to: "/teacher" },
    { label: "Reviews", icon: ShieldCheck, to: "/teacher" },
    { label: "Calendar", icon: Calendar, to: "/calendar" },
    { label: "Messages", icon: MessageSquare, to: "/messages" },
  ],
  admin: [
    { label: "Overview", icon: LayoutDashboard, to: "/admin" },
    { label: "Analytics", icon: BarChart3, to: "/admin" },
    { label: "Users", icon: Users, to: "/admin" },
    { label: "Events", icon: Calendar, to: "/events" },
    { label: "Messages", icon: MessageSquare, to: "/messages" },
  ],
};

const BOTTOM = [
  { label: "Settings", icon: Settings, to: "/settings" },
  { label: "Help", icon: HelpCircle, to: "/help" },
];

export function DashboardLayout({ children, role = "student", title }: { children: ReactNode; role?: Role; title?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const router = useRouter();
  const nav = NAV[role];
  const { currentUser, notifications, unreadCount, markAllRead, logout } = useApp();

  const myNotifs = currentUser
    ? notifications.filter((n) => n.userId === currentUser.id)
    : [];
  const initials = (currentUser?.name ?? "U U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    router.navigate({ to: "/" });
  };

  const isActive = (to: string) => location.pathname === to || (to !== `/${role}` && location.pathname.startsWith(to));

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - desktop */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col border-r bg-sidebar md:flex"
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </div>
            {!collapsed && <span className="whitespace-nowrap text-sm font-semibold">{APP.name}</span>}
          </Link>
          <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to as any}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-card" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && active && (
                    <motion.span layoutId="activePill" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t p-3 space-y-1">
          {BOTTOM.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.to as any} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 md:hidden" />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r bg-sidebar md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b px-4">
                <span className="font-semibold">{APP.name}</span>
                <button onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <div className="p-3 space-y-1">
                {nav.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <Link key={item.label} to={item.to as any} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${active ? "bg-sidebar-accent" : ""}`}>
                      <Icon className="h-4 w-4" />{item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b glass-strong px-4 md:px-6">
          <button onClick={() => setMobileOpen(true)} className="md:hidden"><Menu className="h-5 w-5" /></button>
          {title && <h1 className="hidden text-lg font-semibold md:block">{title}</h1>}

          <div className="relative ml-auto w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search projects, achievements…" className="pl-9" />
          </div>

          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => {
                const opening = !notifOpen;
                setNotifOpen(opening);
                setProfileOpen(false);
                if (opening && unreadCount > 0) markAllRead();
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-accent"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 mt-2 w-80 rounded-xl border bg-popover p-2 shadow-elegant">
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">NOTIFICATIONS</p>
                  {myNotifs.length === 0 ? (
                    <p className="p-4 text-center text-xs text-muted-foreground">
                      You're all caught up.
                    </p>
                  ) : (
                    myNotifs.slice(0, 8).map((n) => (
                      <div key={n.id} className="flex items-start gap-2 rounded-lg p-3 hover:bg-accent">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                        <div className="min-w-0">
                          <p className="text-sm">{n.text}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(n.at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
                {initials}
              </div>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover p-2 shadow-elegant">
                  <div className="border-b p-3">
                    <p className="text-sm font-semibold">{currentUser?.name ?? "Guest"}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {currentUser?.role ?? role}
                    </p>
                  </div>
                  <Link to="/settings" className="block rounded-md px-3 py-2 text-sm hover:bg-accent">Profile & Settings</Link>
                  <Link to="/support" className="block rounded-md px-3 py-2 text-sm hover:bg-accent">Support</Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-accent"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t glass-strong p-2 md:hidden">
          {nav.slice(0, 5).map((i) => {
            const Icon = i.icon;
            const active = isActive(i.to);
            return (
              <Link key={i.label} to={i.to as any} className={`flex flex-col items-center gap-1 rounded-lg p-2 text-xs ${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="h-5 w-5" /><span className="text-[10px]">{i.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
