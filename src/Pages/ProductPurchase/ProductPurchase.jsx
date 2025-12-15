import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { EyeIcon } from "lucide-react";
import {
  useGetAllHoofprintSellsQuery,
  useUpdateProductStatusMutation,
} from "../../features/api/productApi";
import { message } from "antd";

function ProductPurchase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const pageSize = 8;

  // ✅ fetch from API
  const { data, error, isLoading } = useGetAllHoofprintSellsQuery();
  const [updateProductStatus, { isLoading: updating }] =
    useUpdateProductStatusMutation();

  // ✅ Parse data safely
  const requests = useMemo(() => {
    if (data?.data?.result) {
      return data.data.result.map((item) => ({
        id: item._id,
        sellerInfo: item.sellerInfo,
        products: item.products || [],
        status: item.status,
        createdAt: item.createdAt,
      }));
    }
    return [];
  }, [data]);

  // ✅ Search filter
  const filteredRequests = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return requests.filter(
      (r) =>
        r.sellerInfo?.name?.toLowerCase().includes(q) ||
        r.sellerInfo?.email?.toLowerCase().includes(q) ||
        r.sellerInfo?.address?.toLowerCase().includes(q)
    );
  }, [requests, searchTerm]);

  // ✅ Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Handlers
  // const handleAction = (id, action) => {
  //   alert(`${action} request ID: ${id}`);
  // };


const handleToggleStatus = async (id, currentStatus) => {
  const nextStatus = currentStatus === "Approved" ? "Rejected" : "Approved";

  try {
    await updateProductStatus({
      id,
      status: nextStatus,
    }).unwrap();

    message.success(`✅ Status changed to ${nextStatus}`);
  } catch (err) {
    console.error(err);
    message.error("❌ Failed to update status");
  }
};



  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ✅ Loading & Error
  if (isLoading)
    return <p className="mt-10 text-center text-gray-600">Loading data...</p>;
  if (error)
    return <p className="mt-10 text-center text-red-600">Error loading data</p>;

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* 🔍 Search Bar */}
      <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name, email, or address…"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
          />
        </div>
      </div>

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#101749] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((req, index) => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-2">{req.sellerInfo?.name}</td>
                  <td className="px-4 py-2">{req.sellerInfo?.address}</td>
                  <td className="px-4 py-2">{req.sellerInfo?.phone}</td>
                  <td className="px-4 py-2">{req.sellerInfo?.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "Approved"
                          ? "bg-green-100 text-red-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        // onClick={() => handleToggleStatus(req.id)}
                        onClick={() => handleToggleStatus(req.id, req.status)}

                        disabled={updating}
                        className={`px-3 py-1 text-sm text-white rounded ${
                          req.status === "Approved"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-[#101749] hover:bg-[#111847]"
                        } disabled:opacity-50`}
                      >
                        {updating
                          ? "Updating..."
                          : req.status === "Approved"
                          ? "Set Rejected"
                          : "Set Approved"}
                      </button>
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="px-3 py-1 text-sm text-[#101749] rounded hover:bg-gray-100"
                      >
                        <EyeIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
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

      {/* 🪟 Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[500px] max-h-[80vh] overflow-y-auto p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold text-[#101749] mb-3">
              Seller Information
            </h2>
            <div className="mb-4 space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {selectedRequest.sellerInfo?.name}
              </p>
              <p>
                <strong>Address:</strong> {selectedRequest.sellerInfo?.address}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRequest.sellerInfo?.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.sellerInfo?.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedRequest.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRequest.createdAt).toLocaleString()}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-[#101749] mb-2">
              Product Details
            </h3>
            <table className="w-full mb-4 text-sm border border-gray-200">
              <thead className="text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-left">Name</th>
                  <th className="px-2 py-1 text-left">Brand</th>
                  <th className="px-2 py-1 text-left">Min ($)</th>
                  <th className="px-2 py-1 text-left">Desired ($)</th>
                  <th className="px-2 py-1 text-left">Qty</th>
                  <th className="px-2 py-1 text-left">Bags</th>
                </tr>
              </thead>
              <tbody>
                {selectedRequest.products.map((p, i) => (
                  <tr key={p._id || i} className="border-t">
                    <td className="px-2 py-1">{p.productName}</td>
                    <td className="px-2 py-1">{p.brand}</td>
                    <td className="px-2 py-1">${p.minimumPrice}</td>
                    <td className="px-2 py-1">${p.desiredPrice}</td>
                    <td className="px-2 py-1">{p.quantity}</td>
                    <td className="px-2 py-1">{p.numberOfBags}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-[#101749] text-white text-sm rounded hover:bg-[#0c123b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPurchase;
