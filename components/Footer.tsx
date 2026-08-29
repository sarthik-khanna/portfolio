import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="section-shell border-t border-white/[0.06] py-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-mist-700">
          © {new Date().getFullYear()} {profile.name}. Software Developer
        </p>
        <p className="font-mono text-xs text-mist-700">{profile.location}</p>
      </div>
    </footer>
  );
}
