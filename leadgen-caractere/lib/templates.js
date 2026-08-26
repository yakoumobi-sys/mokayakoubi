"use strict";

const fs = require("fs");
const path = require("path");

const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

function render(str, vars) {
  return str.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) =>
    vars[key] !== undefined && vars[key] !== null && vars[key] !== "" ? vars[key] : ""
  );
}

function leadVars(lead, env) {
  return {
    lead_name: lead.name || "",
    company: env.COMPANY_NAME || "Caractère",
    city: lead.city || "",
    category: lead.category || "",
    signature_name: env.SIGNATURE_NAME || env.COMPANY_NAME || "Caractère",
    signature_phone: env.SIGNATURE_PHONE || "",
    unsubscribe: env.UNSUBSCRIBE_CONTACT || env.FROM_EMAIL || "",
  };
}

/**
 * Charge le modèle d'email (fichier texte avec une première ligne
 * "SUBJECT: ...") et le personnalise pour un lead donné.
 */
function renderEmail(lead, env, templateFile = "email-fr.txt") {
  const raw = fs.readFileSync(path.join(TEMPLATES_DIR, templateFile), "utf8");
  const vars = leadVars(lead, env);
  const lines = raw.split("\n");
  let subject = "";
  let bodyStart = 0;
  if (lines[0].startsWith("SUBJECT:")) {
    subject = lines[0].replace("SUBJECT:", "").trim();
    bodyStart = 1;
    // Ignore une ligne vide juste après le sujet.
    if (lines[1] === "") bodyStart = 2;
  }
  const body = lines.slice(bodyStart).join("\n");
  return { subject: render(subject, vars), body: render(body, vars) };
}

function renderWhatsapp(lead, env, templateFile = "whatsapp-fr.txt") {
  const raw = fs.readFileSync(path.join(TEMPLATES_DIR, templateFile), "utf8").trim();
  const vars = leadVars(lead, env);
  return render(raw, vars);
}

module.exports = { render, leadVars, renderEmail, renderWhatsapp, TEMPLATES_DIR };
