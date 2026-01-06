# Panduan Update Data Lembaga

## Cara Update Data Lembaga

Untuk mengupdate informasi lembaga (biaya, profil, fasilitas, dll), ikuti langkah berikut:

### 1. Edit File JSON Lembaga

Semua data lembaga ada di folder `data/lembaga/`. Pilih file yang ingin diupdate:

- `pass.json` - Pondok Athfal
- `ppss.json` - Pondok Putra
- `smp-putra.json` - SMP Putra Al-Azhar
- `sma-putra.json` - SMA Putra Al-Azhar
- `pp-azzahro.json` - Pondok Putri Az-zahro'
- `pp-nurus.json` - Pondok Putri Nurus Salimin
- `smp-putri.json` - SMP Putri Al-Azhar
- `smk-putri.json` - SMK Putri Al-Azhar
- `pq-ranggeh.json` - Pondok Qur'an Ranggeh
- `pt-besuki.json` - Pondok Takhfidz Besuki
- `md-putra.json` - Madrasah Putra
- `stit.json` - STIT
- `pa-autism.json` - Pondok Autism

### 2. Edit Data yang Diinginkan

Contoh: Update biaya SMP Putri

```bash
# Buka file
notepad data/lembaga/smp-putri.json
```

Edit bagian yang diinginkan, misal update total estimasi biaya:

```json
{
  "biaya": {
    "tahunAjaran": "2025-2026",
    "boarding": {
      "totalEstimasi": 5000000, // <-- Update angka ini
      "rincian": [
        // ... update rincian juga jika perlu
      ]
    }
  }
}
```

### 3. Git Commit & Push

```bash
# Add file yang diupdate
git add data/lembaga/smp-putri.json

# Commit dengan pesan jelas
git commit -m "Update biaya SMP Putri untuk TA 2025-2026"

# Push ke GitHub
git push
```

### 4. Auto Deploy

Vercel akan otomatis build dan deploy (2-3 menit). Data akan update di website!

## Field yang Bisa Diupdate

### Profil

- `deskripsi` - Deskripsi lembaga
- `visi` - Visi lembaga
- `misi` - Misi (array)
- `akreditasi` - Akreditasi (A/B/C)

### Biaya

- `totalEstimasi` - Total estimasi biaya
- `rincian` - Array rincian biaya
  - `nama` - Nama biaya
  - `deskripsi` - Deskripsi
  - `jumlah` - Nominal (number)
  - `icon` - Icon Material Symbols

### Pendaftaran

- `tanggalBuka` - Format: YYYY-MM-DD
- `tanggalTutup` - Format: YYYY-MM-DD
- `persyaratan` - Array string
- `tahapanSeleksi` - Array string

### Lainnya

- `fasilitas` - Array fasilitas
- `programUnggulan` - Array program
- `kontak` - Object (telepon, email, alamat)

## Tips

- ✅ Pastikan JSON valid (gunakan JSON validator)
- ✅ Angka harus number, bukan string (tanpa quotes)
- ✅ String harus pakai double quotes `""`
- ✅ Jangan lupa comma antar items (kecuali yang terakhir)
