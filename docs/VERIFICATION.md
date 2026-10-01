# Vérification — 1er octobre 2026

## Validé
- Compilation Next.js de production, typage TypeScript et ESLint.
- 17 contrôles de validation : consentement, options autorisées, coordonnées, dates, attribution, prix studio.
- Tests HTTP du serveur de production : accueil, trois parcours, traductions, confidentialité, portrait, deux PDF (200), ancienne URL française (308), parcours inconnu (404).
- API : champs invalides (400), origine extérieure (403), corps trop volumineux (413), destination absente (503 et `ok: false`).
- Tests d’interaction React dans un DOM simulé : progression sur les trois parcours, bouton désactivé sans choix, retour arrière conservant les réponses, coordonnées par téléphone ou e-mail, paramètres UTM, succès simulé après acknowledgement, erreur simulée et lien de repli, nouvelle tentative, estimation studio de 12 000 DA pour 2 h avec tournage.

## Limites explicites
- Le lancement de Chrome a été bloqué par les restrictions de l’environnement (`socket() failed: Operation not permitted`). Le rendu visuel et les comportements spécifiques au navigateur n’ont pas pu être vérifiés dans un vrai navigateur.
- La connexion Supabase affichait le projet Moka inactif. Aucun test d’écriture n’a été effectué dans cette base ; aucun formulaire de test n’a envoyé d’e-mail à un destinataire réel.
- La collecte réelle nécessite l’activation de la destination décrite dans FUNNEL-EXPLOITATION.md. Les tests DOM de succès utilisent une réponse simulée ; ils ne prouvent pas l’activation d’un CRM en production.
- Le build produit un avertissement metadataBase provenant des métadonnées d’images générées à la racine. Les HTML générés de l’accueil et du studio ont été inspectés : leurs balises canonical et og:image pointent bien vers https://mokayakoubi.vercel.app.

Commande du test de validation versionné : `node tests/funnel-validation.cjs`.
