import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetAllHoofprintSellQuery } from "../../features/api/hoofPrintApi";

function ProductPurchase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ Fetch data from API
  const { data, error, isLoading } = useGetAllHoofprintSellQuery();

  // ✅ Extract real result array from API response
  const requests = useMemo(() => {
    if (data?.data?.result) {
      return data.data.result.map((item) => {
        const product = item.products?.[0] || {};
        return {
          id: item._id,
            name: item.sellerInfo?.name || "N/A",
          address: item.sellerInfo?.address || "N/A",
          phone: item.sellerInfo?.phone || "N/A",
          email: item.sellerInfo?.email || "N/A",
          productName: product.productName || "N/A",
          brand: product.brand || "N/A",
          minPrice: product.minimumPrice || 0,
          desiredPrice: product.desiredPrice || 0,
          status: item.status,
          paymentStatus: item.paymentStatus,
        };
      });
    }
    return [];
  }, [data]);

  // ✅ Search filter
  const filteredRequests = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return requests.filter(
      (r) =>
        r.productName.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
    );
  }, [requests, searchTerm]);

  // ✅ Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAction = (id, action) => {
    alert(`${action} request ID: ${id}`);
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ✅ Loading & Error UI
  if (isLoading)
    return <p className="mt-10 text-center text-gray-600">Loading data...</p>;
  if (error)
    return <p className="mt-10 text-center text-red-600">Error loading data</p>;

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* Search Bar */}
      <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by product, brand, or email…"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#101749] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Email Address</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Min Price ($)</th>
              <th className="px-4 py-2 text-left">Desired Price ($)</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((req, index) => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                   <td className="px-4 py-2">{req.name}</td>
                  <td className="px-4 py-2">{req.address}</td>
                  <td className="px-4 py-2">{req.phone}</td>
                  <td className="px-4 py-2">{req.email}</td>
                  <td className="px-4 py-2">{req.productName}</td>
                  <td className="px-4 py-2">{req.brand}</td>
                  <td className="px-4 py-2">{req.minPrice}</td>
                  <td className="px-4 py-2">{req.desiredPrice}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(req.id, "Approved")}
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "Rejected")}
                        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRequests.length > 0 && (
        <div className="flex items-center justify-center gap-1 py-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-40 hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            <IoIosArrowBack size={20} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 mx-1 rounded-full border ${
                currentPage === page
                  ? "text-white bg-[#101749] border-[#101749]"
                  : "bg-transparent text-black border-transparent hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-40 hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductPurchase;
