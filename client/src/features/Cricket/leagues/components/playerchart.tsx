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
  goals: number;
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
    stats.goals * 2,
    stats.assists * 2,
    stats.hitting,
    stats.dribbling,
    stats.speed,
  ];

  const maxStatValue = Math.max(...statValues);
  const dynamicMax = Math.ceil(maxStatValue > 0 ? maxStatValue * 1.1 : 100);

  const data = {
    labels: ["Goals", "Assists", "Hitting", "Dribbling", "Speed"],
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
            size: 14,
            family: "'Arial', sans-serif",
            weight: "bold",
          },
          color: "#F97316", // Label color
        },
        ticks: {
          display: false, // Hide numerical ticks on the axis
        },
        min: 0, // Minimum value for the scale
        max: dynamicMax, // Dynamic maximum value
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
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
                // Display the actual stat value without multipliers for the tooltip
                const rawStatValues = [
                    stats.goals,
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