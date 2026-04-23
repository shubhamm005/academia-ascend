import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
export const Route = createFileRoute("/terms")({ head: () => ({ meta: [{ title: "Terms — SAPAMS" }] }), component: () => (
  <SimplePage title="Terms & Conditions" subtitle="The legal stuff, in plain English.">
    <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
      <p>By using SAPAMS you agree to these terms.</p>
      <h3 className="font-semibold text-foreground">Acceptable use</h3><p>Don't upload illegal content, harass others or attempt to break security.</p>
      <h3 className="font-semibold text-foreground">Account responsibility</h3><p>You're responsible for keeping your password secret and for activity on your account.</p>
      <h3 className="font-semibold text-foreground">Termination</h3><p>You can cancel anytime. We may suspend accounts that violate these terms.</p>
    </div>
  </SimplePage>
)});
