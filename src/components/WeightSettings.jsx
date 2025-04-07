import { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";

const WeightSettings = () => {
  const { state, dispatch } = useTask();
  const [weights, setWeights] = useState(state.weights);
  const [error, setError] = useState("");

  // Update local state ketika state dari context berubah
  useEffect(() => {
    setWeights(state.weights);
  }, [state.weights]);

  // Validasi bobot - kita tidak perlu memaksa total = 1
  // karena kita akan menormalisasi saat perhitungan
  useEffect(() => {
    const invalidWeights = Object.values(weights).some(
      (w) => isNaN(w) || w < 0
    );

    if (invalidWeights) {
      setError("Semua bobot harus berupa angka positif");
    } else {
      setError("");
    }
  }, [weights]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeights((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0, // Konversi ke number, default ke 0 jika NaN
    }));
  };

  const handleSave = () => {
    if (!error) {
      dispatch({ type: "SET_WEIGHTS", payload: weights });
      alert("Bobot berhasil disimpan");
    }
  };

  // Fungsi untuk menampilkan arti nilai bobot
  const getWeightMeaning = (value) => {
    if (value <= 0.2) return "Sangat rendah";
    if (value <= 0.4) return "Rendah";
    if (value <= 0.6) return "Sedang";
    if (value <= 0.8) return "Tinggi";
    return "Sangat tinggi";
  };

  return (
    <div className="bg-black text-white p-4 border border-white mt-6">
      <h2 className="text-lg font-bold uppercase mb-4">
        Pengaturan Bobot Kriteria
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["deadline", "importance", "difficulty", "duration", "impact"].map(
          (key) => (
            <div key={key} className="mb-3">
              <label className="block mb-1 capitalize text-sm">{key}</label>
              <input
                type="number"
                name={key}
                min="0"
                max="5"
                step="0.1"
                value={weights[key]}
                onChange={handleChange}
                className="w-full bg-black border border-white p-2 outline-none"
              />
              <small className="block mt-1 text-xs opacity-70">
                {getWeightMeaning(weights[key] / 5)} ({weights[key]})
              </small>
            </div>
          )
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

      <div className="mt-4">
        <p className="text-sm opacity-75 mb-3">
          Catatan: Semakin tinggi nilai bobot, semakin penting kriteria tersebut
          dalam prioritisasi tugas. Nilai-nilai akan dinormalisasi secara
          otomatis dalam perhitungan.
        </p>
        <button
          onClick={handleSave}
          disabled={!!error}
          className="border border-white px-4 py-2 uppercase hover:bg-white hover:text-black transition disabled:opacity-50"
        >
          Simpan Bobot
        </button>
      </div>
    </div>
  );
};

export default WeightSettings;
