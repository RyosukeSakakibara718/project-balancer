import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "tailwindcss/tailwind.css";
import { GraphDataProps, Graph } from "../../../../types/home";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ChartGraph = ({ graph }: GraphDataProps) => {
  const getCumulativeData = (data: number[]) => {
    return data.reduce((acc: number[], current: number, index: number) => {
      const sum = index === 0 ? current : acc[index - 1] + current;
      acc.push(sum);
      return acc;
    }, []);
  };

  const cumulativeAchievementCost = getCumulativeData(
    graph.map((item: Graph) => item.achievement_cost),
  );
  const cumulativeEstimateCost = getCumulativeData(
    graph.map((item: Graph) => item.estimate_cost),
  );

  const data = {
    labels: graph.map((item: Graph) => item.target_month),
    datasets: [
      {
        label: "実績原価",
        data: cumulativeAchievementCost,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0,
      },
      {
        label: "予定原価",
        data: cumulativeEstimateCost,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "累積原価",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="rounded-lg border h-full shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartGraph;
