"use client";

import { useState, type FormEvent } from "react";
import type { Language } from "@/lib/translations";
import { translations } from "@/lib/translations";

type FeedbackFormProps = {
  rating: number;
  language: Language;
  onSubmitted: () => void;
};

type Status = "idle" | "sending" | "error";

export default function FeedbackForm({ rating, language, onSubmitted }: FeedbackFormProps) {
  const t = translations[language];
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, message }),
      });

      if (!response.ok) throw new Error("Request failed");
      onSubmitted();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <label htmlFor="feedback" className="text-sm font-medium text-slate-600">
        {t.feedbackHeading}
      </label>
      <textarea
        id="feedback"
        required
        minLength={2}
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.feedbackPlaceholder}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-base text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
      />
      {status === "error" && (
        <p className="text-sm text-red-600">{t.errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-slate-900 py-3.5 text-base font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.sendPrivately}
      </button>
    </form>
  );
}
