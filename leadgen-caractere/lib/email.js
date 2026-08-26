"use strict";

/**
 * Envoi d'emails via l'API REST SendGrid (pas de SDK, un simple appel fetch
 * pour éviter une dépendance supplémentaire).
 * Doc : https://docs.sendgrid.com/api-reference/mail-send/mail-send
 */
async function sendEmail({ apiKey, fromEmail, fromName, to, subject, text }) {
  if (!apiKey) throw new Error("SENDGRID_API_KEY manquant dans .env");
  if (!to) throw new Error("Adresse email du destinataire manquante");

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: fromEmail, name: fromName },
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`SendGrid a répondu ${res.status}: ${body}`);
  }
  return true;
}

module.exports = { sendEmail };
