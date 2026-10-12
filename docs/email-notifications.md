# MOKA — Notifications de toutes les inscriptions

**Destination :** `yakoumobi@gmail.com` (variable Vercel `NOTIFICATION_TO_EMAIL`).

## Formulaires couverts
- Candidature DZ Founders Club (`/api/club/apply`), avec les coordonnées, l'activité, l'objectif, la contribution, Instagram, le consentement et la date.
- Newsletter / ressources gratuites (`/api/subscribe`), avec l'email, la source et le consentement.
- Partenariats / speaking (`/api/contact`), avec le brief complet, les coordonnées, le budget et la date.
- Anciens tunnels de projet (`/api/leads`), avec les réponses au questionnaire et le contact.

## Activation nécessaire — service Resend
1. Créer/ouvrir un compte chez [Resend](https://resend.com/), et **vérifier un domaine expéditeur possédé** (SPF/DKIM).
2. Dans le projet Vercel `mokayakoubi` : **Settings > Environment Variables**.
3. Définir `RESEND_API_KEY` (Sensitive, uniquement côté serveur, Production).
4. Définir `NOTIFICATION_FROM_EMAIL` (ex. `notifications@un-domaine-verifie.tld`, Production). L'email doit appartenir à un domaine vérifié chez Resend.
5. `NOTIFICATION_TO_EMAIL=yakoumobi@gmail.com` est déjà configuré. Ne pas l'utiliser comme expéditeur tant que le domaine n'est pas vérifié.
6. Redéployer le projet après ajout des variables puis soumettre une **candidature test**, une inscription newsletter et une demande de partenariat. Vérifier les emails et les statuts des notifications.

**Ne jamais** publier ou coller la clé Resend dans le dépôt GitHub, un ticket, un formulaire public ou le code client.

## Fiabilité, données et sécurité
- L'envoi est tenté immédiatement après l'enregistrement durable des données en base Supabase.
- Les notifications sont conservées dans `public.notification_outbox` et peuvent être reprises en cas d'échec.
- Une tâche Vercel Cron quotidienne (`/api/cron/notifications`) réessaie les messages. Elle nécessite `CRON_SECRET` déjà configuré côté Vercel. Ne pas rendre cette API publique.
- Les clés d'idempotence limitent les doublons chez Resend. Le statut `sent` signifie **accepté par Resend**, pas la preuve de réception en boîte mail.
- L'absence de clé Resend conserve les demandes et les notifications en file d'attente mais **aucun email n'est émis**.
- Les tables `contact_requests`, `newsletter_subscribers`, `project_leads` et `notification_outbox` ont la RLS activée et ne sont accessibles qu'au rôle serveur privilégié. Ne pas exposer `SUPABASE_SERVICE_ROLE_KEY` au client.
- La politique de confidentialité précise les finalités et la transmission vers le service email.
- Le code de notification se trouve dans `lib/notifications.ts`.

## Vérification SQL (dans le projet Supabase MOKA uniquement)
```sql
select event_type, status, count(*) from public.notification_outbox group by 1,2 order by 1,2;
```

**Note :** Pour un nouveau projet Supabase, il faut appliquer la migration `private_moka_form_submissions_and_email_outbox` au préalable. Elle est déjà appliquée au projet MOKA actuel.
