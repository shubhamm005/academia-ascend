import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/common/SimplePage";
export const Route = createFileRoute("/privacy")({ head: () => ({ meta: [{ title: "Privacy Policy — SAPAMS" }] }), component: () => (
  <SimplePage title="Privacy Policy" subtitle="Last updated April 2025.">
    <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
      <p>We respect your privacy. This policy explains what data we collect, how we use it, and the choices you have.</p>
      <h3 className="font-semibold text-foreground">Information we collect</h3><p>Account info, project submissions, achievement uploads, usage analytics.</p>
      <h3 className="font-semibold text-foreground">How we use it</h3><p>To provide, secure, and improve the SAPAMS service. We never sell your data.</p>
      <h3 className="font-semibold text-foreground">Your rights</h3><p>Access, export, correct, or delete your data anytime from settings.</p>
    </div>
  </SimplePage>
)});
