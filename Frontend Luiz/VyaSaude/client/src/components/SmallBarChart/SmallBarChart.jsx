import React from 'react';
import './SmallBarChart.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SmallBarChart = ({ labels = [], data = [] }) => {
  const dataset = {
    labels,
    datasets: [
      {
        label: 'Visitas',
        data,
        backgroundColor: 'rgba(76,175,80,0.85)',
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="small-bar-chart">
      <div style={{height: 180}}>
        <Bar options={options} data={dataset} />
      </div>
    </div>
  );
};

export default SmallBarChart;
