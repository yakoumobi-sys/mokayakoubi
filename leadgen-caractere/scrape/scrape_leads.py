#!/usr/bin/env python3
"""
scrape_leads.py — extraction de leads via ScrapeGraphAI (extraction web
pilotée par IA), pour compléter les recherches Google Places de
leadgen-caractere sur des pages qui ne sont pas dans Google Maps
(annuaires professionnels, chambres de commerce, pages de fédérations
sportives, listes d'adhérents publiques, etc.).

⚖️ ScrapeGraphAI n'est qu'un moteur d'extraction : la légalité dépend du
site ciblé, pas de l'outil. Avant de scraper une URL :
  - ce script vérifie robots.txt et refuse les URLs explicitement
    interdites au scraping ;
  - ciblez des annuaires/pages publiques qui n'interdisent pas la
    collecte automatisée dans leurs CGU (beaucoup d'annuaires
    professionnels l'autorisent) ;
  - évitez les plateformes qui l'interdisent explicitement dans leurs CGU
    (LinkedIn, Google Maps/Search, Facebook...) — pour Google Maps,
    utilisez plutôt `node cli.js search:places` qui passe par l'API
    officielle.
  - restez raisonnable en fréquence (une pause est appliquée entre deux
    URLs).

Usage :
    python scrape_leads.py --url "https://exemple.dz/annuaire/clubs-alger" \\
        --prompt "Liste tous les clubs sportifs avec nom, téléphone, email, adresse" \\
        --output out/scraped-leads.csv

    python scrape_leads.py --urls-file urls-exemple.txt --output out/scraped-leads.csv

Le CSV produit a les mêmes colonnes que celles attendues par la CLI Node :
    name, category, city, address, phone, email, website
Importez-le ensuite avec :
    node ../cli.js import:csv scrape/out/scraped-leads.csv
"""

import argparse
import csv
import os
import sys
import time
import urllib.request
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv(Path(__file__).parent / ".env")

DEFAULT_PROMPT = (
    "Extrait la liste des entreprises, associations, clubs ou organisations "
    "présentes sur cette page, avec pour chacune : son nom, son secteur "
    "d'activité, sa ville, son adresse complète, son numéro de téléphone, "
    "son email et son site web si disponibles. Ignore les entrées sans nom."
)

USER_AGENT = "leadgen-caractere-scraper/1.0 (prospection textile personnalise; +contact via l'entreprise)"


class Lead(BaseModel):
    name: str
    category: str = ""
    city: str = ""
    address: str = ""
    phone: str = ""
    email: str = ""
    website: str = ""


class LeadList(BaseModel):
    leads: list[Lead]


def robots_allows(url: str) -> bool:
    """Vérifie robots.txt du domaine avant de scraper.

    On récupère nous-mêmes le fichier avec notre propre User-Agent plutôt
    que de laisser RobotFileParser.read() faire la requête : celui-ci utilise
    le User-Agent par défaut de Python, que beaucoup de sites (Wikipédia
    compris) rejettent avec un 403 — et RobotFileParser interprète alors un
    401/403 comme "tout est interdit", ce qui bloquerait à tort des sites
    dont le vrai robots.txt n'interdit rien. En cas de doute (robots.txt
    injoignable ou erreur réseau), on autorise par défaut mais on le signale.
    """
    parsed = urlparse(url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    parser = RobotFileParser()
    parser.set_url(robots_url)
    try:
        req = urllib.request.Request(robots_url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode("utf-8", errors="replace")
        parser.parse(content.splitlines())
    except HTTPError as err:
        if err.code == 404:
            return True  # Pas de robots.txt = pas de restriction.
        print(f"  (robots.txt injoignable pour {parsed.netloc} [{err.code}], on continue avec prudence)")
        return True
    except Exception:
        print(f"  (robots.txt injoignable pour {parsed.netloc}, on continue avec prudence)")
        return True
    return parser.can_fetch(USER_AGENT, url)


def build_graph_config():
    return {
        "llm": {
            "model": os.environ.get("SCRAPEGRAPH_MODEL", "openai/gpt-4o-mini"),
            "api_key": os.environ.get("OPENAI_API_KEY", ""),
        },
        "verbose": False,
        "headless": True,
    }


def extract_leads(result) -> list[dict]:
    """Normalise la sortie de ScrapeGraphAI (qui peut varier selon la
    version de la librairie et le modèle) vers une simple liste de dicts."""
    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        if "leads" in result and isinstance(result["leads"], list):
            return result["leads"]
        # Certains modèles renvoient directement une liste sous une autre clé.
        for value in result.values():
            if isinstance(value, list):
                return value
        # Un seul lead renvoyé comme objet plat.
        if "name" in result:
            return [result]
    return []


def scrape_one(url: str, prompt: str) -> list[dict]:
    from scrapegraphai.graphs import SmartScraperGraph

    graph = SmartScraperGraph(
        prompt=prompt,
        source=url,
        schema=LeadList,
        config=build_graph_config(),
    )
    result = graph.run()
    leads = extract_leads(result)
    for lead in leads:
        lead.setdefault("source", "scrapegraphai")
        lead.setdefault("notes", f"Scrapé depuis {url}")
    return leads


def write_csv(leads: list[dict], output_path: Path):
    columns = ["name", "category", "city", "address", "phone", "email", "website", "source", "notes"]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        for lead in leads:
            writer.writerow({c: lead.get(c, "") for c in columns})


def main():
    parser = argparse.ArgumentParser(description="Extraction de leads via ScrapeGraphAI")
    parser.add_argument("--url", action="append", default=[], help="URL à scraper (répétable)")
    parser.add_argument("--urls-file", help="Fichier texte avec une URL par ligne")
    parser.add_argument("--prompt", default=DEFAULT_PROMPT, help="Instruction d'extraction pour le modèle")
    parser.add_argument("--output", default="out/scraped-leads.csv", help="Fichier CSV de sortie")
    parser.add_argument("--pause", type=float, default=2.0, help="Pause en secondes entre deux URLs")
    args = parser.parse_args()

    urls = list(args.url)
    if args.urls_file:
        with open(args.urls_file, encoding="utf-8") as f:
            urls += [line.strip() for line in f if line.strip() and not line.startswith("#")]

    if not urls:
        parser.error("Fournissez au moins une URL via --url ou --urls-file")

    try:
        import scrapegraphai  # noqa: F401
    except ImportError:
        print("ScrapeGraphAI n'est pas installé. Lancez : pip install -r requirements.txt")
        sys.exit(1)

    all_leads: list[dict] = []
    skipped = 0

    for i, url in enumerate(urls, start=1):
        print(f"[{i}/{len(urls)}] {url}")
        if not robots_allows(url):
            print("  -> robots.txt interdit le scraping de cette URL, on l'ignore.")
            skipped += 1
            continue
        try:
            leads = scrape_one(url, args.prompt)
            print(f"  -> {len(leads)} lead(s) extrait(s)")
            all_leads.extend(leads)
        except Exception as err:
            print(f"  -> échec: {err}")
        if i < len(urls):
            time.sleep(args.pause)

    output_path = Path(args.output)
    write_csv(all_leads, output_path)
    print(
        f"\nTerminé. {len(all_leads)} lead(s) écrit(s) dans {output_path}"
        f" ({skipped} URL(s) ignorée(s) par robots.txt)."
    )
    print(f"Importez-les avec : node ../cli.js import:csv {output_path}")


if __name__ == "__main__":
    main()
