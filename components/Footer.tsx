import Image from "next/image";
import { navLinks, profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <span className="border-gradient relative h-9 w-9 overflow-hidden rounded-full">
            <Image src="/logo.png" alt="" fill sizes="72px" className="object-cover" />
          </span>
          <span className="font-display text-sm font-semibold text-white">{profile.name}</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-mist-500 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-mist-500">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
