# leadgen-caractere

Outil de prospection pour **Caractère** (textile personnalisé : t-shirts,
polos, gilets, tote bags). Il permet de :

1. **Trouver des leads** — entreprises, clubs, associations, écoles,
   agences événementielles... susceptibles de commander des textiles
   personnalisés — via l'API officielle Google Places, ou en important vos
   propres listes en CSV.
2. **Compléter les emails manquants** en cherchant sur le site public de
   chaque lead (best effort).
3. **Générer des emails personnalisés** et les envoyer via SendGrid.
4. **Générer des messages WhatsApp pré-remplis** (liens `wa.me`) que vous
   envoyez vous-même d'un clic.

Le tout est un outil en ligne de commande autonome, séparé du site
mokayakoubi.vercel.app — pas de scraping de Google Maps ou LinkedIn, qui
violerait leurs CGU et exposerait à des blocages : tout repose sur des API
officielles ou vos propres données.

---

## ⚖️ À lire avant utilisation (conformité)

- **Emails B2B (CNIL)** — la prospection par email à des professionnels
  (entreprises, associations) est autorisée en France sans consentement
  préalable **si** : (1) le message concerne l'activité professionnelle du
  destinataire, (2) l'expéditeur est clairement identifié, (3) le
  destinataire peut se désinscrire facilement. Le modèle fourni respecte ces
  points — pensez à traiter toute réponse "STOP" avec `node cli.js optout`.
- **WhatsApp** — l'envoi automatisé en masse via des outils non-officiels
  viole les CGU de WhatsApp et peut faire bannir votre numéro. Cet outil ne
  fait **que générer des liens pré-remplis** : c'est vous qui cliquez et
  validez l'envoi dans WhatsApp, message par message.
- **Enrichissement d'emails** — `enrich:emails` va uniquement consulter le
  site public du lead lui-même (pas d'annuaire tiers), avec une pause entre
  chaque requête. Utilisez `--limit` pour rester raisonnable.
- Ces outils ciblent des **professionnels** (personnes morales) dans le
  cadre d'une activité B2B, pas des particuliers.

---

## Installation

```bash
cd leadgen-caractere
npm install
cp .env.example .env
# Renseignez GOOGLE_PLACES_API_KEY, SENDGRID_API_KEY, FROM_EMAIL, etc.
```

- **Google Places API** : créez un projet sur
  [console.cloud.google.com](https://console.cloud.google.com/), activez
  "Places API (New)", créez une clé API. Quota gratuit mensuel ($200 offerts
  chaque mois côté Google au moment de l'écriture), puis facturation à
  l'usage.
- **SendGrid** : créez un compte sur [sendgrid.com](https://sendgrid.com),
  générez une clé API (Settings → API Keys), et vérifiez votre domaine ou
  adresse d'envoi (Sender Authentication) pour éviter le spam.

Node.js 18 ou plus est requis (utilise `fetch` natif).

---

## Utilisation — workflow type

### 1. Trouver des leads

```bash
node cli.js search:places --query "club de sport à Lyon"
node cli.js search:places --query "comité d'entreprise à Villeurbanne"
node cli.js search:places --query "agence événementielle à Lyon"
node cli.js search:places --query "boutique de sport à Lyon"
```

Idées de secteurs pertinents pour Caractère : clubs sportifs, associations
loi 1901, comités d'entreprise (CE/CSE), écoles/collèges/lycées, agences
événementielles, mairies et collectivités, entreprises du BTP (vêtements de
travail), hôtels/restaurants (tenues de service), salles de sport,
start-ups/PME (goodies d'entreprise).

Ou importez vos propres listes :

```bash
node cli.js import:csv sample/leads-exemple.csv
```

Colonnes acceptées : `name, category, city, address, phone, email, website`
(alias français aussi reconnus : `nom, secteur, ville, adresse, telephone`).

### 2. Vérifier / compléter

```bash
node cli.js stats
node cli.js list --status new
node cli.js enrich:emails --limit 20
```

### 3. Emails

```bash
node cli.js email:preview --limit 20        # génère out/emails-preview.html, rien n'est envoyé
node cli.js email:send --dry-run --limit 20 # simule l'envoi dans la console
node cli.js email:send --limit 20           # envoi réel via SendGrid
```

Le modèle est dans `templates/email-fr.txt` — modifiez-le librement (la
première ligne `SUBJECT: ...` définit l'objet). Placeholders disponibles :
`{{lead_name}}`, `{{company}}`, `{{city}}`, `{{category}}`,
`{{signature_name}}`, `{{signature_phone}}`, `{{unsubscribe}}`.

### 4. WhatsApp

```bash
node cli.js whatsapp:generate --limit 50
```

Ouvrez ensuite `out/whatsapp-links.html` dans votre navigateur : chaque
ligne a un bouton "Envoyer sur WhatsApp" qui ouvre la conversation avec le
message déjà écrit — il ne reste qu'à cliquer sur Envoyer dans WhatsApp.

Modèle personnalisable dans `templates/whatsapp-fr.txt`.

### 5. Export

```bash
node cli.js export:csv
```

### 6. Désinscription

```bash
node cli.js optout contact@exemple.fr
```

---

## Où sont stockées les données ?

- `data/leads.json` — base de leads (créée automatiquement, jamais commitée
  dans git).
- `data/optout.json` — liste des emails à ne plus contacter.
- `out/` — fichiers générés (aperçus, exports, liens WhatsApp).

Chaque lead a un statut : `new`, `contacted_email`, `contacted_whatsapp`,
que vous pouvez faire évoluer manuellement (`responded`, `won`, `lost`...)
en éditant `data/leads.json` ou via de futures commandes.

---

## Aller plus loin (idées d'évolutions)

- Ajouter un statut `responded` / `won` / `lost` mis à jour manuellement
  pour suivre le pipeline commercial.
- Brancher l'API [recherche-entreprises.api.gouv.fr](https://recherche-entreprises.api.gouv.fr/)
  (gratuite, sans clé) pour repérer des associations/entreprises par code
  NAF avant de les chercher sur Google Places.
- Passer à l'API officielle WhatsApp Business (Meta) si le volume justifie
  un envoi semi-automatique avec templates pré-approuvés et opt-in.
