"use strict";

/**
 * Construit un lien "click-to-chat" WhatsApp pré-rempli.
 * C'est l'approche 100% conforme aux CGU WhatsApp pour de la prospection :
 * le lien ouvre une conversation avec le message déjà écrit, mais c'est
 * toujours vous qui cliquez sur "Envoyer" — aucun envoi automatique en masse.
 * Doc : https://faq.whatsapp.com/425247423114725 (click to chat)
 */
function buildWaLink(phoneE164, message) {
  if (!phoneE164) return null;
  const digits = phoneE164.replace(/[^\d]/g, ""); // wa.me veut le numéro sans "+"
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Génère une page HTML autonome listant les leads avec un bouton par lead
 * qui ouvre WhatsApp avec le message déjà rédigé.
 */
function buildHtmlPage(rows) {
  const items = rows
    .map(
      (r) => `
      <tr>
        <td>${escapeHtml(r.name)}</td>
        <td>${escapeHtml(r.city)}</td>
        <td>${escapeHtml(r.phone)}</td>
        <td class="msg">${escapeHtml(r.message)}</td>
        <td>${
          r.link
            ? `<a class="btn" href="${r.link}" target="_blank" rel="noopener">Envoyer sur WhatsApp</a>`
            : `<span class="muted">Pas de numéro exploitable</span>`
        }</td>
      </tr>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Messages WhatsApp à envoyer — Caractère</title>
<style>
  body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; background: #fafafa; color: #1a1a1a; }
  h1 { font-size: 1.3rem; }
  p.help { color: #555; max-width: 700px; }
  table { border-collapse: collapse; width: 100%; background: white; }
  th, td { border: 1px solid #e0e0e0; padding: 8px 10px; font-size: 0.9rem; vertical-align: top; }
  th { background: #f0f0f0; text-align: left; }
  td.msg { max-width: 420px; white-space: pre-wrap; color: #333; }
  .btn { display: inline-block; background: #25D366; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; white-space: nowrap; }
  .btn:hover { background: #1ebe5b; }
  .muted { color: #999; font-style: italic; }
</style>
</head>
<body>
  <h1>Messages WhatsApp pré-remplis — Caractère</h1>
  <p class="help">Cliquez sur "Envoyer sur WhatsApp" pour ouvrir la conversation avec
  le message déjà écrit, puis validez l'envoi vous-même dans WhatsApp. Rien n'est
  envoyé automatiquement depuis cette page.</p>
  <table>
    <thead><tr><th>Entreprise</th><th>Ville</th><th>Téléphone</th><th>Message</th><th></th></tr></thead>
    <tbody>
      ${items}
    </tbody>
  </table>
</body>
</html>
`;
}

module.exports = { buildWaLink, buildHtmlPage };
