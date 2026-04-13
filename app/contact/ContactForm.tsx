"use client";

import { FormEvent, useState } from "react";
import { contactContent } from "@/content/data/contact.data";

type SubmitState = "idle" | "pending" | "success" | "error";
type ContactErrorCode = "validation_error" | "rate_limit_error" | "provider_error" | "unknown_error";

type ContactApiResult = {
  ok: boolean;
  code?: ContactErrorCode;
  message?: string;
};

const API_ERROR_MESSAGES: Record<ContactErrorCode, string> = {
  validation_error: "Please check your inputs and try again.",
  rate_limit_error: "Too many requests. Please try again in a few minutes.",
  provider_error: "Your request could not be sent right now. Please try again later.",
  unknown_error: "Your request could not be sent. Please try again later."
};

const GENERIC_ERROR_MESSAGE = API_ERROR_MESSAGES.unknown_error;

function isContactErrorCode(value: unknown): value is ContactErrorCode {
  return value === "validation_error" || value === "rate_limit_error" || value === "provider_error" || value === "unknown_error";
}

function isContactApiResult(value: unknown): value is ContactApiResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { ok?: unknown; code?: unknown; message?: unknown };
  if (typeof candidate.ok !== "boolean") return false;
  if (candidate.code !== undefined && !isContactErrorCode(candidate.code)) return false;
  if (candidate.message !== undefined && typeof candidate.message !== "string") return false;
  return true;
}

const VALIDATION_MESSAGES = {
  fullName: "Please enter a name with at least 2 characters.",
  email: "Please enter a valid email address.",
  message: "Please enter a message with at least 10 characters."
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#888888",
  display: "block",
  marginBottom: "0.5rem"
};

function getInputStyle(isFocused: boolean, hasError: boolean): React.CSSProperties {
  return {
    fontFamily: "var(--font-montserrat), system-ui, sans-serif",
    fontSize: "0.9rem",
    lineHeight: 1.5,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: isFocused
      ? "1px solid rgba(255,0,255,0.6)"
      : hasError
        ? "1px solid rgba(255,0,255,0.8)"
        : "1px solid rgba(255,255,255,0.12)",
    borderRadius: 0,
    padding: "0.75rem 0",
    width: "100%",
    color: "#F0EBF0",
    outline: "none",
    transition: "border-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  };
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"fullName" | "email" | "message", string>>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      companyWebsite: String(formData.get("companyWebsite") || "").trim()
    };

    const nextFieldErrors: Partial<Record<"fullName" | "email" | "message", string>> = {};

    if (payload.fullName.length < 2) nextFieldErrors.fullName = VALIDATION_MESSAGES.fullName;
    if (!EMAIL_REGEX.test(payload.email)) nextFieldErrors.email = VALIDATION_MESSAGES.email;
    if (payload.message.length < 10) nextFieldErrors.message = VALIDATION_MESSAGES.message;

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setSubmitState("error");
      setErrorMessage("Please check the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setSubmitState("pending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let result: ContactApiResult | null = null;

      try {
        const rawResult: unknown = await response.json();
        if (isContactApiResult(rawResult)) result = rawResult;
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        const mappedMessage = result?.code ? API_ERROR_MESSAGES[result.code] : undefined;
        const uiMessage = mappedMessage || result?.message || GENERIC_ERROR_MESSAGE;
        setSubmitState("error");
        setErrorMessage(uiMessage);
        return;
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage(GENERIC_ERROR_MESSAGE);
    }
  }

  return (
    <form className="space-y-8" aria-label="Contact form" onSubmit={onSubmit} noValidate>

      {contactContent.form.fields.map((field) => {
        const helperId = `${field.id}-help`;
        const errorId = `${field.id}-error`;
        const fieldError = fieldErrors[field.name as "fullName" | "email" | "message"];
        const describedBy = fieldError ? `${helperId} ${errorId}` : helperId;
        const isFocused = focusedField === field.id;

        return (
          <div key={field.id}>
            <label htmlFor={field.id} style={labelStyle}>
              {field.label}{field.required ? " *" : ""}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.name}
                rows={5}
                aria-describedby={describedBy}
                aria-invalid={fieldError ? true : undefined}
                required={field.required}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                style={{ ...getInputStyle(isFocused, Boolean(fieldError)), resize: "none" }}
              />
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                autoComplete={field.type === "email" ? "email" : undefined}
                aria-describedby={describedBy}
                aria-invalid={fieldError ? true : undefined}
                required={field.required}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle(isFocused, Boolean(fieldError))}
              />
            )}

            {field.helperText ? (
              <p id={helperId} style={{ fontSize: "0.72rem", color: "#555555", fontFamily: "var(--font-montserrat), system-ui, sans-serif", marginTop: "0.375rem" }}>
                {field.helperText}
              </p>
            ) : (
              <span id={helperId} className="sr-only">{field.label}</span>
            )}

            {fieldError ? (
              <p
                id={errorId}
                role="alert"
                style={{ fontSize: "0.7rem", color: "#FF00FF", fontFamily: "var(--font-montserrat)", letterSpacing: "0.05em", marginTop: "0.375rem" }}
              >
                {fieldError}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Error summary */}
      {submitState === "error" && errorMessage && Object.keys(fieldErrors).length === 0 ? (
        <p
          role="alert"
          aria-live="assertive"
          style={{ fontSize: "0.75rem", color: "#FF00FF", fontFamily: "var(--font-montserrat)", letterSpacing: "0.05em" }}
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="pt-2">
        <button
          type="submit"
          className="cta-primary"
          disabled={submitState === "pending"}
          style={{ opacity: submitState === "pending" ? 0.6 : 1, cursor: submitState === "pending" ? "not-allowed" : "pointer" }}
        >
          {submitState === "pending" ? "Sending…" : contactContent.form.ctaLabel}
        </button>
      </div>

      {/* Success */}
      {submitState === "success" ? (
        <div
          id="contact-form-status"
          role="status"
          aria-live="polite"
          data-feature="contact-success-message"
          style={{ borderLeft: "1px solid rgba(255,0,255,0.4)", paddingLeft: "1.25rem", marginTop: "1.5rem" }}
        >
          <p style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "1.4rem", fontWeight: 300, color: "#F0EBF0", lineHeight: 1.3 }}>
            {contactContent.form.success.title}
          </p>
          <p style={{ fontSize: "0.82rem", color: "#888888", marginTop: "0.5rem" }}>
            {contactContent.form.success.message}
          </p>
        </div>
      ) : null}

    </form>
  );
}
