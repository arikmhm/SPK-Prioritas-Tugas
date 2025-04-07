import { useTask } from "../context/TaskContext";

const TaskList = () => {
  const { state, dispatch } = useTask();

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus tugas ini?")) {
      dispatch({ type: "DELETE_TASK", payload: id });
    }
  };

  if (state.tasks.length === 0) {
    return <p className="text-white mt-4">Belum ada tugas ditambahkan.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-white uppercase mb-2">
        Daftar Tugas
      </h2>

      {/* Scrollable container untuk tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full text-white border border-white text-sm">
          <thead className="bg-black border-b border-white">
            <tr>
              <th className="p-2 text-left">Nama</th>
              <th className="p-2">Deadline</th>
              <th className="p-2">Kepentingan</th>
              <th className="p-2">Kesulitan</th>
              <th className="p-2">Durasi</th>
              <th className="p-2">Dampak</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {state.tasks.map((task) => (
              <tr key={task.id} className="border-t border-white">
                <td className="p-2">{task.name}</td>
                <td className="p-2 text-center">{task.deadline}</td>
                <td className="p-2 text-center">{task.importance}</td>
                <td className="p-2 text-center">{task.difficulty}</td>
                <td className="p-2 text-center">{task.duration}</td>
                <td className="p-2 text-center">{task.impact}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-400 hover:text-red-200 uppercase text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
