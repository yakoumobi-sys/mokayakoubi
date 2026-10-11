# 1% CLUB — Site opérationnel

Le site est une landing page de candidature pour les Founding 30. Les candidatures ne valent pas admission et aucun paiement n'est collecté.

## Domaine
Production : https://mokayakoubi.vercel.app

## Stockage
La route `POST /api/club/apply` exige un stockage effectif ; elle ne répond 201 que lorsque la destination confirme l'enregistrement.

**Option Supabase :**
1. Activer le projet Supabase lié à ce site.
2. Exécuter `database-club.sql` dans SQL Editor.
3. Configurer `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` en variables serveur Vercel. Ne jamais utiliser la service role côté navigateur.
4. Tester un formulaire de candidature réel puis supprimer l'enregistrement de test.

**Option webhook :**
Configurer `CLUB_APPLICATION_WEBHOOK_URL` (HTTPS) et éventuellement `CLUB_APPLICATION_WEBHOOK_TOKEN`. L'endpoint doit enregistrer l'entrée durablement et renvoyer un code 2xx ; il reçoit `Idempotency-Key`.

Si aucune destination n'est disponible, le formulaire offre un lien pour envoyer la candidature via le client e-mail de la personne sans afficher de fausse confirmation.

## Contenu à valider avant ouverture
- Conditions et prix de l'adhésion (aucun montant affiché pour l'instant)
- Dates et lieu de l'événement Founding 30
- Programme précis et disponibilité des intervenants
- Critères de sélection et responsables du traitement des candidatures
- Vérifier disponibilité du nom 1% CLUB et droits de marque
