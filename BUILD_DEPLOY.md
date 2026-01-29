# Panduan Build & Deploy ke Hostinger

## 📋 Prasyarat

- Node.js versi 18 atau lebih tinggi
- npm atau yarn terinstall
- Akun Hostinger dengan shared hosting
- File Manager atau FTP access ke Hostinger

## 🔧 Konfigurasi Build

Aplikasi ini sudah dikonfigurasi untuk **static export** yang kompatibel dengan shared hosting Hostinger dan mendukung PWA (Progressive Web App).

### Fitur yang Sudah Dikonfigurasi:

✅ Static Export (`output: 'export'`)  
✅ PWA Support dengan Service Worker  
✅ Image Optimization disabled (untuk static hosting)  
✅ Trailing slash untuk routing yang lebih baik  
✅ Manifest.json untuk PWA

## 🚀 Cara Build untuk Production

### 1. Install Dependencies (Jika Belum)

```bash
npm install
```

### 2. Clean Build (Opsional, untuk build bersih)

```bash
npm run clean
```

### 3. Build untuk Production

```bash
npm run build
```

atau

```bash
npm run export
```

**Catatan:** Kedua perintah di atas melakukan hal yang sama karena sudah dikonfigurasi `output: 'export'` di `next.config.mjs`.

### 4. Hasil Build

Setelah build selesai, semua file static akan berada di folder **`out/`**:

```
out/
├── _next/
│   ├── static/
│   └── ...
├── index.html
├── admin.html
├── manifest.json
├── sw.js (Service Worker untuk PWA)
├── workbox-*.js
└── ... (semua halaman dan assets)
```

## 📤 Upload ke Hostinger

### Metode 1: File Manager (Recommended)

1. **Login ke Hostinger Control Panel** (hPanel)
2. Buka **File Manager**
3. Navigasi ke folder `public_html` (atau folder domain Anda)
4. **Hapus semua file lama** di folder tersebut (backup dulu jika perlu)
5. **Upload semua isi folder `out/`** ke `public_html`
   - Pastikan struktur folder tetap sama
   - Upload file `.htaccess` juga (jika ada)

### Metode 2: FTP/SFTP

1. Gunakan FTP client seperti **FileZilla**
2. Connect ke server Hostinger dengan kredensial FTP Anda
3. Navigasi ke folder `public_html`
4. Upload semua isi folder `out/` ke `public_html`

## 🔐 Konfigurasi .htaccess (Penting!)

Buat file `.htaccess` di folder `public_html` dengan konten berikut untuk routing yang benar:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # HTTPS Redirect (Opsional, tapi recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Handle trailing slashes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ $1/ [L,R=301]

  # Serve static files directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Route all other requests to index.html for client-side routing
  RewriteRule ^ index.html [L]
</IfModule>

# Cache Control untuk PWA
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"

  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"

  # Manifest and Service Worker (jangan di-cache terlalu lama)
  ExpiresByType application/manifest+json "access plus 1 day"
  ExpiresByType text/cache-manifest "access plus 0 seconds"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  # PWA Headers
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"

  # Service Worker scope
  <FilesMatch "sw\.js$">
    Header set Service-Worker-Allowed "/"
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
</IfModule>
```

## ✅ Verifikasi Deployment

Setelah upload selesai, cek:

1. **Buka website Anda** di browser
2. **Test PWA:**
   - Buka Chrome DevTools (F12)
   - Tab **Application** → **Service Workers**
   - Pastikan Service Worker aktif
   - Tab **Manifest** → Cek manifest.json terload
3. **Test Install PWA:**
   - Di Chrome, klik icon **Install** di address bar
   - Atau klik menu → **Install [Nama App]**
4. **Test Offline:**
   - Disconnect internet
   - Refresh halaman
   - Halaman seharusnya masih bisa diakses (dari cache)

## 🔄 Update Aplikasi

Untuk update aplikasi di masa depan:

1. Lakukan perubahan di code
2. Run `npm run build` lagi
3. Upload ulang isi folder `out/` ke Hostinger
4. Clear browser cache atau hard refresh (Ctrl+Shift+R)

## 🐛 Troubleshooting

### 1. **404 Error saat navigasi**

- Pastikan file `.htaccess` sudah benar
- Cek `trailingSlash: true` di `next.config.mjs`

### 2. **Service Worker tidak terdeteksi**

- Pastikan website menggunakan **HTTPS** (PWA hanya jalan di HTTPS)
- Cek file `sw.js` ada di root folder `public_html`
- Clear browser cache dan reload

### 3. **Images tidak muncul**

- Pastikan `images.unoptimized: true` di config
- Cek path image sudah benar (gunakan path relatif)

### 4. **CSS/JS tidak load**

- Cek folder `_next/static/` sudah ter-upload
- Pastikan tidak ada error di browser console

### 5. **Halaman blank/putih**

- Buka browser console (F12) untuk lihat error
- Pastikan semua file di folder `out/` ter-upload
- Cek file `.htaccess` tidak memblok request

## 📱 Test PWA di Mobile

1. Buka website di **Chrome Mobile** (Android) atau **Safari** (iOS)
2. **Android:** Tap menu → "Add to Home screen"
3. **iOS:** Tap Share → "Add to Home Screen"
4. Icon app akan muncul di home screen
5. Buka app dari home screen → akan buka seperti native app

## 🎯 Checklist Deploy

- [ ] `npm run build` berhasil tanpa error
- [ ] Folder `out/` terbentuk dengan lengkap
- [ ] Upload semua isi `out/` ke `public_html`
- [ ] File `.htaccess` sudah dibuat dan dikonfigurasi
- [ ] Website bisa diakses via browser
- [ ] Service Worker aktif (cek di DevTools)
- [ ] PWA bisa di-install
- [ ] Test offline mode
- [ ] Test di mobile device

## 📞 Support

Jika ada masalah:

1. Cek error di browser console (F12)
2. Cek error log di Hostinger cPanel
3. Pastikan semua file ter-upload dengan benar
4. Cek `.htaccess` tidak ada typo

---

**Selamat! Aplikasi Anda sekarang sudah live di Hostinger dengan PWA support! 🎉**
