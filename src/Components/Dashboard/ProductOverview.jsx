import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

Chart.register(...registerables);

function ProductOverview() {
  const [startDate, setStartDate] = useState(new Date("2025-06-16"));
  const [endDate, setEndDate] = useState(new Date("2025-09-10"));
  const [showCalendar, setShowCalendar] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const presets = [
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Custom Range",
  ];

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
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Earnings",
          data: [55, 48, 50, 38, 40, 45, 50, 55, 60, 68, 78, 85],
          backgroundColor: "#101749",
          borderWidth: 0,
          borderRadius: 2,
          barThickness: 12,
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#4BADC9",
            bodyColor: "#4BADC9",
            borderColor: "#4BADC9",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function (context) {
                return `Earnings: ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: "rgba(173, 216, 230, 0.5)", drawBorder: false },
            border: { display: false },
            ticks: {
              color: "rgb(1, 0, 0)",
              font: { size: 12 },
              padding: 10,
              stepSize: 20,
            },
          },
          x: {
            grid: { display: false, drawBorder: false },
            border: { display: false },
            ticks: {
              color: "rgb(1, 0, 0)",
              font: { size: 12 },
              padding: 5,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-black">
          Total Product Overview
        </h2>
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-black border border-black rounded-md"
          >
            <CalendarDays className="w-5 h-5" />
            {startDate?.toLocaleDateString()} to {endDate?.toLocaleDateString()}
          </button>

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
      </div>

      <div className="w-full h-[250px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default ProductOverview;
