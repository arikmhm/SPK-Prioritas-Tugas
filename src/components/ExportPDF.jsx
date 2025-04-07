import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTask } from "../context/TaskContext";
import { calculateSAW } from "../utils/saw";

const ExportPDF = () => {
  const { state } = useTask();

  const handleExport = () => {
    if (state.tasks.length === 0) {
      alert("Belum ada data tugas untuk diekspor.");
      return;
    }

    const results = calculateSAW(state.tasks, state.weights);
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Laporan Prioritas Tugas", 14, 20);

    autoTable(doc, {
      head: [["Nama Tugas", "Skor", "Peringkat"]],
      body: results.map((task, i) => [task.name, task.score.toFixed(4), i + 1]),
      startY: 30,
      styles: {
        fontSize: 10,
      },
    });

    doc.save("prioritas-tugas.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="mt-4 border border-white text-white px-4 py-2 uppercase hover:bg-white hover:text-black transition text-sm"
    >
      Ekspor PDF
    </button>
  );
};

export default ExportPDF;
