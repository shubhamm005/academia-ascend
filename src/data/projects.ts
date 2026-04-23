export type ProjectStatus = "Approved" | "Pending" | "Rejected" | "Draft" | "In Review";

export const projects = [
  { id: "P-1042", title: "AI Chatbot for Campus", guide: "Dr. Mehta", status: "Approved" as ProjectStatus, date: "2025-03-12", tags: ["AI", "NLP", "React"] },
  { id: "P-1043", title: "Smart Attendance System", guide: "Prof. Kapoor", status: "In Review" as ProjectStatus, date: "2025-04-02", tags: ["IoT", "ML"] },
  { id: "P-1044", title: "Blockchain Certificate DApp", guide: "Dr. Rao", status: "Pending" as ProjectStatus, date: "2025-04-15", tags: ["Solidity", "Web3"] },
  { id: "P-1045", title: "AR Lab Simulator", guide: "Prof. Khan", status: "Approved" as ProjectStatus, date: "2025-02-20", tags: ["Unity", "AR"] },
  { id: "P-1046", title: "Mental Health Tracker", guide: "Dr. Mehta", status: "Draft" as ProjectStatus, date: "2025-04-18", tags: ["Mobile", "Flutter"] },
  { id: "P-1047", title: "Green Energy Dashboard", guide: "Prof. Shah", status: "Rejected" as ProjectStatus, date: "2025-01-30", tags: ["IoT", "D3"] },
];

export const deadlines = [
  { title: "Final Project Report", course: "CS-498 Capstone", due: "2025-05-02", urgency: "high" },
  { title: "Mid-term Review", course: "AI-402", due: "2025-04-28", urgency: "medium" },
  { title: "Hackathon Submission", course: "Tech-Fest", due: "2025-05-10", urgency: "low" },
];

export const activity = [
  { id: 1, type: "approval", text: "Your project 'AI Chatbot' was approved by Dr. Mehta", time: "2h ago" },
  { id: 2, type: "achievement", text: "Certificate uploaded: Google Cloud Digital Leader", time: "5h ago" },
  { id: 3, type: "comment", text: "Prof. Kapoor commented on Smart Attendance System", time: "1d ago" },
  { id: 4, type: "deadline", text: "Reminder: Final Report due in 6 days", time: "1d ago" },
  { id: 5, type: "event", text: "You registered for Spring Hackathon 2025", time: "2d ago" },
];
