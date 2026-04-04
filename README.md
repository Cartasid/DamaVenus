# DamaVenus

## Environment variables (Contact flow)

Der Contact-Flow nutzt `POST /api/contact` und wird vollständig über ENV konfiguriert.

- `CONTACT_PROVIDER`: Versand-Provider (`noop`, `webhook`, `resend`)
- `CONTACT_TO_EMAIL`: Zieladresse für Kontaktanfragen
- `CONTACT_FROM_EMAIL`: Absenderadresse (nur für `resend`)
- `CONTACT_API_KEY`: Optionales Bearer-Token für `webhook`
- `CONTACT_WEBHOOK_URL`: Ziel-Webhook-URL bei `CONTACT_PROVIDER=webhook`
- `RESEND_API_KEY`: API Key bei `CONTACT_PROVIDER=resend`

### Beispiel `.env.local`

```bash
CONTACT_PROVIDER=noop
CONTACT_TO_EMAIL=booking@example.com
# CONTACT_FROM_EMAIL=no-reply@example.com
# CONTACT_WEBHOOK_URL=https://example.com/contact-webhook
# CONTACT_API_KEY=...
# RESEND_API_KEY=...
```

Hinweis: Keine Secrets ins Repository committen. Keys ausschließlich über ENV setzen.
