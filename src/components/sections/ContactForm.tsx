"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, message: message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 p-10 text-center"
      >
        <CheckCircle2 size={32} className="text-accent" />
        <p className="font-display text-lg font-semibold text-text-primary">Message sent</p>
        <p className="font-body text-sm text-text-secondary">Thanks for reaching out — I&apos;ll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block font-body text-sm font-medium text-text-primary">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-border bg-surface px-4 py-3 font-body text-sm text-text-primary outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm font-medium text-text-primary">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-border bg-surface px-4 py-3 font-body text-sm text-text-primary outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm font-medium text-text-primary">Your requirements</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-md border border-border bg-surface px-4 py-3 font-body text-sm text-text-primary outline-none transition-colors focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-signal disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
        <Send size={16} />
      </button>

      {status === "error" && (
        <p className="font-body text-sm text-signal">Something went wrong — try emailing directly instead.</p>
      )}
    </form>
  );
}
