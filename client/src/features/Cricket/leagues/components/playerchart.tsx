/* eslint-disable @typescript-eslint/no-explicit-any */

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PlayerStats {
  runs: number;
  assists: number;
  speed: number;
  dribbling: number;
  hitting: number;
}

interface RadarChartProps {
  stats: PlayerStats;
}

const RadarChart = ({ stats }: RadarChartProps) => {
  if (!stats) {
      return null;
  }

  const statValues = [
    stats.runs * 2,
    stats.assists * 2,
    stats.hitting,
    stats.dribbling,
    stats.speed,
  ];

  const maxStatValue = Math.max(...statValues);
  const dynamicMax = Math.ceil(maxStatValue > 0 ? maxStatValue * 1.1 : 100);

  const data = {
    labels: ["Runs", "Assists", "Hitting", "Dribbling", "Speed"],
    datasets: [
      {
        label: "Performance",
        data: statValues,
        backgroundColor: "#FF69004D",
        borderColor: "#F54900",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        pointLabels: {
          font: {
            size: 16,
            family: "'Arial', sans-serif",
          },
          color: "#F97316",
        },
        ticks: {
          display: false,
        },
        min: 0,
        max: dynamicMax,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#F54900',
        borderWidth: 1,
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                const rawStatValues = [
                    stats.runs,
                    stats.assists,
                    stats.hitting,
                    stats.dribbling,
                    stats.speed,
                ];
                label += rawStatValues[context.dataIndex];
                return label;
            }
        }
      },
    },
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;