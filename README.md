# NFC Review Landing Page

A mobile-first review-gating landing page, built for an NFC card tap: high
ratings get routed to your Google review link, low ratings get captured
privately so you can address the issue before it becomes a public review.

Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4.

## How it works

1. Visitor taps the NFC card → phone opens the deployed URL.
2. They tap 1–5 stars.
   - **4 or 5 stars** → a "Write a review on Google" button appears and opens
     `googleReviewUrl` in a new tab.
   - **1–3 stars** → the Google button stays hidden; a private feedback form
     appears instead ("Tell us what went wrong" + submit). On submit it
     POSTs to `/api/feedback`, which emails it to `privateFeedbackEmail` via
     [Web3Forms](https://web3forms.com), and shows a thank-you confirmation.
3. Footer links to Instagram and your booking page are always visible.
4. A language toggle (EN/PL) switches all UI copy — the default is set by
   `defaultLanguage` in the config.

## 1. Customize your business

Everything you need to change lives in **`src/config/siteConfig.ts`**:

```ts
export const siteConfig = {
  businessName: "nimabreakfastmore",
  logoUrl: "...",                 // see logo note below
  googleReviewUrl: "...",         // your Google review deep link
  privateFeedbackEmail: "...",    // where low-star feedback gets sent
  socialLinks: {
    instagram: "...",
    booking: "...",
  },
  defaultLanguage: "en",          // "en" | "pl"
};
```

Text strings (English + Polish) live in `src/lib/translations.ts` if you
want to tweak wording or add another language.

### ⚠️ About the logo URL

The Instagram CDN link is a **signed, expiring URL** (it has `oe=`/`oh=`
parameters) — it will stop working after a while, and Instagram may also
block hotlinking from other domains. For a permanent, reliable logo:

1. Download the profile picture.
2. Save it as `public/logo.jpg` (or `.png`).
3. Set `logoUrl: "/logo.jpg"` in `siteConfig.ts`.

If the logo URL ever fails to load, the page automatically falls back to a
circular avatar with the business's first initial, so it never shows a
broken image.

## 2. Set up private feedback delivery (Web3Forms)

Low-star feedback is emailed through Web3Forms (free, no backend/SMTP
needed):

1. Go to https://web3forms.com and enter `privateFeedbackEmail` to get a
   free **Access Key** (sent to that inbox).
2. Add it as an environment variable named `WEB3FORMS_ACCESS_KEY`:
   - Locally: copy `.env.example` to `.env.local` and paste the key in.
   - On Vercel/Netlify: add it in the project's Environment Variables
     settings (see deployment steps below).

Until this key is set, the form still works end-to-end (visitors see the
"thank you" screen), but submissions are only logged server-side, not
emailed — check your deployment logs.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and resize your browser (or open dev tools'
device toolbar) to check it on a phone-sized viewport.

## 4. Deploy to Vercel

```bash
npm install -g vercel   # if you don't have it
vercel login
vercel                  # first deploy, follow the prompts
vercel --prod           # promote to your production URL
```

When prompted, or afterwards in the Vercel dashboard
(**Project → Settings → Environment Variables**), add:

```
WEB3FORMS_ACCESS_KEY = <your key>
```

then redeploy (`vercel --prod`) so the API route picks it up.

Vercel will give you a public HTTPS URL like:

```
https://nfc-review-app.vercel.app
```

That URL is what gets written to the NFC tag in the next step.

### Alternative: Netlify

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Add `WEB3FORMS_ACCESS_KEY` under **Site configuration → Environment
variables** in the Netlify dashboard, then redeploy. (Netlify auto-detects
Next.js and wraps the `/api/feedback` route as a serverless function.)

## 5. Program the NFC tag

You need an **NTAG213/215/216** (or similar NFC Forum Type 2) sticker/card
and the free **NFC Tools** app (iOS/Android).

1. Install **NFC Tools** — [iOS](https://apps.apple.com/app/nfc-tools/id1252962749) /
   [Android](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc).
2. Open the app → **Write** tab.
3. Tap **Add a record → URL/URI**.
4. Enter your live deployment URL exactly, e.g.
   `https://nfc-review-app.vercel.app` (must be `https://`, not `http://`).
5. Tap **OK**, then tap **Write**.
6. Hold your phone's NFC antenna against the physical NFC card/tag until
   the app confirms **"Write successful"**.
   - iPhone: the NFC antenna is near the top edge, just under the camera.
   - Android: usually center-back; check your model if it doesn't detect.
7. (Recommended) In NFC Tools, use **Set as read-only** only once you're
   fully done testing — this permanently locks the tag so it can never be
   rewritten (skip this if you might update the URL later).

### Test the tap

1. Lock your phone screen.
2. Hold the phone near the programmed NFC card (top edge for iPhone).
3. A notification/banner should pop up with the link — tap it.
4. Confirm the page loads, the star rating works, and both the high-rating
   and low-rating paths behave as expected on a real device.
5. Test with a second phone (iOS + Android if possible) since NFC read
   behavior differs slightly between platforms — Android usually opens the
   link directly, iPhone shows a notification banner first.

## Project structure

```
src/
  app/
    page.tsx              # main landing page (rating + gating logic)
    layout.tsx             # metadata, fonts
    api/feedback/route.ts  # POST endpoint → Web3Forms
  components/
    StarRating.tsx
    FeedbackForm.tsx
  config/
    siteConfig.ts          # ← business variables live here
  lib/
    translations.ts        # EN/PL copy
```
