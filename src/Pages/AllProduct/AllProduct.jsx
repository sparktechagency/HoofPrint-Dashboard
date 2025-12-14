// src/pages/products/AllProducts.jsx
import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Eye } from "lucide-react";
import { useGetAllProductsQuery } from "../../features/api/productApi";

function AllProducts() {
  // ---- hooks: keep these at the top, unconditionally ----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // const { data, isLoading, isError, error } = useGetAllProductsQuery();
  const { data, isLoading, isError, error } =
  useGetAllProductsQuery({ page: 1, limit: 1000 });


  // products are inside data.data.result; always compute via useMemo (still a hook!)
  const products = useMemo(
    () => (Array.isArray(data?.data?.result) ? data.data.result : []),
    [data]
  );

  const categoryOptions = useMemo(() => {
    const set = new Set(
      products
        .map((p) => p?.category?.name)
        .filter(Boolean)
        .map(String)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !q ||
        p?.name?.toLowerCase().includes(q) ||
        p?.category?.name?.toLowerCase().includes(q);
      const matchesCategory =
        !categoryFilter || p?.category?.name === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // ---- after ALL hooks are declared, you can branch UI ----
  if (isLoading) {
    return <p className="mt-16 text-center">Loading products...</p>;
  }
  if (isError) {
    return (
      <p className="mt-16 text-center text-red-600">
        Error loading products: {String(error?.message || error?.status || "Unknown error")}
      </p>
    );
  }

  // ---- handlers (plain functions, not hooks) ----
  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="h-[calc(100vh-80px)] mt-16">
        {/* Filters */}
        <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row">
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name or category…"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
            />
          </div>
          <div className="w-full sm:w-72">
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
            >
              <option value="">All categories</option>
              {categoryOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#101749]">
              <tr className="text-white">
                <th className="px-4 py-2 text-left">Serial</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left"> Stock </th>
                <th className="px-4 py-2 text-left">Color</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-1 text-black">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-1 text-black">
                      <img
                        src={product?.images?.[0] || ""}
                        alt="Product"
                        className="object-cover w-10 h-10 my-2 bg-gray-100 rounded"
                        onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                      />
                    </td>
                    <td className="px-4 py-1 text-black">{product?.name}</td>
                    <td className="px-4 py-1 text-black">
                      {product?.price != null ? `$${product.price}` : "N/A"}
                    </td>
                    <td className="px-4 py-1 text-black">
                      {product?.stoke ?? product?.stock ?? "N/A"}
                    </td>
                    <td className="px-4 py-1 text-black">{product?.color ?? "—"}</td>
                    <td className="px-4 py-1 text-black">{product?.category?.name ?? "—"}</td>
                    <td className="px-4 py-1 text-black">
                      <button
                        className="p-1 ml-2 rounded text-[#101749] hover:bg-[#101749]/10"
                        onClick={() => handleViewProduct(product)}
                        title="View"
                        aria-label="View"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (button style like UserManagement) */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-center gap-1 py-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-40 hover:bg-gray-100"
              disabled={currentPage === 1}
              aria-label="Previous page"
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
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-40 hover:bg-gray-100"
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
    {isModalOpen && selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <h2 className="mb-4 text-xl font-semibold text-[#101749] text-center">
        Product Details
      </h2>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <strong>Name:</strong> {selectedProduct.name}
        </div>
        <div>
          <strong>Price:</strong> {selectedProduct.price != null ? `$${selectedProduct.price}` : "N/A"}
        </div>
        <div>
          <strong>Stock:</strong> {selectedProduct.stoke ?? selectedProduct.stock ?? "N/A"}
        </div>
        <div>
          <strong>Color:</strong> {selectedProduct.color || "N/A"}
        </div>
        <div>
          <strong>Size:</strong> {selectedProduct.size || "N/A"}
        </div>
        <div>
          <strong>Delivery Options:</strong> 
          {Array.isArray(selectedProduct.deliveryOption) && selectedProduct.deliveryOption.length > 0
            ? selectedProduct.deliveryOption.join(", ")
            : "N/A"}
        </div>
        <div>
          <strong>Shipping Charge:</strong> {selectedProduct.shippingCharge != null ? `$${selectedProduct.shippingCharge}` : "N/A"}
        </div>
        <div className="md:col-span-2">
          <strong>Category:</strong> {selectedProduct.category?.name || "N/A"}
        </div>
        <div className="md:col-span-2">
          <strong>Description:</strong> {selectedProduct.description || "N/A"}
        </div>
        <div className="md:col-span-2 ">
          {selectedProduct.images?.length > 0 ? (
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="object-fill w-full overflow-hidden rounded max-h-64"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-64 text-gray-500 bg-gray-200 rounded">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      
    </>
  );
}

export default AllProducts;
