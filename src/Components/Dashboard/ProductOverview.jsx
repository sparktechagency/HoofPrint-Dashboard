

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function ProductOverview() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Monthly earnings data
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Earnings',
          data: [55, 48, 50, 38, 40, 45, 50, 55, 60, 68, 78, 85],
          backgroundColor: '#101749',
          borderColor: 'rgba(255, 255, 255, 0)',
          borderWidth: 0,
          borderRadius: 2,
          barThickness: 12,
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#4BADC9',
            bodyColor: '#4BADC9',
            borderColor: '#4BADC9',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                return `Earnings: ${context.parsed.y}`;
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(173, 216, 230, 0.5)',
              drawBorder: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: 'rgb(1, 0, 0)',
              font: {
                size: 12,
              },
              padding: 10,
              stepSize: 20,
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: 'rgb(1, 0, 0)',
              font: {
                size: 12,
              },
              padding: 5,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-black">Total Product Overview</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <span className="mr-2 text-black">Monthly Growth</span>
            <span className="font-bold text-black">35.80%</span>
          </div>
          <div className="relative">
            <select 
              className="px-4 py-1 pr-8 text-black border border-black rounded-md appearance-none focus:outline-none"
              defaultValue="2024"
            >
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-white pointer-events-none">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[250px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default ProductOverview;
