"use client";

import { FormEvent, useState } from "react";
import { contactContent } from "@/content/data/contact.data";

type SubmitState = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      companyWebsite: String(formData.get("companyWebsite") || "")
    };

    setSubmitState("pending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

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
        const isRequired = field.required ? " *" : "";

        return (
          <div className="space-y-1" key={field.id}>
            <label htmlFor={field.id} className="typo-body-s">
              {field.label}
              {isRequired}
            </label>

            {field.type === "textarea" ? (
              <textarea id={field.id} name={field.name} rows={6} className="w-full" aria-describedby={helperId} required={field.required} />
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                autoComplete={field.type === "email" ? "email" : undefined}
                className="w-full"
                aria-describedby={helperId}
                required={field.required}
              />
            )}

            <p id={helperId} className="typo-body-s">
              {field.helperText}
            </p>
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
