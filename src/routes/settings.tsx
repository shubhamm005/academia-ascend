import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
export const Route = createFileRoute("/settings")({ head: () => ({ meta: [{ title: "Settings — SAPAMS" }] }), component: () => {
  const [n1,setN1]=useState(true); const [n2,setN2]=useState(false);
  return (<DashboardLayout role="student" title="Settings"><PageTransition>
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Profile & Settings</h1>
      <Tabs defaultValue="profile" className="mt-6">
        <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="privacy">Privacy</TabsTrigger></TabsList>
        <TabsContent value="profile" className="mt-4 space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4"><div className="relative"><div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">AS</div><button className="absolute bottom-0 right-0 rounded-full border bg-background p-1.5"><Camera className="h-3 w-3"/></button></div><div><p className="font-semibold">Aarav Sharma</p><p className="text-sm text-muted-foreground">Computer Science · Senior</p></div></div>
          <div className="grid gap-4 md:grid-cols-2"><div><Label>First Name</Label><Input className="mt-1" defaultValue="Aarav"/></div><div><Label>Last Name</Label><Input className="mt-1" defaultValue="Sharma"/></div></div>
          <div><Label>Email</Label><Input className="mt-1" type="email" defaultValue="aarav@university.edu"/></div>
          <Button className="gradient-primary text-primary-foreground" onClick={()=>toast.success("Profile saved")}>Save changes</Button>
        </TabsContent>
        <TabsContent value="security" className="mt-4 space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div><Label>Current password</Label><Input type="password" className="mt-1"/></div>
          <div><Label>New password</Label><Input type="password" className="mt-1"/></div>
          <Button className="gradient-primary text-primary-foreground" onClick={()=>toast.success("Password updated")}>Update password</Button>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4 space-y-3 rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between"><div><p className="font-medium">Email notifications</p><p className="text-xs text-muted-foreground">Project updates, deadlines</p></div><Switch checked={n1} onCheckedChange={setN1}/></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Marketing emails</p><p className="text-xs text-muted-foreground">News and offers</p></div><Switch checked={n2} onCheckedChange={setN2}/></div>
        </TabsContent>
        <TabsContent value="privacy" className="mt-4 space-y-3 rounded-2xl border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between"><div><p className="font-medium">Show on leaderboard</p></div><Switch defaultChecked/></div>
          <div className="flex items-center justify-between"><div><p className="font-medium">Public profile</p></div><Switch defaultChecked/></div>
        </TabsContent>
      </Tabs>
    </div>
  </PageTransition></DashboardLayout>);
}});
