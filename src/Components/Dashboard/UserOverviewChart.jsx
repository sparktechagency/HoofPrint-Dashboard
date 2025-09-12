import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { useGetUserChartDataQuery } from "../../features/api/dashboardApi";

Chart.register(...registerables);

function UserOverviewChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // ✅ Selected year state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // ✅ Pass year as query param to API
  const { data, isLoading, isError } = useGetUserChartDataQuery(selectedYear);

  useEffect(() => {
    if (!chartRef.current || isLoading || isError) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Extract months & user counts from API
    const chartData = data?.data?.chartData || [];
    const labels = chartData.map((item) => item.month);
    const users = chartData.map((item) => item.totalUser);

    const chartConfig = {
      labels,
      datasets: [
        {
          label: "Users",
          data: users,
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
          borderColor: "#101749",
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: "#101749",
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: chartConfig,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
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
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: { color: "#101749", font: { size: 12 } },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#101749", font: { size: 12 } },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <p className="mt-10 text-center">Loading chart...</p>;
  }

  if (isError) {
    return <p className="mt-10 text-center text-red-500">Failed to load chart</p>;
  }

  // ✅ Extract years dropdown from API
  const yearsDropdown = data?.data?.yearsDropdown || [new Date().getFullYear()];

  return (
    <div className="w-full">
      {/* Year Dropdown */}
      <div className="flex justify-between mb-4">
         <h2 className="text-2xl font-medium text-black">Total User Overview</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          // className="px-3 py-2 text-sm border border-gray-400 rounded-md"
          className="px-3 py-2 text-sm border rounded-md"
        >
          {yearsDropdown.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[250px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default UserOverviewChart;
