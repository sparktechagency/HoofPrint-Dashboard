// src/pages/dashboard/UserOverviewChart.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useGetUserChartDataQuery } from "../../features/api/dashboardApi";

Chart.register(...registerables);

// helpers
const toISO = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);
const pretty = (d) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));

export default function UserOverviewChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // default range (adjust to taste)
  const [startDate, setStartDate] = useState(new Date("2025-06-16"));
  const [endDate, setEndDate] = useState(new Date("2025-09-10"));
  const [open, setOpen] = useState(false);

  // ✅ call API with startDate & endDate (same style you use for products)
  const { data, isLoading, isError, error, isFetching } = useGetUserChartDataQuery(
    { startDate: toISO(startDate), endDate: toISO(endDate) },
    { refetchOnMountOrArgChange: true }
  );

  // normalize possible shapes
  const chartData = useMemo(() => {
    const raw = data?.data?.chartData ?? data?.chartData ?? data?.data ?? data ?? [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  // support multiple keys from backend
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

    // destroy previous
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const height = canvas.clientHeight || 260;

    // gradient (light -> deep navy)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(138, 145, 170, 0.45)");
    gradient.addColorStop(1, "rgba(11, 19, 73, 1)"); // #0B1349

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
            pointRadius: 0,
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
            ticks: { color: "#000", font: { size: 12 }, padding: 6 },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.08)" },
            ticks: { color: "#000", font: { size: 12 }, padding: 6 },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, [labels, values, isLoading, isError, startDate, endDate]);

  if (isLoading) return <p className="mt-6 text-center">Loading chart…</p>;
  if (isError)
    return (
      <p className="mt-6 text-center text-red-600">
        Failed to load chart{error?.status ? ` (HTTP ${error.status})` : ""}.
      </p>
    );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-black">Total User Overview</h3>

        {/* Date pill + popover (same UX as ProductOverview) */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md"
          >
            <span>{`${pretty(startDate)} to ${pretty(endDate)}`}</span>
            <CalendarDays className="w-4 h-4 text-gray-600" />
          </button>

          {open && (
            <>
              {/* backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              {/* popover */}
              <div className="absolute right-0 z-50 w-[600px] p-4 mt-2 bg-white border rounded-md shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">From</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(d) => {
                        setStartDate(d);
                        if (d && endDate && d > endDate) setEndDate(d);
                      }}
                      maxDate={endDate || undefined}
                      dateFormat="dd-MM-yyyy"
                      className="w-full px-3 py-2 mt-1 border rounded"
                      inline
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">To</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(d) => {
                        setEndDate(d);
                        if (d && startDate && d < startDate) setStartDate(d);
                      }}
                      minDate={startDate || undefined}
                      dateFormat="dd-MM-yyyy"
                      className="w-full px-3 py-2 mt-1 border rounded"
                      inline
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm border rounded-md">
                    Cancel
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-3 py-1.5 text-sm text-white bg-[#0B1349] rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chart / empty state */}
      {chartData.length === 0 ? (
        <div className="py-10 text-center text-gray-500 border rounded-md">No data for this range.</div>
      ) : (
        <div className="w-full h-[260px] overflow-hidden rounded-md">
          <canvas ref={chartRef} />
        </div>
      )}

      {/* tiny status */}
      {isFetching && <div className="mt-1 text-xs text-right text-gray-500">Refreshing…</div>}
    </div>
  );
}
