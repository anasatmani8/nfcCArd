export type Language = "en" | "de";

export const translations = {
  en: {
    prompt: "How was your experience with us?",
    tapAStar: "Tap a star to rate us",
    writeGoogleReview: "Write a review on Google",
    feedbackHeading: "Tell us what went wrong",
    feedbackPlaceholder: "Your feedback helps us improve...",
    sendPrivately: "Send privately to management",
    sending: "Sending...",
    thankYouTitle: "Thank you for your feedback",
    thankYouBody: "We will look into this personally.",
    errorMessage: "Something went wrong. Please try again.",
    followInstagram: "Follow us on Instagram",
    bookAppointment: "Book an appointment",
    ratedLabel: (n: number) => `You rated ${n} out of 5 stars`,
  },
  de: {
    prompt: "Wie war Ihr Erlebnis bei uns?",
    tapAStar: "Tippen Sie auf einen Stern, um zu bewerten",
    writeGoogleReview: "Bewertung bei Google schreiben",
    feedbackHeading: "Was ist schiefgelaufen?",
    feedbackPlaceholder: "Ihr Feedback hilft uns, besser zu werden...",
    sendPrivately: "Privat an die Geschäftsleitung senden",
    sending: "Wird gesendet...",
    thankYouTitle: "Vielen Dank für Ihr Feedback",
    thankYouBody: "Wir werden uns persönlich darum kümmern.",
    errorMessage: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    followInstagram: "Folgen Sie uns auf Instagram",
    bookAppointment: "Termin buchen",
    ratedLabel: (n: number) => `Sie haben ${n} von 5 Sternen vergeben`,
  },
} as const satisfies Record<Language, Record<string, unknown>>;
