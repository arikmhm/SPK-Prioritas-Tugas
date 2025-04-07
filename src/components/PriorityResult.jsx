import { useTask } from "../context/TaskContext";
import { calculateSAW } from "../utils/saw";

const PriorityResult = () => {
  const { state } = useTask();

  if (state.tasks.length === 0) return null;

  const results = calculateSAW(state.tasks, state.weights);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-white uppercase mb-2">
        Hasil Prioritas
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-[500px] w-full text-white border border-white text-sm">
          <thead className="bg-black border-b border-white">
            <tr>
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-center">Skor</th>
              <th className="p-2 text-center">Peringkat</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={res.id} className="border-t border-white">
                <td className="p-2">{res.name}</td>
                <td className="p-2 text-center">{res.score.toFixed(4)}</td>
                <td className="p-2 text-center">{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriorityResult;
