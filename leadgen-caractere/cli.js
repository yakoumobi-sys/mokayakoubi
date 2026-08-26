#!/usr/bin/env node
"use strict";

require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const fs = require("fs");
const path = require("path");

const store = require("./lib/store");
const { parseCSV, stringifyCSV } = require("./lib/csv");
const places = require("./lib/places");
const { findEmailOnWebsite } = require("./lib/enrich");
const { renderEmail, renderWhatsapp } = require("./lib/templates");
const { sendEmail } = require("./lib/email");
const { buildWaLink, buildHtmlPage } = require("./lib/whatsapp");
const { toE164 } = require("./lib/phone");

const OUT_DIR = path.join(__dirname, "out");

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

function ensureOutDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

function printHelp() {
  console.log(`
leadgen-caractere — prospection textile personnalisé (Caractère)

Commandes disponibles :

  search:places --query "<texte libre>" [--city "Alger"] [--category "..."] [--max-pages 3]
      Cherche des entreprises via l'API officielle Google Places (fonctionne
      pour n'importe quel pays/ville, il suffit de l'indiquer dans --query).
      --city force la ville enregistrée sur chaque lead trouvé (utile pour
      {{city}} dans les messages et pour filtrer plus tard).
      Exemple : node cli.js search:places --query "club de sport à Alger" --city Alger

  search:batch [fichier.json] [--max-pages 2] [--pause 1500]
      Enchaîne plusieurs recherches Google Places définies dans un fichier
      JSON (par défaut : config/plan-algerie.json, qui couvre déjà Alger,
      Oran, Constantine, Annaba, Sétif, Blida, Tizi Ouzou, Béjaïa et Tlemcen
      sur les secteurs clubs sportifs, associations, écoles privées, agences
      événementielles et salles des fêtes). Modifiez ce fichier ou fournissez
      le vôtre pour cibler d'autres villes/secteurs.
      Attention au quota/coût de l'API Google Places sur un gros lot.

  show <id>
      Affiche le détail complet d'un lead (toutes les colonnes + notes).

  status <id> <nouveau_statut>
      Change le statut d'un lead (ex: responded, won, lost) sans éditer
      data/leads.json à la main.

  import:csv <fichier.csv>
      Importe des leads depuis un fichier CSV (colonnes: name, category,
      city, address, phone, email, website — voir sample/leads-exemple.csv).

  export:csv [fichier.csv]
      Exporte tous les leads actuels en CSV (défaut: out/leads-export.csv).

  enrich:emails [--limit 20]
      Tente de trouver un email de contact sur le site web des leads qui
      n'en ont pas encore (best effort, requêtes au site du lead lui-même).

  list [--status new]
      Affiche les leads en base (filtrable par statut).

  stats
      Affiche un résumé du nombre de leads par statut.

  email:preview [--limit 20] [--status new]
      Génère un aperçu HTML des emails personnalisés sans rien envoyer.
      Fichier produit : out/emails-preview.html

  email:send [--limit 20] [--status new] [--dry-run]
      Envoie réellement les emails via SendGrid (respecte la liste
      d'opposition). Sans --dry-run, marque les leads comme "contacted_email".

  whatsapp:generate [--limit 50] [--status new]
      Génère out/whatsapp-links.html et out/whatsapp-links.csv avec un
      message WhatsApp pré-rempli par lead (envoi manuel, aucune automatisation).

  optout <email>
      Ajoute une adresse à la liste de désinscription (à faire pour toute
      demande "STOP" reçue par email).

Configuration : copiez .env.example en .env et renseignez vos clés.
`);
}

async function cmdSearchPlaces(args) {
  const query = args.query;
  if (!query) {
    console.error('Merci de préciser --query "<texte de recherche>"');
    process.exit(1);
  }
  console.log(`Recherche Google Places pour: "${query}"...`);
  const results = await places.searchText({
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    textQuery: query,
    maxPages: Number(args["max-pages"] || 3),
    city: args.city,
    category: args.category,
  });
  const leads = results.map((r) => ({ ...r, phoneE164: r.phoneE164 || toE164(r.phone) }));
  const { added, updated } = store.upsertLeads(leads);
  console.log(`Trouvé ${results.length} résultat(s). Nouveaux leads: ${added}, complétés: ${updated}.`);
}

