import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="panel flex flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row">
      <p className="font-mono text-xs text-mist-500">
        © {new Date().getFullYear()} {profile.name}. Software Developer
      </p>
      <p className="font-mono text-xs text-mist-500">{profile.location}</p>
    </footer>
  );
}
