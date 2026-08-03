# Configuration Nouvelle Base de Données Supabase

## Étapes Complètes

### 1. Créer la BD Supabase
- Allez sur https://supabase.com/dashboard
- Cliquez "New Project"
- Remplissez: Nom, mot de passe, région
- Attendez l'initialisation (5-10 minutes)

### 2. Récupérer les Credentials
1. Allez dans **Settings** → **API**
2. Copiez:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurer les Variables d'Environnement
Créez/mettez à jour `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://jvhirlghxhgjwfloillo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_CGDTfMjhcOGT94atUu5QiQ_6RanEMia
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
> NOWPAYMENTS_API_KEY=your_nowpayments_api_key
  NOWPAYMENTS_IPN_SECRET=your_nowpayments_ipn_secret
  ```

### 4. Exécuter les Migrations

Allez dans Supabase SQL Editor et exécutez les scripts dans cet ordre:

1. **001_create_products_table.sql** - Crée table products
2. **005_create_newsletter_table.sql** - Crée table newsletter
3. **006_create_orders_table.sql** - Crée table orders
4. **002_seed_starter_prompts.sql** - Ajoute 10 produits starter

### 5. Uploader les ZIP Files

1. Allez dans **Storage** → **Buckets** (créez s'il n'existe pas)
2. Créez un bucket: `prompt-packs`
3. Créez les dossiers:
   - `packs/starter/v1/`
   - `packs/professional/v1/`
   - `packs/enterprise/v1/`
4. Uploadez vos ZIP files correspondants

### 6. Vérifier la Connexion

Test la connexion en allant sur `/api/prompts` → Doit retourner vos produits

### 7. Tester le Flux Complet

1. Allez sur `/` → Voir les produits
2. Allez sur `/checkout?pack=starter` → Voir le panier
3. Cliquez "Pay with Crypto" → Doit aller sur Coinbase (si clé configurée)
4. Après paiement → Webhook crée order dans Supabase
5. Email de confirmation → Contient lien de download

---

## Variables d'Environnement Requises

| Variable | Requis | Source |
|----------|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase Settings → API (anon) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase Settings → API (service_role) |
| `NOWPAYMENTS_API_KEY` | ✅ | NOWPayments Dashboard → API |
| `NOWPAYMENTS_IPN_SECRET` | ✅ | NOWPayments Settings → Webhooks |
| `RESEND_API_KEY` | ⚠️ | Resend (optionnel pour emails) |

---

## Troubleshooting

**Erreur "Anon key not found":**
- Vérifiez que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est configuré

**Erreur "Table products not found":**
- Exécutez les migrations SQL dans Supabase SQL Editor

**Erreur "Permission denied":**
- Vérifiez les RLS policies dans les migrations SQL

**Erreur NOWPayments "Invalid API key":**
- Vérifiez que `NOWPAYMENTS_API_KEY` est correctement configuré dans Vercel
- Assurez-vous d'utiliser la clé d'API correcte (pas l'IPN secret)

**Webhook NOWPayments non reçu:**
- Vérifiez que `NOWPAYMENTS_IPN_SECRET` est correctement configuré
- Testez l'endpoint webhook: `/api/webhook` (GET doit retourner le statut)

**Emails non reçus:**
- Configurez `RESEND_API_KEY` ou utilisez un autre service email
