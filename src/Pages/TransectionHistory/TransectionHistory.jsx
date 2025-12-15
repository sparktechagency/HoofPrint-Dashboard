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
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));

const fmtDateTime = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(iso))
    .replace(",", " /");

export default function TransectionHistory() {
  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(new Date("2025-09-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [useDateFilter, setUseDateFilter] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 8;

  // build query args
  const queryArgs = useMemo(() => {
    const args = { page, limit };
    if (searchTerm.trim()) args.searchTerm = searchTerm.trim();
    if (useDateFilter) {
      args.startDate = toISO(startDate);
      args.endDate = toISO(endDate);
    }
    return args;
  }, [page, limit, searchTerm, useDateFilter, startDate, endDate]);

  const { data, isLoading, isFetching } =
    useGetAllTransactionsQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
    });

  const list = data?.data?.result ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit,
    total: 0,
    totalPage: 1,
  };

  const totalPages = meta.totalPage;

  const onPageChange = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* Filters */}
      <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name / txn id / type…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border rounded-md sm:w-72"
        />

        <button
          onClick={() => setShowCalendar((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md"
        >
          <CalendarDays className="w-4 h-4" />
          {useDateFilter
            ? `${pretty(startDate)} to ${pretty(endDate)}`
            : "All time"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#101749] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Serial</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Date & Time</th>
              <th className="px-4 py-3 text-left">Transaction ID</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : list.length > 0 ? (
              list.map((tx, idx) => (
                <tr key={tx._id} className="border-b">
                  <td className="px-4 py-3">
                    {(meta.page - 1) * meta.limit + idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={tx.user?.profile_image || userImage}
                        onError={(e) => (e.currentTarget.src = userImage)}
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      {tx.user?.name || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {fmtDateTime(tx.createdAt)}
                  </td>
                  <td className="px-4 py-3">{tx.transactionId}</td>
                  <td className="px-4 py-3">{tx.type}</td>
                  <td className="px-4 py-3">${tx.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No transactions found
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
            disabled={meta.page === 1}
            onClick={() => onPageChange(meta.page - 1)}
            className="px-3 py-1 mx-1 disabled:opacity-50"
          >
            <IoIosArrowBack />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 mx-1 rounded-full ${
                meta.page === p
                  ? "bg-[#101749] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={meta.page === totalPages}
            onClick={() => onPageChange(meta.page + 1)}
            className="px-3 py-1 mx-1 disabled:opacity-50"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}

      {isFetching && (
        <div className="pr-4 text-xs text-right text-gray-500">
          Refreshing…
        </div>
      )}
    </div>
  );
}
