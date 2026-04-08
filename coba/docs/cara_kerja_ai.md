# Cara Kerja AI pada Aplikasi NutriSmart

Dalam lingkungan simulasi dan purwarupa (prototype) ini, kita menggunakan pendekatan **Rule-Based Artificial Intelligence** yang deterministik. Pendekatan ini memungkinkan aplikasi merespons layaknya AI yang canggih dengan latensi super rendah, ideal untuk demonstrasi startup maupun environment lomba.

## 1. AI Nutrition Calculator
Sistem menggunakan **Persamaan Mifflin-St Jeor** (yang terbukti klinis memiliki akurasi tinggi) untuk memprediksi _Basal Metabolic Rate_ (BMR). Algoritma menghitung input variabel pengguna:
- Berat Badan (kg)
- Tinggi Badan (cm)
- Usia (Tahun)
- Gender
- Faktor Tingkat Aktivitas (Activity Multiplier)

**Logika Penyesuaian Goal (Tujuan Nutrisi):**
- Jika user ingin "Weight Loss", AI akan secara otomatis memotong target 500 kalori dari TDEE (batas aman defisit).
- Jika "Bulking", AI akan menambahkan 500 kalori (batas aman surplus).
- Sistem memiliki guard-rail keamanan: Calorie cap minimal sebesar 1200 kcal/hari (Wanita) dan 1500 kcal/hari (Pria).

## 2. AI Menu Recommendation Engine
Ketika AI diminta untuk membuat menu makanan harian, ia akan:
1. Membagi total target kalori harian (TDEE) merata antara Sarapan, Makan Siang, dan Makan Malam.
2. Menggali database bahan makanan, dan mengelompokkannya menjadi rantai Makro: `Protein`, `Karbohidrat`, dan `Sayuran/Serat`.
3. Menjalankan fungsi _randomization with constraint_ yang menyortir pilihan makanan lalu menghitung **Serving Multiplier** secara matematis agar total gabungan ketiga bahan (Protein+Karbo+Sayur) di dalam satu porsi setara persentase dengan jatah kalori yang telah ditetapkan per makan.

## 3. Smart Substitution Algorithm
Inilah fitur andalan aplikasi ini. Jika algoritma memberikan menu "Dada Ayam" yang membuat user bosan, user bisa mengklik 'AI Swap Menu'.
**Algoritma Substitusinya:**
1. Mengambil ID Makanan X yang ingin diganti (Current state).
2. Mengecek nilai Makro dan Kalori per serving.
3. Mencari di dalam Database (FoodItems) yang satu kategori (contoh: Protein dengan Protein).
4. **Tolerance Gap Filtering:** Sistem akan mem-filter seluruh array hasil database, dan hanya mengizinkan makanan pengganti jika selisih kalorinya dari makanan asli maksimal **+/- 70 kcal**. Hal ini memastikan integritas program diet user tidak hancur gara-gara menukar menu makanan.
5. Menu alternatif yang berhasil lolos saringan ini kemudian direkomendasikan dengan badge tambahan "Perfect Match" jika selisih makronya di bawah 20 kalori (menandakan equivalensi tingkat tinggi).