async function cmdSearchBatch(args) {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    console.error("GOOGLE_PLACES_API_KEY manquant. Ajoutez-le dans votre fichier .env (voir .env.example).");
    process.exit(1);
  }
  const file = args._[1] && !args._[1].startsWith("--")
    ? args._[1]
    : path.join(__dirname, "config", "plan-algerie.json");
  if (!fs.existsSync(file)) {
    console.error(`Fichier introuvable: ${file}`);
    process.exit(1);
  }
  const plan = JSON.parse(fs.readFileSync(file, "utf8"));
  const maxPages = Number(args["max-pages"] || 2);
  const pause = Number(args.pause || 1500);

  console.log(`Plan de ${plan.length} recherche(s) chargé depuis ${file}.\n`);

  let totalAdded = 0;
  let totalUpdated = 0;

  for (let i = 0; i < plan.length; i++) {
    const entry = plan[i];
    process.stdout.write(`[${i + 1}/${plan.length}] "${entry.query}"... `);
    try {
      const results = await places.searchText({
        apiKey: process.env.GOOGLE_PLACES_API_KEY,
        textQuery: entry.query,
        maxPages,
        city: entry.city,
        category: entry.category,
      });
      const leads = results.map((r) => ({ ...r, phoneE164: r.phoneE164 || toE164(r.phone) }));
      const { added, updated } = store.upsertLeads(leads);
      totalAdded += added;
      totalUpdated += updated;
      console.log(`${results.length} résultat(s) — ${added} nouveaux, ${updated} complétés.`);
    } catch (err) {
      console.log(`échec: ${err.message}`);
    }
    if (i < plan.length - 1) await new Promise((r) => setTimeout(r, pause));
  }

  console.log(`\nTerminé. Total: ${totalAdded} nouveaux leads, ${totalUpdated} complétés.`);
}

function cmdShow(args) {
  const id = args._[1];
  if (!id) {
    console.error("Usage: node cli.js show <id>");
    process.exit(1);
  }
  const lead = store.loadLeads().find((l) => l.id === id);
  if (!lead) {
    console.error(`Aucun lead avec l'id ${id}`);
    process.exit(1);
  }
  for (const [key, value] of Object.entries(lead)) {
    console.log(`${key.padEnd(14)}: ${value === undefined || value === "" ? "-" : value}`);
  }
}

function cmdStatus(args) {
  const id = args._[1];
  const newStatus = args._[2];
  if (!id || !newStatus) {
    console.error("Usage: node cli.js status <id> <nouveau_statut>");
    process.exit(1);
  }
  const lead = store.updateLead(id, { status: newStatus });
  if (!lead) {
    console.error(`Aucun lead avec l'id ${id}`);
    process.exit(1);
  }
  console.log(`${lead.name}: statut mis à jour -> ${newStatus}`);
}

function cmdImportCsv(args) {
  const file = args._[1];
  if (!file) {
    console.error("Usage: node cli.js import:csv <fichier.csv>");
    process.exit(1);
  }
  const text = fs.readFileSync(file, "utf8");
  const rows = parseCSV(text).map((r) => ({ ...r, source: r.source || "csv" }));
  const { added, updated } = store.upsertLeads(rows);
  console.log(`Import terminé. Nouveaux leads: ${added}, complétés: ${updated}.`);
}

function cmdExportCsv(args) {
  ensureOutDir();
  const out = args._[1] || path.join(OUT_DIR, "leads-export.csv");
  const leads = store.loadLeads();
  const columns = [
    "id", "name", "category", "city", "address", "phone", "email",
    "website", "status", "source", "notes", "createdAt", "updatedAt",
  ];
  fs.writeFileSync(out, stringifyCSV(leads, columns), "utf8");
  console.log(`Export écrit dans ${out} (${leads.length} leads).`);
}

