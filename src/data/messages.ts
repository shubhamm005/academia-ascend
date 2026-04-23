export const chats = [
  { id: 1, name: "Dr. Mehta", last: "Great progress on the chatbot!", time: "2m", unread: 2, online: true },
  { id: 2, name: "Project Team - AR Lab", last: "Pushed the new build", time: "1h", unread: 0, online: true },
  { id: 3, name: "Prof. Kapoor", last: "Please resubmit section 3", time: "3h", unread: 1, online: false },
  { id: 4, name: "Priya Patel", last: "Want to collab on hackathon?", time: "1d", unread: 0, online: true },
  { id: 5, name: "Support", last: "Your ticket has been resolved", time: "2d", unread: 0, online: false },
];

export const sampleThread = [
  { id: 1, from: "Dr. Mehta", text: "Hi! I reviewed your submission.", time: "10:02 AM", mine: false },
  { id: 2, from: "You", text: "Thank you! Any feedback?", time: "10:03 AM", mine: true },
  { id: 3, from: "Dr. Mehta", text: "The architecture is solid. Polish the evaluation section.", time: "10:05 AM", mine: false },
  { id: 4, from: "You", text: "On it — will resubmit today.", time: "10:06 AM", mine: true },
  { id: 5, from: "Dr. Mehta", text: "Great progress on the chatbot!", time: "10:14 AM", mine: false },
];
