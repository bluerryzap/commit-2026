# commit-2026

Website optimasi keuangan dan gaya hidup dengan React dan Vite.\

## Teknologi

- React dan React DOM
- Vite dengan plugin React
- Tailwind CSS
- PostCSS dan Autoprefixer

## Persiapan

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
npm install
```

## Perintah

Jalankan server pengembangan:

```bash
npm run dev
```

Buat build produksi:

```bash
npm run build
```

Pratinjau build produksi:

```bash
npm run preview
```

## Struktur proyek

```text
src/
├── app.jsx
├── main.jsx
├── index.css
├── components/
│   └── hero.jsx
└── pages/
    └── home.jsx
```

- `src/main.jsx` memasang aplikasi React pada elemen `#root` dan mengimpor CSS.
- `src/app.jsx` menjadi komponen aplikasi utama.
- `src/pages/home.jsx` menyusun halaman utama.
- `src/components/hero.jsx` menampilkan bagian hero.
- `src/index.css` mengimpor Tailwind CSS v4.

## Konfigurasi

- `postcss.config.cjs` menggunakan format CommonJS yang sesuai dengan `"type": "commonjs"` pada `package.json`, dan memuat plugin `@tailwindcss/postcss` serta Autoprefixer.
- `vite.config.mjs` dan `tailwind.config.mjs` menggunakan ekstensi `.mjs` agar sintaks ESM-nya dikenali.
- Konfigurasi Tailwind berada di `tailwind.config.mjs`; CSS mengimpor Tailwind melalui `@import "tailwindcss";` di `src/index.css`.

Build produksi dapat dibuat dengan `npm run build`.