async function cmdEnrichEmails(args) {
  const limit = Number(args.limit || 20);
  const leads = store.loadLeads();
  const targets = leads.filter((l) => l.website && !l.email).slice(0, limit);
  console.log(`Recherche d'email sur ${targets.length} site(s) web...`);
  let found = 0;
  for (const lead of targets) {
    const email = await findEmailOnWebsite(lead.website);
    if (email) {
      store.updateLead(lead.id, { email });
      found += 1;
      console.log(`  ✓ ${lead.name}: ${email}`);
    } else {
      console.log(`  – ${lead.name}: aucun email trouvé`);
    }
    // Pause polie entre deux sites pour ne pas les solliciter trop vite.
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log(`Terminé. ${found} email(s) trouvé(s) sur ${targets.length}.`);
}

function cmdList(args) {
  const leads = store.loadLeads();
  const filtered = args.status ? leads.filter((l) => l.status === args.status) : leads;
  if (filtered.length === 0) {
    console.log("Aucun lead trouvé.");
    return;
  }
  for (const l of filtered) {
    console.log(
      `${l.id}  ${(l.status || "new").padEnd(18)}  ${(l.name || "").slice(0, 30).padEnd(30)}  ${(l.city || "").padEnd(15)}  ${l.phone || "-"}  ${l.email || "-"}`
    );
  }
  console.log(`\n${filtered.length} lead(s) affiché(s) sur ${leads.length} au total.`);
}

function cmdStats() {
  const stats = store.getStats();
  console.log(`Total leads: ${stats.total}`);
  for (const [status, count] of Object.entries(stats.by_status)) {
    console.log(`  - ${status}: ${count}`);
  }
}

function cmdEmailPreview(args) {
  ensureOutDir();
  const limit = Number(args.limit || 20);
  const leads = store
    .loadLeads()
    .filter((l) => l.email)
    .filter((l) => !args.status || l.status === args.status)
    .slice(0, limit);

  const blocks = leads.map((lead) => {
    const { subject, body } = renderEmail(lead, process.env);
    return `<h3>${subject}</h3><p><b>À :</b> ${lead.email} (${lead.name})</p><pre>${body.replace(/</g, "&lt;")}</pre><hr/>`;
  });
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Aperçu emails</title></head><body>${blocks.join("\n") || "<p>Aucun lead avec email.</p>"}</body></html>`;
  const out = path.join(OUT_DIR, "emails-preview.html");
  fs.writeFileSync(out, html, "utf8");
  console.log(`Aperçu de ${leads.length} email(s) écrit dans ${out}`);
}

async function cmdEmailSend(args) {
  const limit = Number(args.limit || 20);
  const dryRun = Boolean(args["dry-run"]);
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || "Caractère";

  if (!dryRun && !apiKey) {
    console.error("SENDGRID_API_KEY manquant dans .env (ou utilisez --dry-run).");
    process.exit(1);
  }

  const leads = store
    .loadLeads()
    .filter((l) => l.email && !store.isOptedOut(l.email))
    .filter((l) => !args.status || l.status === args.status)
    .filter((l) => l.status !== "contacted_email")
    .slice(0, limit);

  console.log(`${leads.length} lead(s) à traiter${dryRun ? " (mode --dry-run, rien n'est envoyé)" : ""}.`);

  for (const lead of leads) {
    const { subject, body } = renderEmail(lead, process.env);
    if (dryRun) {
      console.log(`  [dry-run] -> ${lead.email} : ${subject}`);
      continue;
    }
    try {
      await sendEmail({ apiKey, fromEmail, fromName, to: lead.email, subject, text: body });
      store.updateLead(lead.id, { status: "contacted_email", lastEmailAt: new Date().toISOString() });
      console.log(`  ✓ envoyé à ${lead.email}`);
    } catch (err) {
      console.error(`  ✗ échec pour ${lead.email}: ${err.message}`);
    }
    // Petite pause pour rester raisonnable vis-à-vis de l'API SendGrid.
    await new Promise((r) => setTimeout(r, 300));
  }
}

function cmdWhatsappGenerate(args) {
  ensureOutDir();
  const limit = Number(args.limit || 50);
  const leads = store
    .loadLeads()
    .filter((l) => !args.status || l.status === args.status)
    .filter((l) => l.status !== "contacted_whatsapp")
    .slice(0, limit);

  const rows = leads.map((lead) => {
    const message = renderWhatsapp(lead, process.env);
    const phoneE164 = lead.phoneE164 || toE164(lead.phone);
    const link = buildWaLink(phoneE164, message);
    return { name: lead.name, city: lead.city, phone: lead.phone, message, link, id: lead.id };
  });

  const htmlOut = path.join(OUT_DIR, "whatsapp-links.html");
  fs.writeFileSync(htmlOut, buildHtmlPage(rows), "utf8");

  const csvOut = path.join(OUT_DIR, "whatsapp-links.csv");
  fs.writeFileSync(
    csvOut,
    stringifyCSV(rows, ["name", "city", "phone", "message", "link"]),
    "utf8"
  );

  for (const r of rows) {
    if (r.link) store.updateLead(r.id, { status: "contacted_whatsapp", lastWhatsappAt: new Date().toISOString() });
  }

  console.log(`Généré ${rows.length} message(s) WhatsApp.`);
  console.log(`  -> Ouvrez ${htmlOut} dans votre navigateur pour cliquer et envoyer.`);
  console.log(`  -> CSV équivalent : ${csvOut}`);
}

function cmdOptout(args) {
  const email = args._[1];
  if (!email) {
    console.error("Usage: node cli.js optout <email>");
    process.exit(1);
  }
  store.addOptout(email);
  console.log(`${email} ajouté à la liste de désinscription.`);
}

async function main() {
  const [, , command, ...rest] = process.argv;
  const args = parseArgs(rest);
  args._.unshift(command);

  switch (command) {
    case "search:places":
      return cmdSearchPlaces(args);
    case "search:batch":
      return cmdSearchBatch(args);
    case "show":
      return cmdShow(args);
    case "status":
      return cmdStatus(args);
    case "import:csv":
      return cmdImportCsv(args);
    case "export:csv":
      return cmdExportCsv(args);
    case "enrich:emails":
      return cmdEnrichEmails(args);
    case "list":
      return cmdList(args);
    case "stats":
      return cmdStats();
    case "email:preview":
      return cmdEmailPreview(args);
    case "email:send":
      return cmdEmailSend(args);
    case "whatsapp:generate":
      return cmdWhatsappGenerate(args);
    case "optout":
      return cmdOptout(args);
    default:
      printHelp();
      if (command && command !== "help") process.exit(1);
  }
}

main().catch((err) => {
  console.error("Erreur:", err.message);
  process.exit(1);
});
