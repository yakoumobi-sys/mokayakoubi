"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const OPTOUT_FILE = path.join(DATA_DIR, "optout.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadLeads() {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) return [];
  const raw = fs.readFileSync(LEADS_FILE, "utf8").trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function saveLeads(leads) {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2) + "\n", "utf8");
}

function loadOptouts() {
  ensureDataDir();
  if (!fs.existsSync(OPTOUT_FILE)) return [];
  const raw = fs.readFileSync(OPTOUT_FILE, "utf8").trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function saveOptouts(list) {
  ensureDataDir();
  fs.writeFileSync(OPTOUT_FILE, JSON.stringify(list, null, 2) + "\n", "utf8");
}

function isOptedOut(email) {
  if (!email) return false;
  const list = loadOptouts();
  return list.includes(email.toLowerCase().trim());
}

function addOptout(email) {
  if (!email) return;
  const list = loadOptouts();
  const norm = email.toLowerCase().trim();
  if (!list.includes(norm)) {
    list.push(norm);
    saveOptouts(list);
  }
}

function makeId() {
  return crypto.randomBytes(6).toString("hex");
}

/**
 * Clé de dédoublonnage : on considère qu'un lead existe déjà s'il partage
 * le même téléphone normalisé, ou le même site web, ou le même couple
 * nom+ville (en minuscules, sans accents grossièrement gérés).
 */
function dedupeKey(lead) {
  const norm = (s) => (s || "").toString().trim().toLowerCase();
  if (lead.phoneE164) return `phone:${lead.phoneE164}`;
  if (lead.website) return `site:${norm(lead.website).replace(/\/+$/, "")}`;
  return `namecity:${norm(lead.name)}|${norm(lead.city)}`;
}

/**
 * Fusionne une liste de leads "bruts" (issus d'un import CSV ou d'une
 * recherche Places) dans le store existant, sans créer de doublons.
 * Retourne { added, updated }.
 */
function upsertLeads(rawLeads) {
  const existing = loadLeads();
  const index = new Map(existing.map((l) => [dedupeKey(l), l]));
  let added = 0;
  let updated = 0;
  const now = new Date().toISOString();

  for (const raw of rawLeads) {
    const lead = normalizeLead(raw);
    const key = dedupeKey(lead);
    const found = index.get(key);
    if (found) {
      // On complète les champs manquants sans écraser ce qui existe déjà.
      let changed = false;
      for (const field of ["email", "phone", "phoneE164", "website", "address", "category", "notes"]) {
        if (!found[field] && lead[field]) {
          found[field] = lead[field];
          changed = true;
        }
      }
      if (changed) {
        found.updatedAt = now;
        updated += 1;
      }
    } else {
      lead.id = lead.id || makeId();
      lead.status = lead.status || "new";
      lead.createdAt = now;
      lead.updatedAt = now;
      index.set(key, lead);
      added += 1;
    }
  }

  saveLeads(Array.from(index.values()));
  return { added, updated };
}

function normalizeLead(raw) {
  const { toE164 } = require("./phone");
  const phone = (raw.phone || raw.telephone || raw.nationalPhoneNumber || "").trim();
  return {
    id: raw.id,
    name: (raw.name || raw.nom || raw.entreprise || "").trim(),
    category: (raw.category || raw.secteur || raw.categorie || "").trim(),
    city: (raw.city || raw.ville || "").trim(),
    address: (raw.address || raw.adresse || "").trim(),
    phone: phone,
    phoneE164: raw.phoneE164 || toE164(phone),
    email: (raw.email || "").trim().toLowerCase(),
    website: (raw.website || raw.site || raw.site_web || "").trim(),
    source: raw.source || "import",
    status: raw.status,
    notes: raw.notes || "",
  };
}

function updateLead(id, patch) {
  const leads = loadLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return null;
  Object.assign(lead, patch, { updatedAt: new Date().toISOString() });
  saveLeads(leads);
  return lead;
}

function getStats(leads) {
  const list = leads || loadLeads();
  const stats = { total: list.length, by_status: {} };
  for (const l of list) {
    stats.by_status[l.status || "new"] = (stats.by_status[l.status || "new"] || 0) + 1;
  }
  return stats;
}

module.exports = {
  DATA_DIR,
  LEADS_FILE,
  OPTOUT_FILE,
  loadLeads,
  saveLeads,
  loadOptouts,
  saveOptouts,
  isOptedOut,
  addOptout,
  upsertLeads,
  updateLead,
  normalizeLead,
  getStats,
  dedupeKey,
};
