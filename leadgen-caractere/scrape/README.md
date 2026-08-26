# Extraction de leads via ScrapeGraphAI

Composant Python séparé (l'outil principal `leadgen-caractere` est en
Node.js) qui utilise [ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)
pour extraire des leads de pages web via une simple instruction en langage
naturel, plutôt que d'écrire un parseur HTML dédié à chaque site.

Utile pour les sources qui ne sont pas dans Google Maps : pages de
fédérations sportives listant leurs clubs affiliés, annuaires de chambres
de commerce, pages "nos membres/adhérents" d'associations professionnelles,
listes d'exposants d'un salon, etc.

---

## ⚖️ À lire avant utilisation

ScrapeGraphAI n'est qu'un moteur d'extraction : **la légalité dépend du
site que vous ciblez, pas de l'outil**.

- Le script vérifie automatiquement `robots.txt` du domaine avant de
  scraper une URL, et ignore celles qui l'interdisent explicitement.
- Ciblez des pages publiques (annuaires professionnels, fédérations,
  chambres de commerce...) dont les CGU n'interdisent pas la collecte
  automatisée — beaucoup d'annuaires professionnels l'autorisent
  implicitement puisqu'ils existent pour être consultés/référencés.
- **N'utilisez pas ce script sur des plateformes qui interdisent
  explicitement le scraping dans leurs CGU** (LinkedIn, Facebook,
  Google Maps/Search...) : le blocage de `robots.txt` ne couvre pas tout,
  et ces sites peuvent bannir votre IP ou engager des poursuites. Pour
  Google Maps, utilisez plutôt `node ../cli.js search:places` (API
  officielle).
- Une pause est appliquée entre deux URLs (`--pause`, 2s par défaut) —
  restez raisonnable sur le volume et la fréquence.
- Vérifiez toujours manuellement un échantillon des résultats : un modèle
  peut se tromper ou halluciner un champ (téléphone, email) — ne les
  utilisez pas sans un contrôle rapide de plausibilité.

---

## Installation

```bash
cd scrape
python3 -m venv .venv && source .venv/bin/activate   # optionnel mais recommandé
pip install -r requirements.txt
cp .env.example .env
```

Par défaut, le script utilise un modèle OpenAI (`openai/gpt-4o-mini`) —
renseignez `OPENAI_API_KEY` dans `.env`. Pour ne pas dépendre d'une API
payante, vous pouvez utiliser un modèle local via
[Ollama](https://ollama.com/) : installez Ollama, faites
`ollama pull llama3`, puis dans `.env` :

```
SCRAPEGRAPH_MODEL=ollama/llama3
```

Certaines pages nécessitent JavaScript pour afficher leur contenu ; si
l'extraction renvoie 0 résultat sur une page qui a manifestement du
contenu, installez le navigateur headless utilisé par ScrapeGraphAI :

```bash
playwright install chromium
```

---

## Utilisation

Une seule URL :

```bash
python scrape_leads.py \
  --url "https://exemple.dz/annuaire/clubs-alger" \
  --prompt "Liste tous les clubs sportifs avec nom, téléphone, email, adresse" \
  --output out/leads.csv
```

Plusieurs URLs depuis un fichier (voir `urls-exemple.txt`) :

```bash
python scrape_leads.py --urls-file mes-urls.txt --output out/leads.csv
```

Sans `--prompt`, une instruction générique adaptée à la prospection
Caractère est utilisée (extraire nom, secteur, ville, adresse, téléphone,
email, site web de chaque organisation trouvée sur la page).

Puis réimportez le résultat dans le store principal :

```bash
cd ..
node cli.js import:csv scrape/out/leads.csv
```

Le dédoublonnage (téléphone / site web / nom+ville) est géré automatiquement
par `import:csv`, comme pour toute autre source.

---

## Dépannage

- `ScrapeGraphAI n'est pas installé` → `pip install -r requirements.txt`
  (relancez dans le bon environnement virtuel si vous en utilisez un).
- 0 lead extrait sur une page qui contient visiblement des infos → la page
  est probablement rendue en JavaScript (voir `playwright install`
  ci-dessus), ou le prompt est trop vague : précisez la structure attendue
  ("chaque club a un nom, une adresse, un téléphone dans un encart...").
- Erreur d'authentification API → vérifiez `OPENAI_API_KEY` dans `.env`, ou
  passez à un modèle Ollama local si vous ne voulez pas de clé payante.
