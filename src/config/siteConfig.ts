// Central place to customize the NFC review landing page for your business.
// Update these values and redeploy — no other files need to change.

export const siteConfig = {
  /** Business name shown under the logo. */
  businessName: "ANK Nails Beauty&More",

  /**
   * Logo shown at the top of the page.
   *
   * NOTE: the Instagram CDN URL you get from a profile picture is a signed
   * link (it has `oe=`/`oh=` expiry params) and WILL stop working after a
   * while. For a permanent logo, download the image, save it as
   * `public/logo.jpg`, and change this to "/logo.jpg".
   */
  logoUrl:
    "/nails.jpg",

  /** Opens the native Google review prompt for your business/place. */
  googleReviewUrl:
    "https://www.google.com/maps/place/Theaterpl.+5,+52062+Aachen/@50.7728546,6.0873777,16z/data=!3m1!4b1!4m6!3m5!1s0x47c09962fe3af6a3:0xe3c88de42ea8b549!8m2!3d50.7728546!4d6.0873777!16s%2Fg%2F11b8v5_gv0!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D",

  /**
   * Where private (1-3 star) feedback gets delivered. Used as the
   * display/reply-to address; the actual delivery is configured via
   * WEB3FORMS_ACCESS_KEY in your environment (see README).
   */
  privateFeedbackEmail: "owner@nimabreakfastmore.com",

  socialLinks: {
    instagram: "https://www.instagram.com/ank_nails96/",
    booking: "https://booksy.com/yourlink",
  },

  /** "en" or "de" — controls which language the page opens in by default. */
  defaultLanguage: "en" as const,
} satisfies {
  businessName: string;
  logoUrl: string;
  googleReviewUrl: string;
  privateFeedbackEmail: string;
  socialLinks: { instagram: string; booking: string };
  defaultLanguage: "en" | "de";
};

export type SiteConfig = typeof siteConfig;
