import { NextResponse } from "next/server";

type ContactPayload = {
  fullName: string;
  email: string;
  message: string;
  companyWebsite?: string;
};

type ContactErrorCode = "validation_error" | "rate_limit_error" | "provider_error" | "unknown_error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateMap = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  return realIp?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateMap.get(ip) || []).filter((value) => now - value < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateMap.set(ip, recent);
  return false;
}

function errorResponse(code: ContactErrorCode, message: string, status: number) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

function validatePayload(payload: ContactPayload): string | null {
  const name = payload.fullName?.trim() || "";
  const email = payload.email?.trim() || "";
  const message = payload.message?.trim() || "";
  const companyWebsite = payload.companyWebsite?.trim() || "";

  if (companyWebsite.length > 0) {
    return "Spam protection triggered. Please submit the form again.";
  }

  if (!name || name.length < 2 || name.length > 120) {
    return "Please enter a name with 2 to 120 characters.";
  }

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return "Please enter a message with 10 to 5000 characters.";
  }

  return null;
}

async function sendWithProvider(payload: ContactPayload): Promise<void> {
  const provider = (process.env.CONTACT_PROVIDER || "noop").toLowerCase();

  if (provider === "noop") {
    return;
  }

  if (provider === "webhook") {
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("CONTACT_WEBHOOK_URL is required for CONTACT_PROVIDER=webhook");
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_API_KEY ? { Authorization: `Bearer ${process.env.CONTACT_API_KEY}` } : {})
      },
      body: JSON.stringify({
        to: process.env.CONTACT_TO_EMAIL,
        subject: `New contact inquiry from ${payload.fullName}`,
        payload
      })
    });

    if (!response.ok) {
      throw new Error("Webhook provider request failed");
    }

    return;
  }

  if (provider === "resend") {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
      throw new Error("RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are required for CONTACT_PROVIDER=resend");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New contact inquiry from ${payload.fullName}`,
        text: `Name: ${payload.fullName}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
      })
    });

    if (!response.ok) {
      throw new Error("Resend provider request failed");
    }

    return;
  }

  throw new Error(`Unsupported CONTACT_PROVIDER: ${provider}`);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return errorResponse("rate_limit_error", "Too many requests in a short time. Please try again in a few minutes.", 429);
    }

    const payload = (await request.json()) as ContactPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return errorResponse("validation_error", validationError, 400);
    }

    try {
      await sendWithProvider(payload);
    } catch (error) {
      console.error("Contact provider submit failed", error);
      return errorResponse("provider_error", "Your request could not be sent right now. Please try again later.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submit failed", error);
    return errorResponse("unknown_error", "Your request could not be sent right now. Please try again later.", 500);
  }
}
