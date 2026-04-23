import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* =========================
   Types
========================= */
export type Role = "student" | "teacher" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  avatar?: string;
};

export const MILESTONE_NAMES = [
  "Proposal",
  "Design",
  "Development",
  "Testing",
  "Submission",
] as const;
export type MilestoneName = (typeof MILESTONE_NAMES)[number];

export type Milestone = {
  id: string;
  name: MilestoneName;
  completed: boolean;
  approvedBy?: string; // teacher id
  completedAt?: string;
};

export type ProjectStatus = "Pending" | "In Progress" | "Completed";

export type TimelineEntry = {
  id: string;
  text: string;
  at: string;
  by?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  guideId: string; // teacher id
  tags: string[];
  progress: number; // 0..100
  status: ProjectStatus;
  milestones: Milestone[];
  feedback: { id: string; from: string; text: string; at: string }[];
  timeline: TimelineEntry[];
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  userId: string; // recipient
  text: string;
  at: string;
  read: boolean;
};

/* =========================
   Helpers
========================= */
const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

const freshMilestones = (): Milestone[] =>
  MILESTONE_NAMES.map((n) => ({ id: uid(), name: n, completed: false }));

/* =========================
   Seed data
========================= */
const SEED_USERS: User[] = [
  { id: "u-student", name: "Aarav Sharma", email: "aarav@uni.edu", role: "student", department: "Computer Science" },
  { id: "u-student-2", name: "Priya Patel", email: "priya@uni.edu", role: "student", department: "Computer Science" },
  { id: "u-student-3", name: "Rohan Iyer", email: "rohan@uni.edu", role: "student", department: "Electronics" },
  { id: "u-teacher", name: "Dr. Mehta", email: "mehta@uni.edu", role: "teacher", department: "Computer Science" },
  { id: "u-teacher-2", name: "Prof. Kapoor", email: "kapoor@uni.edu", role: "teacher", department: "Electronics" },
  { id: "u-admin", name: "Admin User", email: "admin@uni.edu", role: "admin" },
];

function seedProjects(): Project[] {
  const base = (
    p: Partial<Project> & {
      id: string;
      title: string;
      ownerId: string;
      guideId: string;
      progress: number;
    },
  ): Project => {
    const milestones = freshMilestones();
    // mark some milestones complete based on progress
    const completeCount = Math.floor((p.progress / 100) * milestones.length);
    for (let i = 0; i < completeCount; i++) {
      milestones[i].completed = true;
      milestones[i].completedAt = now();
    }
    const status: ProjectStatus =
      p.progress >= 100 ? "Completed" : p.progress > 0 ? "In Progress" : "Pending";
    return {
      description: "",
      tags: [],
      feedback: [],
      timeline: [{ id: uid(), text: "Project created", at: now() }],
      createdAt: now(),
      updatedAt: now(),
      milestones,
      status,
      ...p,
    };
  };
  return [
    base({ id: "p-1", title: "AI Chatbot for Campus", ownerId: "u-student", guideId: "u-teacher", progress: 80, tags: ["AI", "React"], description: "Conversational assistant for student queries." }),
    base({ id: "p-2", title: "Smart Attendance System", ownerId: "u-student", guideId: "u-teacher-2", progress: 40, tags: ["IoT", "ML"], description: "Face recognition based attendance." }),
    base({ id: "p-3", title: "Blockchain Certificates", ownerId: "u-student-2", guideId: "u-teacher", progress: 60, tags: ["Solidity", "Web3"], description: "Tamper-proof academic certificates." }),
    base({ id: "p-4", title: "AR Lab Simulator", ownerId: "u-student-3", guideId: "u-teacher-2", progress: 100, tags: ["Unity", "AR"], description: "Immersive lab experiments." }),
    base({ id: "p-5", title: "Mental Health Tracker", ownerId: "u-student-2", guideId: "u-teacher", progress: 20, tags: ["Mobile", "Flutter"], description: "Mood and wellness tracking." }),
  ];
}

/* =========================
   Storage
========================= */
const KEY = "sapams-state-v1";
const SESSION_KEY = "sapams-session-v1";

type Persisted = {
  users: User[];
  projects: Project[];
  notifications: Notification[];
};

function loadPersisted(): Persisted {
  if (typeof localStorage === "undefined")
    return { users: SEED_USERS, projects: seedProjects(), notifications: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { users: SEED_USERS, projects: seedProjects(), notifications: [] };
    const p = JSON.parse(raw) as Persisted;
    return {
      users: p.users?.length ? p.users : SEED_USERS,
      projects: p.projects ?? [],
      notifications: p.notifications ?? [],
    };
  } catch {
    return { users: SEED_USERS, projects: seedProjects(), notifications: [] };
  }
}

