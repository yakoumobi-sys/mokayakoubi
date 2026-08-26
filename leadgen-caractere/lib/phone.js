"use strict";

/**
 * Normalise un numéro de téléphone au format E.164 (ex: "0555 12 34 56"
 * -> "+21355512 34 56" une fois nettoyé), requis pour construire des liens
 * wa.me valides.
 *
 * `defaultCountryCode` s'applique quand le numéro est en format local
 * (commence par "0", sans indicatif pays) : par défaut celui défini dans
 * .env (DEFAULT_COUNTRY_CODE, ex "213" pour l'Algérie, "33" pour la
 * France). Un numéro déjà international (avec "+" ou préfixé par son
 * indicatif) est toujours respecté tel quel.
 */
function toE164(raw, defaultCountryCode) {
  if (!raw) return null;
  const country = String(defaultCountryCode || process.env.DEFAULT_COUNTRY_CODE || "213").replace(/\D/g, "");

  let digits = String(raw).replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) {
    digits = "+" + digits.slice(1).replace(/\D/g, "");
    return digits.length >= 8 ? digits : null;
  }
  digits = digits.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    // Format international "00213..." -> "+213..."
    return digits.length >= 10 ? "+" + digits.slice(2) : null;
  }
  if (digits.startsWith(country) && digits.length >= 10) {
    // Déjà préfixé par l'indicatif du pays par défaut, sans "+".
    return "+" + digits;
  }
  if (digits.startsWith("0") && digits.length === 10) {
    // Format local classique (Algérie, France, etc.) : on retire le 0
    // initial et on ajoute l'indicatif pays configuré.
    return "+" + country + digits.slice(1);
  }
  if (digits.length >= 8) {
    // Format déjà international sans "+", ou format inconnu : renvoyé en
    // dernier recours préfixé par "+", à vérifier manuellement.
    return "+" + digits;
  }
  return null;
}

module.exports = { toE164 };
