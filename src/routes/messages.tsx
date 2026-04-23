import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chats, sampleThread } from "@/data/messages";
export const Route = createFileRoute("/messages")({ head: () => ({ meta: [{ title: "Messages — SAPAMS" }] }), component: () => {
  const [active,setActive]=useState(chats[0].id); const [msg,setMsg]=useState("");
  return (<DashboardLayout role="student" title="Messages"><PageTransition>
    <div className="grid gap-4 lg:grid-cols-3 h-[calc(100vh-12rem)]">
      <div className="overflow-y-auto rounded-2xl border bg-card shadow-card">
        {chats.map(c=>(<button key={c.id} onClick={()=>setActive(c.id)} className={`flex w-full items-center gap-3 border-b p-4 text-left transition ${active===c.id?"bg-accent":"hover:bg-accent/50"}`}>
          <div className="relative"><div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">{c.name[0]}</div>{c.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card"/>}</div>
          <div className="min-w-0 flex-1"><div className="flex items-center justify-between"><p className="truncate text-sm font-medium">{c.name}</p><span className="text-[10px] text-muted-foreground">{c.time}</span></div><p className="truncate text-xs text-muted-foreground">{c.last}</p></div>
          {c.unread>0 && <span className="ml-auto rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{c.unread}</span>}
        </button>))}
      </div>
      <div className="flex flex-col rounded-2xl border bg-card shadow-card lg:col-span-2">
        <div className="border-b p-4"><p className="font-semibold">{chats.find(c=>c.id===active)?.name}</p><p className="text-xs text-success">Online</p></div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">{sampleThread.map((m,i)=>(<motion.div key={m.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} className={`flex ${m.mine?"justify-end":"justify-start"}`}><div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${m.mine?"gradient-primary text-primary-foreground":"bg-secondary"}`}><p>{m.text}</p><p className={`mt-1 text-[10px] ${m.mine?"text-primary-foreground/70":"text-muted-foreground"}`}>{m.time}</p></div></motion.div>))}</div>
        <form onSubmit={(e)=>{e.preventDefault();setMsg("");}} className="flex gap-2 border-t p-3"><Input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message…" /><Button type="submit" className="gradient-primary text-primary-foreground"><Send className="h-4 w-4"/></Button></form>
      </div>
    </div>
  </PageTransition></DashboardLayout>);
}});
