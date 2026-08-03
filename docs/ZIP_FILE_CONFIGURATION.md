# ZIP File Configuration Guide

## Supabase Bucket Setup

### Bucket Name
- **Bucket Name**: `prompt-packs`
- **Public/Private**: Private (signed URLs only)
- **CORS Enabled**: Yes (required for downloads)

---

## ZIP File Naming Convention

Follow this structure for optimal organization and to avoid conflicts:

```
packs/{pack-type}/{version}/{filename}.zip
```

### Valid Examples

| File | Path | Pack Type | Use Case |
|------|------|-----------|----------|
| **Starter Pack** | `packs/starter/v1/starter-prompts-50.zip` | `starter` | 50 free prompts |
| **Professional** | `packs/professional/v2/pro-complete-200.zip` | `professional` | 200+ prompts |
| **Enterprise** | `packs/enterprise/v1/enterprise-500.zip` | `enterprise` | 500+ prompts |

### Naming Rules

✅ **DO:**
- Use lowercase letters and hyphens: `starter-pack.zip`
- Include version: `v1`, `v2`, etc.
- Be descriptive: `starter-prompts-50.zip` (tells you content count)
- Use forward slashes for folder structure: `packs/starter/v1/file.zip`
- Keep filenames under 100 characters

❌ **DON'T:**
- Use spaces: ❌ `starter pack.zip`
- Use special characters: ❌ `starter@pack#.zip`
- Use uppercase: ❌ `StarterPack.zip` (avoid inconsistency)
- Use version in folder AND filename: ❌ `packs/v1/v1-pack.zip`
- Use deeply nested paths: Keep to 3-4 levels max

---

## Database Configuration

### Step 1: Add ZIP Path to Products

The `zip_path` column stores the file location in Supabase Storage. Format:

```sql
ALTER TABLE products ADD COLUMN zip_path TEXT;
```

### Step 2: Update Product Records

```sql
UPDATE public.products
SET zip_path = 'packs/starter/v1/starter-prompts-50.zip'
WHERE pack_type = 'starter';

UPDATE public.products
SET zip_path = 'packs/professional/v2/pro-complete-200.zip'
WHERE pack_type = 'professional';

UPDATE public.products
SET zip_path = 'packs/enterprise/v1/enterprise-500.zip'
WHERE pack_type = 'enterprise';
```

### Step 3: Verify Configuration

```sql
SELECT pack_type, name, zip_path FROM products WHERE is_active = true;
```

Expected output:
```
 pack_type   |          name          |              zip_path
-------------|------------------------|----------------------------------
 starter     | Starter Pack           | packs/starter/v1/starter-prompts-50.zip
 professional| Professional Bundle    | packs/professional/v2/pro-complete-200.zip
 enterprise  | Enterprise Suite       | packs/enterprise/v1/enterprise-500.zip
```

---

## Upload ZIP Files to Supabase Storage

### Using Supabase Dashboard

1. Go to **Storage** in Supabase Dashboard
2. Click **prompt-packs** bucket
3. Create folders: `packs/starter/v1/`, `packs/professional/v2/`, etc.
4. Upload `.zip` files to respective folders
5. **Verify file exists** - check that the exact path matches your database

### Using Supabase CLI

```bash
supabase storage upload prompt-packs packs/starter/v1/starter-prompts-50.zip ./files/starter.zip
```

---

## Download Flow Verification

### How the Download API Works

1. User pays → Order created with `pack_type` = 'starter'
2. User requests download → API gets `charge_id`
3. API queries products table:
   ```sql
   SELECT zip_path FROM products WHERE pack_type = 'starter'
   ```
4. API generates signed URL (1 hour expiration):
   ```
   https://bucket.supabase.co/storage/v1/object/sign/prompt-packs/...
   ```
5. User redirects to signed URL → File downloads

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| **404 - Pack not found** | `zip_path` is NULL in database | Run UPDATE statement above |
| **403 - Access Denied** | File doesn't exist in bucket | Upload file to exact path in `zip_path` |
| **Download stalls/timeout** | File too large (>100MB) | Split into multiple ZIPs or optimize |
| **Wrong file downloaded** | Mismatched `pack_type` | Verify pack_type matches in database |

---

## File Size Recommendations

| Pack Type | Recommended Size | Notes |
|-----------|-----------------|-------|
| Starter (50 prompts) | 0.5-2 MB | ZIP text files |
| Professional (200 prompts) | 5-15 MB | Reasonable file size |
| Enterprise (500 prompts) | 20-50 MB | May need compression |

**If files exceed 100MB**: Consider splitting or offering streaming download.

---

## Security Best Practices

✅ Signed URLs expire in 1 hour (configurable in `/app/api/download/[chargeId]/route.ts`)
✅ Only authorized users (paid orders) can download
✅ Each download is logged with email and timestamp
✅ Files are private in Supabase Storage (not publicly accessible)

**Never put unencrypted sensitive data in ZIPs** - All downloads are logged per user email.

---

## Troubleshooting Checklist

Before customers report issues, verify:

- [ ] `zip_path` column exists in `products` table
- [ ] All files uploaded to exact paths matching `zip_path` column
- [ ] File names use correct convention (lowercase, hyphens, no spaces)
- [ ] Supabase bucket `prompt-packs` is set to Private
- [ ] CORS is enabled on bucket
- [ ] Database has correct pack_type entries for each product
- [ ] Test download with real charge ID: `/api/download/test_charge_123`
