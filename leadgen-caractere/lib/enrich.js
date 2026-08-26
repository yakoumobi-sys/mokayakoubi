"use strict";

/**
 * Enrichissement "best effort" : va chercher une adresse email de contact
 * publique sur le site web du lead lui-même (page d'accueil puis /contact).
 *
 * Contrairement au scraping d'annuaires tiers (LinkedIn, Google Maps...),
 * consulter le site public d'une entreprise pour trouver son email de
 * contact est une pratique courante et non contraire à ses CGU : on ne fait
 * qu'une requête HTTP simple, avec un User-Agent identifié et une pause
 * entre chaque lead pour rester poli avec les serveurs visités.

 */

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const GENERIC_BLOCKLIST = /(example\.com|sentry\.io|wixpress\.com|w3\.org|schema\.org|godaddy\.com)$/i;

async function fetchText(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "leadgen-caractere/1.0 (prospection textile personnalise)" },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractEmails(html) {
  if (!html) return [];
  const matches = html.match(EMAIL_RE) || [];
  const cleaned = matches
    .map((e) => e.toLowerCase())
    .filter((e) => !GENERIC_BLOCKLIST.test(e))
    .filter((e) => !e.endsWith(".png") && !e.endsWith(".jpg"));
  return Array.from(new Set(cleaned));
}

/**
 * Essaie de trouver un email sur le site donné. Retourne le premier email
 * trouvé ou null.
 */
async function findEmailOnWebsite(website) {
  if (!website) return null;
  let base = website.trim();
  if (!/^https?:\/\//i.test(base)) base = "https://" + base;

  const home = await fetchText(base);
  let emails = extractEmails(home);
  if (emails.length > 0) return emails[0];

  for (const path of ["/contact", "/contact-us", "/contactez-nous", "/nous-contacter"]) {
    const url = base.replace(/\/+$/, "") + path;
    const html = await fetchText(url);
    emails = extractEmails(html);
    if (emails.length > 0) return emails[0];
  }
  return null;
}

module.exports = { findEmailOnWebsite, extractEmails };
