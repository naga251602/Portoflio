"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useToast } from "./Toast";

export default function ContactSection() {
  const { showToast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("access_key", "4052b6f0-8f89-4c08-abdc-c476148d70e6");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      showToast(res.ok ? "Success! Your message has been sent." : "Error: " + data.message);
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      showToast("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="scroll-mt-32 fade-up border-t border-[var(--border)] pt-24 pb-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="flex-1 lg:max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Let&apos;s <br className="hidden lg:block" />Connect.
            </h2>
            <p className="text-[var(--muted)] text-base leading-relaxed mb-10">
              Whether you&apos;re looking to build scalable infrastructure, real-time data pipelines, or just want to chat about backend systems, my inbox is always open.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:gnagalap@usc.edu"
                className="interactive cursor-none inline-flex items-center gap-3 text-[var(--fg)] font-mono text-sm group w-fit">
                <span className="p-2 border border-[var(--border)] rounded-md group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 pointer-events-none" />
                </span>
                nagalapu@usc.edu
              </a>
              <a href="https://linkedin.com/in/gauravnv" target="_blank"
                className="interactive cursor-none inline-flex items-center gap-3 text-[var(--fg)] font-mono text-sm group w-fit">
                <span className="p-2 border border-[var(--border)] rounded-md group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 pointer-events-none" />
                </span>
                linkedin.com/in/gauravnv/
              </a>
            </div>
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 lg:pt-4">
              <div className="relative group">
                <input type="text" id="name" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required placeholder="Name"
                  className="w-full bg-transparent border-b border-[var(--border)] py-3 outline-none text-[var(--fg)] placeholder-transparent focus:border-[var(--fg)] transition-colors interactive cursor-none peer text-base font-sans" />
                <label htmlFor="name"
                  className="absolute left-0 top-3 text-base text-[var(--muted)] cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-[var(--fg)] peer-valid:text-xs peer-valid:-top-4 transition-all pointer-events-none">
                  Name
                </label>
              </div>
              <div className="relative group">
                <input type="email" id="email" value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required placeholder="Email"
                  className="w-full bg-transparent border-b border-[var(--border)] py-3 outline-none text-[var(--fg)] placeholder-transparent focus:border-[var(--fg)] transition-colors interactive cursor-none peer text-base font-sans" />
                <label htmlFor="email"
                  className="absolute left-0 top-3 text-base text-[var(--muted)] cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-[var(--fg)] peer-valid:text-xs peer-valid:-top-4 transition-all pointer-events-none">
                  Email
                </label>
              </div>
              <div className="relative group">
                <textarea id="message" value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required rows={1} placeholder="Message"
                  onInput={(e) => { const t = e.currentTarget; t.style.height = ""; t.style.height = t.scrollHeight + "px"; }}
                  className="w-full bg-transparent border-b border-[var(--border)] py-3 outline-none text-[var(--fg)] placeholder-transparent focus:border-[var(--fg)] transition-colors interactive cursor-none peer text-base font-sans resize-none overflow-hidden" />
                <label htmlFor="message"
                  className="absolute left-0 top-3 text-base text-[var(--muted)] cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-[var(--fg)] peer-valid:text-xs peer-valid:-top-4 transition-all pointer-events-none">
                  Message
                </label>
              </div>
              <button type="submit" disabled={sending}
                className="interactive cursor-none self-start lg:self-end px-10 py-4 bg-[var(--fg)] text-[var(--bg)] hover:opacity-85 transition-opacity font-bold text-sm rounded-md flex items-center gap-2 disabled:opacity-50">
                {sending ? "Sending..." : "Send Message"}
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="pt-16 pb-8 border-t border-[var(--border)] mt-8 text-center fade-up">
        <p className="text-xs font-mono text-[var(--muted)] flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span>&copy; 2025 Gaurav Nagalapuram.</span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            Crafted with
            <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5 text-red-500 animate-pulse inline" />
            in Los Angeles
          </span>
        </p>
      </footer>
    </>
  );
}
