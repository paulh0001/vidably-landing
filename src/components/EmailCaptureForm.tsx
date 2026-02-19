"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xzdvpvze";

export default function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-[46px] items-center justify-center rounded-full border border-v-gray-300/60 bg-bg-pure px-6 font-body text-[13px] font-medium tracking-tight text-text-secondary">
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-[400px]">
      <input
        type="email"
        required
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@brand.com"
        className="h-[46px] w-full rounded-full border border-v-gray-300/60 bg-bg-pure pl-5 pr-[155px] font-body text-[13px] text-text-primary placeholder:text-text-muted transition-colors focus:border-v-gray-400 focus:outline-none"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-text-primary px-4 py-1.5 font-body text-[13px] font-semibold tracking-tight text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Request Access"}
      </button>
      {status === "error" && (
        <p className="mt-2 text-center font-body text-xs text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
