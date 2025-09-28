// src/pages/dashboard/ProductOverview.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useGetProductChartDataQuery } from "../../features/api/dashboardApi";

Chart.register(...registerables);

// helpers
const toISO = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);
const pretty = (d) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));

function ProductOverview() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // default range
  const [startDate, setStartDate] = useState(new Date("2025-06-16"));
  const [endDate, setEndDate] = useState(new Date("2025-09-10"));
  const [open, setOpen] = useState(false);

  // ✅ call API with startDate & endDate (same style as your Postman)
  const { data, isLoading, isError, error, isFetching } = useGetProductChartDataQuery(
    { startDate: toISO(startDate), endDate: toISO(endDate) },
    { refetchOnMountOrArgChange: true }
  );

  // normalize data shape: [{ month|label, totalProduct|value|count }]
  const chartData = useMemo(() => {
    const raw = data?.data?.chartData ?? data?.chartData ?? data?.data ?? data ?? [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const labels = useMemo(
    () => chartData.map((d) => d.month ?? d.label ?? d.name ?? ""),
    [chartData]
  );

  const values = useMemo(
    () => chartData.map((d) => d.totalProduct ?? d.value ?? d.count ?? 0),
    [chartData]
  );

  // render (and re-render) chart
  useEffect(() => {
    if (!chartRef.current) return;

    // (re)create
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Products",
            data: values,
            backgroundColor: "#0B1349",   // deep navy
            borderWidth: 0,
            borderRadius: 5,
            barThickness: 12,             // like the mock
            categoryPercentage: 0.6,
            barPercentage: 0.9,
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
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#0B1349",
            bodyColor: "#0B1349",
            borderColor: "#0B1349",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: (items) => items?.[0]?.label ?? "",
              label: (ctx) => `Products: ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false, drawBorder: false },
            border: { display: false },
            ticks: { color: "#000", font: { size: 12 }, padding: 6 },
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.08)", drawBorder: false },
            border: { display: false },
            ticks: { color: "#000", font: { size: 12 }, padding: 6 },
            suggestedMax: Math.max(10, Math.ceil(Math.max(...values, 0) / 10) * 10),
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
      chartInstance.current = null;
    };
  }, [labels, values]);

  if (isLoading) return <p className="mt-10 text-center">Loading chart...</p>;
  if (isError)
    return (
      <p className="mt-10 text-center text-red-500">
        Failed to load chart{error?.status ? ` (HTTP ${error.status})` : ""}.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-black">Total Product Overview</h2>

        {/* Date pill + popover */}
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
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />
              {/* popover */}
              <div className="z-50 absolute right-0 mt-2 bg-white border rounded-md shadow-xl p-4 w-[600px]">
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
                  <button
                    onClick={() => setOpen(false)}
                    className="px-3 py-1.5 text-sm border rounded-md"
                  >
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

      {/* subtle top border line like the mock */}
      <div className="w-full h-[250px]">
        <canvas ref={chartRef} />
      </div>

      {/* tiny status */}
      {isFetching && (
        <div className="mt-1 text-xs text-right text-gray-500">Refreshing…</div>
      )}
    </div>
  );
}

export default ProductOverview;
