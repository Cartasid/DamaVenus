"use client";

import { FormEvent, useState } from "react";
import { contactContent } from "@/content/data/contact.data";

type SubmitState = "idle" | "pending" | "success" | "error";
type ContactErrorCode = "validation_error" | "rate_limit_error" | "provider_error" | "unknown_error";

type ContactApiResult = {
  ok?: boolean;
  code?: ContactErrorCode;
  message?: string;
};

const VALIDATION_MESSAGES = {
  fullName: "Bitte gib einen Namen mit mindestens 2 Zeichen an.",
  email: "Bitte gib eine gültige E-Mail-Adresse an.",
  message: "Bitte gib eine Nachricht mit mindestens 10 Zeichen an."
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"fullName" | "email" | "message", string>>>({});

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

    if (payload.fullName.length < 2) {
      nextFieldErrors.fullName = VALIDATION_MESSAGES.fullName;
    }

    if (!EMAIL_REGEX.test(payload.email)) {
      nextFieldErrors.email = VALIDATION_MESSAGES.email;
    }

    if (payload.message.length < 10) {
      nextFieldErrors.message = VALIDATION_MESSAGES.message;
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setSubmitState("error");
      setErrorMessage("Bitte prüfe die markierten Felder.");
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

      const result = (await response.json()) as ContactApiResult;

      if (!response.ok || !result.ok) {
        setSubmitState("error");
        setErrorMessage(result.message || "Die Anfrage konnte nicht gesendet werden.");
        return;
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.");
    }
  }

  return (
    <form className="space-y-4" aria-label="Contact form" onSubmit={onSubmit}>
      <p className="typo-label">* Pflichtfeld</p>

      {contactContent.form.fields.map((field) => {
        const helperId = `${field.id}-help`;
        const errorId = `${field.id}-error`;
        const fieldError = fieldErrors[field.name as "fullName" | "email" | "message"];
        const describedBy = fieldError ? `${helperId} ${errorId}` : helperId;
        const isRequired = field.required ? " *" : "";

        return (
          <div className="space-y-1" key={field.id}>
            <label htmlFor={field.id} className="typo-body-s">
              {field.label}
              {isRequired}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.name}
                rows={6}
                className="w-full"
                aria-describedby={describedBy}
                aria-invalid={fieldError ? true : undefined}
                required={field.required}
              />
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                autoComplete={field.type === "email" ? "email" : undefined}
                className="w-full"
                aria-describedby={describedBy}
                aria-invalid={fieldError ? true : undefined}
                required={field.required}
              />
            )}

            <p id={helperId} className="typo-body-s">
              {field.helperText}
            </p>
            {fieldError ? (
              <p id={errorId} className="typo-body-s" role="alert">
                {fieldError}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="cta-primary" disabled={submitState === "pending"}>
        {submitState === "pending" ? "Wird gesendet…" : contactContent.form.ctaLabel}
      </button>

      {submitState === "error" ? (
        <p className="typo-body-s" role="alert" aria-live="assertive">
          {errorMessage}
        </p>
      ) : null}

      {submitState === "success" ? (
        <div id="contact-form-status" role="status" aria-live="polite" data-feature="contact-success-message">
          <p className="typo-body-m">{contactContent.form.success.title}</p>
          <p className="typo-body-s">{contactContent.form.success.message}</p>
        </div>
      ) : null}
    </form>
  );
}
