import { Link } from "@tanstack/react-router";
import { GraduationCap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { APP } from "@/data/app";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-5 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><GraduationCap className="h-5 w-5" /></div>
            <span className="text-lg">{APP.name}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{APP.description}</p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href={`mailto:${APP.email}`} aria-label="Email" className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
        <FooterCol title="Product" links={[["Features","/#features"],["Dashboard","/student"],["Leaderboard","/leaderboard"],["Events","/events"]]} />
        <FooterCol title="Company" links={[["About","/about"],["Contact","/contact"],["Help","/help"],["Documentation","/docs"]]} />
        <FooterCol title="Legal" links={[["Privacy","/privacy"],["Terms","/terms"],["Support","/support"],["Feedback","/feedback"]]} />
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP.name}. Crafted for academic excellence.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(([label, to]) => (
          <li key={label}><Link to={to as any} className="hover:text-foreground">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
