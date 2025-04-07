import { useState } from "react";
import { useTask } from "../context/TaskContext";

const TaskForm = () => {
  const { dispatch } = useTask();

  const [form, setForm] = useState({
    name: "",
    deadline: 3,
    importance: 3,
    difficulty: 3,
    duration: 3,
    impact: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) || value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Nama tugas wajib diisi!");

    dispatch({
      type: "ADD_TASK",
      payload: { ...form, id: Date.now() },
    });

    setForm({
      name: "",
      deadline: 3,
      importance: 3,
      difficulty: 3,
      duration: 3,
      impact: 3,
    });
  };

  const renderSelect = (label, name) => (
    <div className="flex flex-col">
      <label className="text-sm uppercase text-white">{label}</label>
      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="bg-black text-white border border-white p-2 mt-1 outline-none"
      >
        {[1, 2, 3, 4, 5].map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-white border border-white p-4 flex flex-col gap-4"
    >
      <h2 className="text-lg font-bold uppercase">Tambah Tugas</h2>

      <div className="flex flex-col">
        <label className="text-sm uppercase">Nama Tugas</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Contoh: Buat laporan SPK"
          className="bg-black text-white border border-white p-2 mt-1 outline-none"
        />
      </div>

      {/* Grid select responsif */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect("Deadline", "deadline")}
        {renderSelect("Kepentingan", "importance")}
        {renderSelect("Kesulitan", "difficulty")}
        {renderSelect("Durasi", "duration")}
        {renderSelect("Dampak Jika Tertunda", "impact")}
      </div>

      <button
        type="submit"
        className="bg-white text-black p-2 uppercase font-semibold tracking-wider"
      >
        Simpan Tugas
      </button>
    </form>
  );
};

export default TaskForm;
