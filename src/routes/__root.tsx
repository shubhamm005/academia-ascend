import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/common/ScrollToTop";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 -z-10 gradient-hero opacity-10" />
      <div className="max-w-md text-center">
        <h1 className="text-[10rem] font-bold leading-none text-gradient">404</h1>
        <h2 className="mt-2 text-2xl font-semibold">Lost in the academy</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="inline-flex items-center rounded-md gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant">Go home</Link>
          <Link to="/help" className="inline-flex items-center rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-accent">Get help</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SAPAMS — Smart Academic Project & Achievement Management" },
      { name: "description", content: "Premium platform for academic project submissions, achievement tracking, and performance analytics." },
      { name: "author", content: "SAPAMS" },
      { property: "og:title", content: "SAPAMS — Smart Academic Project & Achievement Management" },
      { property: "og:description", content: "Premium platform for academic project submissions and achievement tracking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@SAPAMS" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
      <ScrollToTop />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}
