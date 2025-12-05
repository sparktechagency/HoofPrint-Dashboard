// src/pages/transactions/TransectionHistory.jsx
import { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import userImage from "../../assets/image/admin.jpg";
import { useGetAllTransactionsQuery } from "../../features/api/transactionApi";

const toISO = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);
const pretty = (d) =>
  new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    .format(new Date(d));
const fmtDateTime = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(iso)).replace(",", " /");

export default function TransectionHistory() {
  // search & date UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(new Date("2025-09-01"));
  const [endDate, setEndDate] = useState(new Date("2025-10-10"));
  const [showCalendar, setShowCalendar] = useState(false);

  // whether to actually send date filters to the API
  const [useDateFilter, setUseDateFilter] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 8;

  // Build args: only include dates if user applied filter
  const queryArgs = useMemo(() => {
    const base = { page, limit };
    if (searchTerm.trim()) base.searchTerm = searchTerm.trim();
    if (useDateFilter) {
      base.startDate = toISO(startDate);
      base.endDate = toISO(endDate);
    }
    return base;
  }, [page, limit, searchTerm, useDateFilter, startDate, endDate]);

  const { data, isLoading, isError, error, isFetching } = useGetAllTransactionsQuery(
    queryArgs,
    { refetchOnMountOrArgChange: true }
  );

  const list = data?.data?.result ?? [];
  const meta = data?.data?.meta ?? { page, limit, total: list.length, totalPage: 1 };

  // Client-side search fallback (if backend ignores searchTerm)
  const visible = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return list;
    return list.filter((t) => {
      const name = t?.user?.name?.toLowerCase() || "";
      const tx = t?.transactionId?.toLowerCase() || "";
      const type = t?.type?.toLowerCase() || "";
      return name.includes(q) || tx.includes(q) || type.includes(q);
    });
  }, [list, searchTerm]);

  const totalPages = meta?.totalPage || Math.max(1, Math.ceil((meta?.total || visible.length) / limit));
  const onPageChange = (p) => { if (p >= 1 && p <= totalPages) setPage(p); };

  // DEBUG (you can remove these)
  // console.log("args sent:", queryArgs);
  // console.log("api response:", data);

  return (
    <>
      <div className="h-[calc(100vh-80px)] mt-16">
        {/* Filters */}
        <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row">
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name / txn id / type…"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCalendar((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md"
            >
              <CalendarDays className="w-4 h-4" />
              {useDateFilter
                ? `${pretty(startDate)} to ${pretty(endDate)}`
                : "All time"}
            </button>

            {showCalendar && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)} />
                <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-md shadow-xl flex p-6 min-w-[700px]">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                      <label className="text-sm font-semibold text-black">From</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(d) => { setStartDate(d); if (d && endDate && d > endDate) setEndDate(d); }}
                        maxDate={endDate || undefined}
                        dateFormat="dd-MM-yyyy"
                        className="w-full px-3 py-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-black">To</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(d) => { setEndDate(d); if (d && startDate && d < startDate) setStartDate(d); }}
                        minDate={startDate || undefined}
                        dateFormat="dd-MM-yyyy"
                        className="w-full px-3 py-2 mt-1 border rounded"
                      />
                    </div>
                    <div className="flex col-span-2 gap-6 mt-4">
                      <DatePicker selected={startDate} onChange={setStartDate} inline />
                      <DatePicker selected={endDate} onChange={setEndDate} inline />
                    </div>
                  </div>

                  <div className="flex flex-col pl-4 border-l">
                    {["All time", "Last 24 hours", "Last 7 days", "Last 30 days"].map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          const now = new Date();
                          if (p === "All time") {
                            setUseDateFilter(false);
                          } else if (p === "Last 24 hours") {
                            setEndDate(now);
                            setStartDate(new Date(now.getTime() - 24 * 60 * 60 * 1000));
                            setUseDateFilter(true);
                          } else if (p === "Last 7 days") {
                            setEndDate(now);
                            setStartDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
                            setUseDateFilter(true);
                          } else if (p === "Last 30 days") {
                            setEndDate(now);
                            setStartDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
                            setUseDateFilter(true);
                          }
                        }}
                        className="px-4 py-2 text-sm text-left rounded-md hover:bg-gray-100"
                      >
                        {p}
                      </button>
                    ))}
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="px-4 py-2 text-sm border rounded-md"
                        onClick={() => setShowCalendar(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 text-sm text-white bg-[#101749] rounded-md"
                        onClick={() => { setUseDateFilter(true); setShowCalendar(false); setPage(1); }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#101749]">
              <tr className="text-white">
                <th className="px-4 py-3 text-left">Serial</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="">
              {visible.length > 0 ? (
                visible.map((tx, idx) => (
                  <tr key={tx._id} className="border-b ">
                    <td className="px-4 py-3 text-black">
                      {(meta.page - 1) * meta.limit + idx + 1}
                    </td>
                    <td className="px-4 py-3 text-black">
                      <div className="flex items-center gap-3">
                        <img
                          src={tx.user?.profile_image || userImage}
                          alt={tx.user?.name || "User"}
                          className="object-cover w-10 h-10 bg-gray-100 rounded-full"
                          onError={(e) => { e.currentTarget.src = userImage; }}
                        />
                        <span>{tx.user?.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-black">{fmtDateTime(tx.createdAt)}</td>
                    <td className="px-4 py-3 text-black">{tx.transactionId}</td>
                    <td className="px-4 py-3 text-black">{tx.type || "—"}</td>
                    <td className="px-4 py-3 text-black">${tx.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center py-4">
            <button
              onClick={() => onPageChange(meta.page - 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50 hover:bg-gray-100"
              disabled={meta.page <= 1}
            >
              <IoIosArrowBack size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 mx-1 rounded-full ${
                  meta.page === p ? "text-white bg-[#101749]" : "bg-transparent text-black hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(meta.page + 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50 hover:bg-gray-100"
              disabled={meta.page >= totalPages}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        )}

        {isFetching && <div className="mt-1 text-xs text-right text-gray-500">Refreshing…</div>}
      </div>
    </>
  );
}
