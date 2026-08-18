"use client";

import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { translations, type Language } from "@/lib/translations";
import StarRating from "@/components/StarRating";
import FeedbackForm from "@/components/FeedbackForm";

export default function Home() {
  const [language, setLanguage] = useState<Language>(siteConfig.defaultLanguage);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const t = translations[language];
  const isHighRating = rating >= 4;
  const isLowRating = rating >= 1 && rating <= 3;

  function handleGoogleReview() {
    window.open(siteConfig.googleReviewUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="flex min-h-dvh flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100 px-5 py-10">
      <button
        type="button"
        onClick={() => setLanguage(language === "en" ? "pl" : "en")}
        className="self-end rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm"
        aria-label="Switch language"
      >
        {language === "en" ? "PL" : "EN"}
      </button>

      <div className="mt-4 flex w-full max-w-sm flex-1 flex-col items-center">
        <div className="flex w-full flex-col items-center rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          {logoFailed ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white shadow-md ring-4 ring-slate-50">
              {siteConfig.businessName.trim().charAt(0).toUpperCase()}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={siteConfig.logoUrl}
              alt={`${siteConfig.businessName} logo`}
              onError={() => setLogoFailed(true)}
              className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-slate-50"
            />
          )}
          <h1 className="mt-4 text-center text-xl font-bold tracking-tight text-slate-900">
            {siteConfig.businessName}
          </h1>

          {!submitted ? (
            <>
              <p className="mt-6 text-center text-base font-medium text-slate-700">
                {t.prompt}
              </p>

              <div className="mt-5">
                <StarRating rating={rating} onRate={setRating} label={t.prompt} />
              </div>

              {rating === 0 && (
                <p className="mt-2 text-sm text-slate-400">{t.tapAStar}</p>
              )}
              {rating > 0 && (
                <p className="mt-2 text-sm text-slate-400">{t.ratedLabel(rating)}</p>
              )}

              {isHighRating && (
                <button
                  type="button"
                  onClick={handleGoogleReview}
                  className="mt-6 w-full rounded-xl bg-amber-400 py-3.5 text-base font-semibold text-slate-900 shadow-sm transition active:scale-[0.98]"
                >
                  {t.writeGoogleReview}
                </button>
              )}

              {isLowRating && (
                <div className="mt-6 w-full">
                  <FeedbackForm
                    rating={rating}
                    language={language}
                    onSubmitted={() => setSubmitted(true)}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-2 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{t.thankYouTitle}</h2>
              <p className="text-sm text-slate-500">{t.thankYouBody}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex w-full flex-col gap-2.5">
          <a
            href={siteConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm transition active:scale-[0.98]"
          >
            {t.followInstagram}
          </a>
          <a
            href={siteConfig.socialLinks.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm transition active:scale-[0.98]"
          >
            {t.bookAppointment}
          </a>
        </div>
      </div>
    </main>
  );
}
