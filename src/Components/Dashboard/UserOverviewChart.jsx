// src/pages/dashboard/UserOverviewChart.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { CalendarDays } from "lucide-react"; // optional; if not installed, remove the icon
import { useGetUserChartDataQuery } from "../../features/api/dashboardApi";

Chart.register(...registerables);

// Simple date helpers
const toISO = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);
const addDays = (d, days) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};
const formatPretty = (d) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));

export default function UserOverviewChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Default: last 90 days (adjust if you prefer)
  const today = new Date();
  const [startDate, setStartDate] = useState(toISO(addDays(today, -90)));
  const [endDate, setEndDate] = useState(toISO(today));

  // Fetch server data using startDate & endDate (same as product chart)
  const { data, isLoading, isError, isFetching, error } = useGetUserChartDataQuery(
    { startDate, endDate },
    { refetchOnMountOrArgChange: true }
  );

  // Normalize response shapes:
  const chartData = useMemo(() => {
    const raw =
      data?.data?.chartData ??
      data?.chartData ??
      data?.data ??
      data ??
      [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  // Accept multiple keys from API for label/value
  const labels = useMemo(
    () => chartData.map((d) => d.month ?? d.label ?? d.name ?? d.week ?? ""),
    [chartData]
  );
  const values = useMemo(
    () => chartData.map((d) => d.totalUser ?? d.totalUsers ?? d.count ?? d.value ?? 0),
    [chartData]
  );

  useEffect(() => {
    if (!chartRef.current || isLoading || isError) return;

    // Destroy any existing chart first
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const height = canvas.clientHeight || 260;

    // Dark-to-light vertical gradient (like your mock)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    // top: light; bottom: deep blue
    gradient.addColorStop(0, "rgba(138, 145, 170, 0.45)"); // soft light grey-blue
    gradient.addColorStop(1, "rgba(11, 19, 73, 1)");       // deep navy #0B1349

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Users",
            data: values,
            fill: true,
            backgroundColor: gradient,
            borderColor: "#0B1349",
            borderWidth: 2,
            tension: 0.45,
            pointRadius: 0, // hidden points like in the mock
            pointHoverRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "#0B1349",
            titleColor: "#FFFFFF",
            bodyColor: "#FFFFFF",
            borderWidth: 0,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "#000000",
              font: { size: 12 },
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.08)" },
            ticks: {
              color: "#000000",
              font: { size: 12 },
              // make the left scale match the mock look
              padding: 6,
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, [labels, values, isLoading, isError, startDate, endDate]);

  // UI states
  if (isLoading) return <p className="mt-6 text-center">Loading chart…</p>;
  if (isError)
    return (
      <p className="mt-6 text-center text-red-600">
        Failed to load chart{error?.status ? ` (HTTP ${error.status})` : ""}.
      </p>
    );

  return (
    <div className="w-full">
      {/* Header + Date range pill */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[15px] font-semibold text-black">Total User Overview</h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
            {/* If you don't use lucide-react, remove this span */}
            <span className="text-gray-500">
              <CalendarDays size={16} />
            </span>
            <span className="text-gray-700 whitespace-nowrap">
              {formatPretty(startDate)} to {formatPretty(endDate)}
            </span>
          </div>

          {/* Hidden native inputs to keep the design clean but functional */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              const v = e.target.value;
              setStartDate(v);
              if (v && endDate && new Date(v) > new Date(endDate)) {
                setEndDate(v);
              }
            }}
            className="px-2 py-1 text-sm border rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              const v = e.target.value;
              setEndDate(v);
              if (v && startDate && new Date(v) < new Date(startDate)) {
                setStartDate(v);
              }
            }}
            className="px-2 py-1 text-sm border rounded-md"
          />
        </div>
      </div>

      {/* Chart */}
      {chartData.length === 0 ? (
        <div className="py-10 text-center text-gray-500 border rounded-md">
          No data for this range.
        </div>
      ) : (
        <div className="w-full h-[260px] rounded-md overflow-hidden">
          <canvas ref={chartRef} />
        </div>
      )}
    </div>
  );
}
