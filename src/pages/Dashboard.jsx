import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import PriorityResult from "../components/PriorityResult";
import ExportPDF from "../components/ExportPDF";
import WeightSettings from "../components/WeightSettings";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 font-mono">
      <h1 className="text-xl md:text-2xl font-bold uppercase mb-6 text-center md:text-left">
        SPK Prioritas Tugas
      </h1>
      <Link
        to="/about"
        className="text-white underline text-sm mt-4 inline-block hover:text-gray-300"
      >
        Tentang Aplikasi
      </Link>
      {/* Layout responsif: stacking di mobile, 2 kolom di desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kiri: Form Tugas */}
        <div>
          <TaskForm />
        </div>

        {/* Kanan: Daftar + Prioritas + PDF */}
        <div className="flex flex-col gap-4">
          <TaskList />
          <PriorityResult />
          <ExportPDF />
        </div>
      </div>

      {/* Bobot: Tetap di bawah full-width */}
      <div className="mt-6">
        <WeightSettings />
      </div>
    </div>
  );
};

export default Dashboard;
