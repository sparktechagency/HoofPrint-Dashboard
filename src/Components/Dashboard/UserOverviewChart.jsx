import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// UserOverviewChart Component
function UserOverviewChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    // Sample data that mimics the chart in the image
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Users",
          data: [85, 80, 75, 65, 40, 45, 60, 75, 95, 85, 90, 75],
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
            gradient.addColorStop(0.8, "rgba(16, 23, 73, 1)"); 
            gradient.addColorStop(1, "rgba(16, 23, 73, 1)");

            return gradient;
          },
          // borderColor: "#101749",
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "#101749",
            titleColor: "#fffdff",
            bodyColor: "#fffdff",
            borderColor: "#fffdff",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#101749",
              font: {
                size: 12,
              },
              stepSize: 20,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#101749",
              font: {
                size: 12,
              },
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
    <div className="w-full h-[250px]">
      <canvas ref={chartRef} />
    </div>
  );
}

// Main Dashboard Component
function DashboardPage() {
  return (
    <div className="container p-4 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-black">
            Total User Overview
          </h2>
          <div className="flex items-center gap-6">
            <span className="text-black">Monthly Growth</span>
            <span className="font-bold text-black"> 35.80 %</span>
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
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <UserOverviewChart />
      </div>
    </div>
  );
}

export default DashboardPage;
