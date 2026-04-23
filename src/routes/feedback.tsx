import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
export const Route = createFileRoute("/feedback")({ head: () => ({ meta: [{ title: "Feedback — SAPAMS" }] }), component: () => {
  const [rating,setRating]=useState(0);
  return (<SimplePage title="Feedback" subtitle="Tell us what you love and what we can improve.">
    <form onSubmit={(e)=>{e.preventDefault();toast.success("Thanks for the feedback!");}} className="space-y-4 rounded-2xl border bg-card p-6 shadow-card max-w-xl">
      <div><Label>Rate your experience</Label><div className="mt-2 flex gap-2">{[1,2,3,4,5].map(n=><button key={n} type="button" onClick={()=>setRating(n)} className={`flex h-12 w-12 items-center justify-center rounded-lg border text-xl transition ${rating>=n?"gradient-primary text-primary-foreground border-transparent":"hover:bg-accent"}`}>★</button>)}</div></div>
      <div><Label>Comments</Label><Textarea rows={5} className="mt-1" required/></div>
      <Button type="submit" className="gradient-primary text-primary-foreground w-full">Submit feedback</Button>
    </form>
  </SimplePage>);
}});
