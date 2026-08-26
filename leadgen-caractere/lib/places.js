"use strict";

/**
 * Recherche de leads via l'API officielle Google Places (New) - Text Search.
 * Documentation : https://developers.google.com/maps/documentation/places/web-service/text-search
 *
 * On utilise volontairement l'API officielle (avec clé) plutôt qu'un scraping
 * de Google Maps : c'est autorisé par les CGU de Google, stable, et fournit
 * directement téléphone/site web sans risque de blocage.
 */

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.businessStatus",
  "places.primaryType",
].join(",");

async function searchText({ apiKey, textQuery, maxPages = 3 }) {
  if (!apiKey) {
    throw new Error(
      "GOOGLE_PLACES_API_KEY manquant. Ajoutez-le dans votre fichier .env (voir .env.example)."
    );
  }

  const results = [];
  let pageToken = null;
  let page = 0;

  do {
    const body = { textQuery, languageCode: "fr", maxResultCount: 20 };
    if (pageToken) body.pageToken = pageToken;

    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": pageToken ? "nextPageToken," + FIELD_MASK : FIELD_MASK,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Google Places API a répondu ${res.status}: ${text}`);
    }

    const data = await res.json();
    for (const place of data.places || []) {
      results.push({
        name: place.displayName && place.displayName.text,
        address: place.formattedAddress,
        phone: place.nationalPhoneNumber || place.internationalPhoneNumber || "",
        website: place.websiteUri || "",
        category: place.primaryType || "",
        businessStatus: place.businessStatus,
        source: "google_places",
      });
    }

    pageToken = data.nextPageToken || null;
    page += 1;

    // Le nextPageToken de l'API Places met quelques secondes à s'activer.
    if (pageToken && page < maxPages) {
      await new Promise((r) => setTimeout(r, 2500));
    }
  } while (pageToken && page < maxPages);

  return results.filter((p) => !p.businessStatus || p.businessStatus === "OPERATIONAL");
}

module.exports = { searchText };
