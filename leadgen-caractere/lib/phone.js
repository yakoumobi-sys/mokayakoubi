"use strict";

/**
 * Normalise un numéro de téléphone français (ou déjà international) au
 * format E.164 (ex: "06 12 34 56 78" -> "+33612345678"), requis pour
 * construire des liens wa.me valides.
 * Retourne null si le numéro ne ressemble pas à un numéro exploitable.
 */
function toE164FR(raw) {
  if (!raw) return null;
  let digits = String(raw).replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) {
    digits = "+" + digits.slice(1).replace(/\D/g, "");
  } else {
    digits = digits.replace(/\D/g, "");
  }

  if (digits.startsWith("+")) {
    return digits.length >= 8 ? digits : null;
  }
  if (digits.startsWith("0") && digits.length === 10) {
    return "+33" + digits.slice(1);
  }
  if (digits.startsWith("33") && digits.length === 11) {
    return "+" + digits;
  }
  if (digits.length >= 8) {
    // Numéro déjà international sans "+", ou format inconnu : on le renvoie
    // préfixé par "+" en dernier recours, à vérifier manuellement.
    return "+" + digits;
  }
  return null;
}

module.exports = { toE164FR };
