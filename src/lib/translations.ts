export type Language = "en" | "pl";

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
  pl: {
    prompt: "Jak minęła Twoja wizyta u nas?",
    tapAStar: "Stuknij gwiazdkę, aby ocenić",
    writeGoogleReview: "Napisz opinię w Google",
    feedbackHeading: "Napisz, co poszło nie tak",
    feedbackPlaceholder: "Twoja opinia pomoże nam się poprawić...",
    sendPrivately: "Wyślij prywatnie do szefa",
    sending: "Wysyłanie...",
    thankYouTitle: "Dziękujemy za opinię",
    thankYouBody: "Zajmiemy się tym osobiście.",
    errorMessage: "Coś poszło nie tak. Spróbuj ponownie.",
    followInstagram: "nimabreakfastmore",
    bookAppointment: "Zarezerwuj w Booksy",
    ratedLabel: (n: number) => `Oceniono na ${n} z 5 gwiazdek`,
  },
} as const satisfies Record<Language, Record<string, unknown>>;