function loadSession(): string | null {
  if (typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

/* =========================
   Context
========================= */
type Ctx = {
  // auth
  currentUser: User | null;
  login: (email: string, role: Role, name?: string) => User;
  register: (input: { name: string; email: string; role: Role; department?: string }) => User;
  logout: () => void;

  // data
  users: User[];
  projects: Project[];
  notifications: Notification[];

  // helpers
  userById: (id: string) => User | undefined;
  projectsForCurrent: () => Project[];

  // project crud
  createProject: (input: { title: string; description: string; tags: string[]; guideId: string }) => Project;
  updateProject: (id: string, patch: Partial<Pick<Project, "title" | "description" | "tags" | "guideId">>) => void;
  deleteProject: (id: string) => void;
  setProgress: (id: string, progress: number) => void;
  bumpProgress: (id: string, delta: number) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  approveMilestone: (projectId: string, milestoneId: string) => void;
  addFeedback: (projectId: string, text: string) => void;

  // notifications
  markAllRead: () => void;
  unreadCount: number;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [projects, setProjects] = useState<Project[]>(() => seedProjects());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // hydrate on mount (client-only)
  useEffect(() => {
    const p = loadPersisted();
    setUsers(p.users);
    setProjects(p.projects.length ? p.projects : seedProjects());
    setNotifications(p.notifications);
    setCurrentUserId(loadSession());
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ users, projects, notifications } satisfies Persisted),
      );
    } catch {}
  }, [hydrated, users, projects, notifications]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (currentUserId) localStorage.setItem(SESSION_KEY, currentUserId);
      else localStorage.removeItem(SESSION_KEY);
    } catch {}
  }, [hydrated, currentUserId]);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) ?? null,
    [users, currentUserId],
  );

  const userById = useCallback((id: string) => users.find((u) => u.id === id), [users]);

  const pushNotification = useCallback((userId: string, text: string) => {
    setNotifications((prev) => [
      { id: uid(), userId, text, at: now(), read: false },
      ...prev,
    ]);
  }, []);

  /* ----- auth ----- */
  const login = useCallback<Ctx["login"]>((email, role, name) => {
    let user: User | undefined;
    setUsers((prev) => {
      user = prev.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
      if (user) return prev;
      // demo: pick a seed user matching the role if email empty/unknown
      const seed = prev.find((u) => u.role === role);
      if (seed && (!email || email.trim() === "")) {
        user = seed;
        return prev;
      }
      // create a fresh user
      user = {
        id: uid(),
        name: name || email.split("@")[0] || "New User",
        email: email || `${role}@demo.edu`,
        role,
      };
      return [...prev, user];
    });
    // setUsers callback runs synchronously; user is assigned before returning
    setCurrentUserId(user!.id);
    return user!;
  }, []);

  const register = useCallback<Ctx["register"]>(({ name, email, role, department }) => {
    const newUser: User = { id: uid(), name, email, role, department };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    return newUser;
  }, []);

  const logout = useCallback(() => setCurrentUserId(null), []);

  /* ----- projects ----- */
  const projectsForCurrent = useCallback(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") return projects;
    if (currentUser.role === "teacher")
      return projects.filter((p) => p.guideId === currentUser.id);
    return projects.filter((p) => p.ownerId === currentUser.id);
  }, [projects, currentUser]);

  const createProject = useCallback<Ctx["createProject"]>(
    ({ title, description, tags, guideId }) => {
      if (!currentUser) throw new Error("Not signed in");
      const proj: Project = {
        id: uid(),
        title,
        description,
        tags,
        guideId,
        ownerId: currentUser.id,
        progress: 0,
        status: "Pending",
        milestones: freshMilestones(),
        feedback: [],
        timeline: [{ id: uid(), text: `Project created by ${currentUser.name}`, at: now() }],
        createdAt: now(),
        updatedAt: now(),
      };
      setProjects((prev) => [proj, ...prev]);
      pushNotification(guideId, `New project assigned: ${title}`);
      return proj;
    },
    [currentUser, pushNotification],
  );

  const updateProject = useCallback<Ctx["updateProject"]>((id, patch) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...patch,
              updatedAt: now(),
              timeline: [
                { id: uid(), text: "Project details updated", at: now() },
                ...p.timeline,
              ],
            }
          : p,
      ),
    );
  }, []);

  const deleteProject = useCallback<Ctx["deleteProject"]>((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const recomputeStatus = (progress: number): ProjectStatus =>
    progress >= 100 ? "Completed" : progress > 0 ? "In Progress" : "Pending";

  const setProgress = useCallback<Ctx["setProgress"]>((id, progress) => {
    const clamped = Math.max(0, Math.min(100, Math.round(progress)));
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              progress: clamped,
              status: recomputeStatus(clamped),
              updatedAt: now(),
              timeline: [
                { id: uid(), text: `Progress updated to ${clamped}%`, at: now() },
                ...p.timeline,
              ],
            }
          : p,
      ),
    );
  }, []);

  const bumpProgress = useCallback<Ctx["bumpProgress"]>(
    (id, delta) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const next = Math.max(0, Math.min(100, p.progress + delta));
          return {
            ...p,
            progress: next,
            status: recomputeStatus(next),
            updatedAt: now(),
            timeline: [
              { id: uid(), text: `Progress ${delta > 0 ? "+" : ""}${delta}% → ${next}%`, at: now() },
              ...p.timeline,
            ],
          };
        }),
      );
    },
    [],
  );

  const toggleMilestone = useCallback<Ctx["toggleMilestone"]>(
    (projectId, milestoneId) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          const milestones = p.milestones.map((m) =>
            m.id === milestoneId
              ? { ...m, completed: !m.completed, completedAt: !m.completed ? now() : undefined }
              : m,
          );
          const done = milestones.filter((m) => m.completed).length;
          const progress = Math.round((done / milestones.length) * 100);
          const toggled = milestones.find((m) => m.id === milestoneId)!;
          return {
            ...p,
            milestones,
            progress,
            status: recomputeStatus(progress),
            updatedAt: now(),
            timeline: [
              {
                id: uid(),
                text: `Milestone "${toggled.name}" ${toggled.completed ? "completed" : "reopened"}`,
                at: now(),
              },
              ...p.timeline,
            ],
          };
        }),
      );
    },
    [],
  );

  const approveMilestone = useCallback<Ctx["approveMilestone"]>(
    (projectId, milestoneId) => {
      if (!currentUser) return;
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          const milestones = p.milestones.map((m) =>
            m.id === milestoneId
              ? {
                  ...m,
                  completed: true,
                  approvedBy: currentUser.id,
                  completedAt: m.completedAt ?? now(),
                }
              : m,
          );
          const done = milestones.filter((m) => m.completed).length;
          const progress = Math.round((done / milestones.length) * 100);
          const m = milestones.find((x) => x.id === milestoneId)!;
          // notify the student
          pushNotification(p.ownerId, `${currentUser.name} approved milestone "${m.name}" on ${p.title}`);
          return {
            ...p,
            milestones,
            progress,
            status: recomputeStatus(progress),
            updatedAt: now(),
            timeline: [
              {
                id: uid(),
                text: `Milestone "${m.name}" approved by ${currentUser.name}`,
                at: now(),
                by: currentUser.id,
              },
              ...p.timeline,
            ],
          };
        }),
      );
    },
    [currentUser, pushNotification],
  );

  const addFeedback = useCallback<Ctx["addFeedback"]>(
    (projectId, text) => {
      if (!currentUser || !text.trim()) return;
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          pushNotification(p.ownerId, `${currentUser.name} left feedback on ${p.title}`);
          return {
            ...p,
            feedback: [
              { id: uid(), from: currentUser.id, text: text.trim(), at: now() },
              ...p.feedback,
            ],
            timeline: [
              { id: uid(), text: `Feedback added by ${currentUser.name}`, at: now(), by: currentUser.id },
              ...p.timeline,
            ],
            updatedAt: now(),
          };
        }),
      );
    },
    [currentUser, pushNotification],
  );

  const markAllRead = useCallback(() => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => (n.userId === currentUser.id ? { ...n, read: true } : n)),
    );
  }, [currentUser]);

  const unreadCount = useMemo(
    () => (currentUser ? notifications.filter((n) => n.userId === currentUser.id && !n.read).length : 0),
    [notifications, currentUser],
  );

  const value: Ctx = {
    currentUser,
    login,
    register,
    logout,
    users,
    projects,
    notifications,
    userById,
    projectsForCurrent,
    createProject,
    updateProject,
    deleteProject,
    setProgress,
    bumpProgress,
    toggleMilestone,
    approveMilestone,
    addFeedback,
    markAllRead,
    unreadCount,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
