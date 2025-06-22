import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

Chart.register(...registerables);

function UserOverviewChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

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
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data,
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
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: { color: "#101749", font: { size: 12 }, stepSize: 20 },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#101749", font: { size: 12 } },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, []);

  return (
    <div className="w-full h-[250px]">
      <canvas ref={chartRef} />
    </div>
  );
}

// ---------------------------
// Main Dashboard Component
// ---------------------------
function DashboardPage() {
  const [startDate, setStartDate] = useState(new Date("2025-06-16"));
  const [endDate, setEndDate] = useState(new Date("2025-09-10"));
  const [showCalendar, setShowCalendar] = useState(false);

  const presets = [
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Custom Range",
  ];

  return (
    <div className="container relative p-4 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-black">
            Total User Overview
          </h2>

          <div className="flex items-center gap-6">
            {/* Calendar Trigger */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center px-4 py-2 text-sm text-black border border-black rounded-md"
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              {startDate?.toLocaleDateString()} to{" "}
              {endDate?.toLocaleDateString()}
            </button>
          </div>
        </div>

        {/* Chart */}
        <UserOverviewChart />
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30"
            onClick={() => setShowCalendar(false)}
          />

          {/* Centered Popup */}
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-md shadow-xl flex p-6 min-w-[700px]">
            {/* Date Inputs & Calendar */}
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <label className="text-sm font-semibold text-black">From</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-black">To</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="w-full px-3 py-2 mt-1 border"
                />
              </div>
              <div className="flex col-span-2 gap-6 mt-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  inline
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  inline
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-col pl-4 border-l">
              {presets.map((item, idx) => (
                <button
                  key={idx}
                  className={`text-left px-4 py-2 hover:bg-gray-100 rounded-md text-sm ${
                    item === "Custom Range" ? "bg-orange-100 font-semibold" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                className="px-4 py-2 mt-auto text-white bg-blue-900 rounded-md"
                onClick={() => setShowCalendar(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
