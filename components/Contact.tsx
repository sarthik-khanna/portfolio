"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section id="contact" className="section-shell py-28">
      <SectionHeading eyebrow="05 · Contact" title="Let's build something" />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <p className="max-w-sm text-mist-300">
            Have a project in mind, or just want to say hi? My inbox — and my
            WhatsApp — are open.
          </p>

          {[
            { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
            { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
            { icon: MapPin, label: profile.location, href: undefined },
          ].map(({ icon: Icon, label, href }) => {
            const content = (
              <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-violet-500/10 text-violet-400">
                  <Icon size={17} />
                </div>
                <span className="font-mono text-sm text-mist-200">{label}</span>
              </div>
            );
            return href ? (
              <a key={label} href={href}>
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.name === "subject" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={field.name}
                  className="mb-2 block font-mono text-xs uppercase tracking-wider text-mist-500"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.name !== "subject"}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-mist-100 outline-none transition-all duration-300 placeholder:text-mist-700 focus:border-violet-400/50 focus:bg-white/[0.04] disabled:opacity-50"
                  placeholder={field.label}
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs uppercase tracking-wider text-mist-500"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                disabled={status === "loading"}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-mist-100 outline-none transition-all duration-300 placeholder:text-mist-700 focus:border-violet-400/50 focus:bg-white/[0.04] disabled:opacity-50"
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending
                </>
              )}
              {status === "success" && (
                <>
                  <Check size={16} />
                  Sent
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  Send Message
                  <Send size={15} />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="font-mono text-xs text-cyan-400">
                Thanks — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-xs text-red-400">{errorMsg}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
