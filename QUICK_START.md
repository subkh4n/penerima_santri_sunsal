# 🚀 Quick Start - Build & Deploy

## Build untuk Production

```bash
npm run build
```

Hasil build ada di folder **`out/`**

## Upload ke Hostinger

1. Login ke **Hostinger hPanel**
2. Buka **File Manager**
3. Masuk ke folder **`public_html`**
4. **Hapus semua file lama** (backup dulu jika perlu)
5. **Upload semua isi folder `out/`** ke `public_html`
6. **Copy file `.htaccess.template`** → rename jadi `.htaccess` dan upload ke `public_html`

## Verifikasi

1. Buka website di browser
2. Tekan **F12** → Tab **Application** → **Service Workers** → pastikan aktif
3. Test install PWA: klik icon **Install** di address bar Chrome
4. Test offline: disconnect internet, refresh halaman (harusnya masih bisa diakses)

## Update di Masa Depan

```bash
npm run build
```

Upload ulang isi folder `out/` ke Hostinger.

---

**Catatan Penting:**

- PWA hanya bekerja di **HTTPS** (pastikan SSL aktif di Hostinger)
- File `.htaccess` wajib ada untuk routing yang benar
- Jika ada error, cek browser console (F12)

Untuk panduan lengkap, baca **BUILD_DEPLOY.md**
