import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SensorAverage {
  equipmentId: string;
  averageValue: number;
}

interface SensorAveragesBarChartProps {
  averages: SensorAverage[];
}

const SensorAveragesBarChart: React.FC<SensorAveragesBarChartProps> = ({
  averages,
}) => {
  const data = {
    labels: averages.map((avg) => avg.equipmentId),
    datasets: [
      {
        label: "Average Value",
        data: averages.map((avg) => avg.averageValue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Sensor Averages Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SensorAveragesBarChart;
