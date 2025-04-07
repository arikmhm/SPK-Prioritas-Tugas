export const calculateSAW = (tasks, weights) => {
  if (!tasks.length) return [];

  const criteria = [
    "deadline",
    "importance",
    "difficulty",
    "duration",
    "impact",
  ];

  // Definisikan mana kriteria benefit dan mana cost
  // Untuk benefit: nilai lebih tinggi lebih baik
  // Untuk cost: nilai lebih rendah lebih baik
  const benefitCriteria = ["deadline", "importance", "impact"];
  const costCriteria = ["difficulty", "duration"];

  // Normalisasi matriks keputusan
  // Untuk kriteria benefit: Xij / max(Xi)
  // Untuk kriteria cost: min(Xi) / Xij

  // Cari nilai max dan min untuk setiap kriteria
  const maxValues = {};
  const minValues = {};

  criteria.forEach((key) => {
    maxValues[key] = Math.max(...tasks.map((task) => task[key]));
    minValues[key] = Math.min(
      ...tasks.map((task) => Math.max(task[key], 0.01))
    ); // Hindari pembagian dengan 0
  });

  const scoredTasks = tasks.map((task) => {
    let totalScore = 0;

    criteria.forEach((key) => {
      let normalizedValue;

      if (benefitCriteria.includes(key)) {
        // Kriteria benefit: Xij / max(Xi)
        normalizedValue = task[key] / maxValues[key];
      } else {
        // Kriteria cost: min(Xi) / Xij
        normalizedValue = minValues[key] / Math.max(task[key], 0.01); // Hindari pembagian dengan 0
      }

      // Total score = sum(normalized_value * weight)
      totalScore += normalizedValue * weights[key];
    });

    return { ...task, score: parseFloat(totalScore.toFixed(4)) };
  });

  // Sort berdasarkan score (descending)
  return scoredTasks.sort((a, b) => b.score - a.score);
};
