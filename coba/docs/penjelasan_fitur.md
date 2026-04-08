# Penjelasan Fitur NutriSmart

Aplikasi NutriSmart dibangun dengan arsitektur UI/UX modern yang berfokus ke metrik kesehatan. Aplikasi dirancang seperti produk real-startup yang clean, interaktif, dan langsung memberikan nilai tambah bagi user.

## 1. Smart Calculator (Onboarding)
- **Deskripsi:** Form dinamis yang menerima metrik badan user (Umur, Tinggi, Berat) serta seberapa aktif mereka bergerak.
- **Inovasi:** Mampu memberi proyeksi TDEE dan membagi rincian makronutrisi harian berdasarkan rasio sempurna (30% Protein, 45% Carb, 25% Fat) menyesuaikan goal user.
- **UI Element:** Hasil ditampilkan dalam _Card_ dengan shadow soft beranimasi, diselingi badge dan warna warni yang merpresentasikan perbedaan masing-masing makro.

## 2. AI Recommendation Planner
- **Deskripsi:** Bukan sekedar menu mati, tapi sebuah katalog dinamis. Katalog akan menjabarkan apa yang harus dimakan untuk _Breakfast, Lunch, Dinner_.
- **Smart Substitution Tooling:** Terdapat fungsionalitas popup khusus di mana user menukar menu. Ini menjawab masalah besar diet di masyarakat yaitu **Rasa Bosan Pada Makanan**.
- **Cart & Checkout Logic:** Setelah rekomendasi dinilai sempurna dan diterima user, menu tersebut bisa dikumpulkan (Add All to Cart) untuk langsung dichackout ke penyedia _healthy catering_ lewat fungsi mock-checkout.

## 3. Visual Dashboard Tracker
- **Deskripsi:** Pusat pemantauan konsumsi user.
- **Micro-features:**
  - **Doughnut Chart (Chart.js):** Membedah visualisasi antara rasio konsumsi protein, lemak dan karbohidrat secara instan dan cantik.
  - **Bar Progress Timeline:** Melihat grafik batangan yang menyandingkan antara Konsumsi vs Target sepanjang seminggu.
  - **Smart Alerts:** Pengingat lonjakan algoritma. Misal: jika user masih kurang 400 kalori, "Smart Reminder" akan muncul memberikan alert bersahabat dengan warna brand (hijau).
  - **Gamification Badges:** Icon dan piala memotivasi user ketika user mencapai target kalori positif.

## 4. Pola Brand Identity yang Diterapkan
- Penggunaan palet dari desain (`#005F02` dan `#427A43`).
- Kartu bersiku tumpul (Rounded corners `12px`).
- Animasi `transform` pada proses interaksi dan _hovering_ di card, menciptakan _feel_ premium sekelas aplikasi berstandar internasional.
