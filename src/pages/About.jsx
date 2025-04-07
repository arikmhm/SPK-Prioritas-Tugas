import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 font-mono">
      <h1 className="text-2xl font-bold uppercase mb-4 text-center">
        Tentang Aplikasi
      </h1>

      <section className="mb-6">
        <p className="mb-4">
          Aplikasi ini merupakan Sistem Pendukung Keputusan (SPK) sederhana
          untuk membantu menentukan urutan prioritas tugas berdasarkan berbagai
          kriteria.
        </p>

        <p>
          Tujuan dari aplikasi ini adalah untuk mempermudah pengguna dalam
          memilih tugas mana yang sebaiknya dikerjakan lebih dulu secara
          objektif dan terstruktur menggunakan metode Simple Additive Weighting
          (SAW).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Metode SAW</h2>
        <p className="mb-3">
          Simple Additive Weighting (SAW) adalah metode pengambilan keputusan
          yang menghitung skor setiap alternatif (tugas) berdasarkan nilai
          kriteria yang telah dinormalisasi dan bobot preferensi pengguna.
        </p>

        <div className="bg-gray-900 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2 text-green-400">
            Cara Kerja Perhitungan SAW dalam Aplikasi
          </h3>

          <h4 className="text-md font-medium mb-1 text-yellow-300">
            1. Klasifikasi Kriteria
          </h4>
          <p className="mb-2 text-sm">
            Aplikasi mengklasifikasikan kriteria menjadi dua kategori:
          </p>
          <ul className="list-disc pl-5 mt-1 mb-3">
            <li>
              <span className="text-green-400">Benefit criteria</span> (nilai
              tinggi lebih baik): deadline, importance, impact
            </li>
            <li>
              <span className="text-red-400">Cost criteria</span> (nilai rendah
              lebih baik): difficulty, duration
            </li>
          </ul>

          <h4 className="text-md font-medium mb-1 text-yellow-300">
            2. Normalisasi Nilai
          </h4>
          <p className="mb-2 text-sm">
            Untuk setiap tugas dan kriteria, aplikasi melakukan normalisasi:
          </p>
          <ul className="list-disc pl-5 mt-1 mb-3">
            <li>
              Untuk kriteria benefit:{" "}
              <code className="bg-black px-1">
                nilai tugas / nilai maksimum
              </code>
            </li>
            <li>
              Untuk kriteria cost:{" "}
              <code className="bg-black px-1">nilai minimum / nilai tugas</code>
            </li>
          </ul>
          <p className="mb-3 text-sm">
            Contoh: Jika tugas memiliki <i>importance = 3</i> dan nilai maksimum
            importance adalah 5, maka nilai normalisasinya adalah 3/5 = 0.6
          </p>

          <h4 className="text-md font-medium mb-1 text-yellow-300">
            3. Perhitungan Skor Total
          </h4>
          <p className="mb-2 text-sm">
            Skor total dihitung dengan menjumlahkan semua nilai normalisasi
            dikalikan dengan bobot kriteria masing-masing:
          </p>
          <div className="bg-black p-2 mt-1 mb-3 rounded">
            <code>Skor Total = Σ(nilai normalisasi × bobot kriteria)</code>
          </div>

          <h4 className="text-md font-medium mb-1 text-yellow-300">
            4. Pengurutan Hasil
          </h4>
          <p className="text-sm">
            Tugas diurutkan berdasarkan skor total dari tertinggi ke terendah
            untuk menentukan prioritas pengerjaan.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kriteria yang Digunakan</h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <span className="font-semibold">Deadline</span> - Seberapa mendesak
            batas waktu tugas (semakin tinggi semakin prioritas)
          </li>
          <li>
            <span className="font-semibold">Importance</span> - Tingkat
            kepentingan tugas
          </li>
          <li>
            <span className="font-semibold">Difficulty</span> - Tingkat
            kesulitan tugas (semakin mudah semakin diprioritaskan)
          </li>
          <li>
            <span className="font-semibold">Duration</span> - Perkiraan waktu
            pengerjaan (tugas lebih singkat diprioritaskan)
          </li>
          <li>
            <span className="font-semibold">Impact</span> - Dampak positif dari
            penyelesaian tugas
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cara Menggunakan</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Isi form untuk menambahkan tugas yang ingin diprioritaskan.</li>
          <li>Atur bobot setiap kriteria sesuai dengan prioritas Anda.</li>
          <li>Lihat hasil prioritas berdasarkan skor tertinggi.</li>
          <li>Gunakan fitur ekspor PDF untuk menyimpan hasilnya.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contoh Kasus</h2>
        <p className="mb-3 text-sm">Jika ada dua tugas dengan nilai berbeda:</p>
        <div className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
          <p className="mb-2">
            <span className="text-green-400">Tugas A:</span> deadline: 3,
            importance: 3, difficulty: 3, duration: 1, impact: 3
          </p>
          <p className="mb-2">
            <span className="text-blue-400">Tugas B:</span> deadline: 5,
            importance: 5, difficulty: 5, duration: 5, impact: 5
          </p>
          <hr className="border-gray-700 my-2" />
          <p className="mb-1">Normalisasi Tugas A:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>deadline (benefit): 3/5 = 0.6</li>
            <li>importance (benefit): 3/5 = 0.6</li>
            <li>difficulty (cost): 3/3 = 1</li>
            <li>duration (cost): 1/1 = 1</li>
            <li>impact (benefit): 3/5 = 0.6</li>
          </ul>
          <p className="mb-1">Normalisasi Tugas B:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>deadline (benefit): 5/5 = 1</li>
            <li>importance (benefit): 5/5 = 1</li>
            <li>difficulty (cost): 3/5 = 0.6</li>
            <li>duration (cost): 1/5 = 0.2</li>
            <li>impact (benefit): 5/5 = 1</li>
          </ul>
          <p>
            Meskipun nilai kriteria berbeda, kedua tugas mungkin mendapat skor
            akhir yang sama karena keunggulan di kriteria yang berbeda.
          </p>
        </div>
      </section>

      <p className="text-sm text-center mt-8 text-gray-400">
        Dibuat oleh Muhammad Ariyanto 💻
      </p>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block bg-white text-black px-4 py-2 font-semibold uppercase hover:bg-gray-200 transition"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default About;
