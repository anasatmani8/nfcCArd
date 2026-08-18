import { NextResponse } from "next/server";
import { siteConfig } from "@/config/siteConfig";

export async function POST(request: Request) {
  let body: { rating?: unknown; message?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const rating = Number(body.rating);
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  // No email provider configured yet: accept the submission so the UX keeps
  // working during setup, but make it obvious in the server logs.
  if (!accessKey) {
    console.warn(
      "[feedback] WEB3FORMS_ACCESS_KEY is not set — feedback was received but not emailed. " +
        "See README.md for setup instructions.",
      { rating, message }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New ${rating}-star private feedback for ${siteConfig.businessName}`,
        from_name: siteConfig.businessName,
        email: siteConfig.privateFeedbackEmail,
        rating,
        message,
      }),
    });

    const result = await web3FormsResponse.json();
    if (!web3FormsResponse.ok || !result.success) {
      throw new Error(result?.message ?? "Web3Forms submission failed");
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[feedback] Failed to deliver feedback via Web3Forms", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
