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
  const pageSize = 14;

  const { data, isLoading, isError, error } = useGetAllProductsQuery();

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
                <th className="px-4 py-3 text-left">Serial</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product._id} className="border-b">
                    <td className="px-4 text-black">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 text-black">
                      <img
                        src={product?.images?.[0] || ""}
                        alt="Product"
                        className="object-cover w-10 h-10 my-2 bg-gray-100 rounded"
                        onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                      />
                    </td>
                    <td className="px-4 text-black">{product?.name}</td>
                    <td className="px-4 text-black">
                      {product?.price != null ? `$${product.price}` : "N/A"}
                    </td>
                    <td className="px-4 text-black">
                      {product?.stoke ?? product?.stock ?? "N/A"}
                    </td>
                    <td className="px-4 text-black">{product?.color ?? "—"}</td>
                    <td className="px-4 text-black">{product?.category?.name ?? "—"}</td>
                    <td className="px-4 text-black">
                      <button
                        className="p-1 ml-2 rounded hover:bg-gray-100"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center py-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50 hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              <IoIosArrowBack size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => onPageChange(pg)}
                className={`px-3 py-1 mx-1 rounded-full ${
                  currentPage === pg
                    ? "text-white bg-[#101749]"
                    : "bg-transparent text-black hover:bg-gray-100"
                }`}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50 hover:bg-gray-100"
              disabled={currentPage === totalPages}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
     {isModalOpen && selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="relative w-11/12 max-w-3xl p-6 bg-white shadow-xl rounded-2xl">
      {/* Close button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute text-gray-500 top-4 right-4 hover:text-black"
      >
        ✕
      </button>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#101749]">
          {selectedProduct.name}
        </h2>
        {selectedProduct.category?.name && (
          <span className="inline-block px-3 py-1 mt-2 text-sm text-white rounded-full bg-[#101749]">
            {selectedProduct.category.name}
          </span>
        )}
      </div>

      {/* Description */}
      {selectedProduct.description && (
        <p className="px-2 mt-4 overflow-y-auto text-center text-gray-600 max-h-24">
          {selectedProduct.description}
        </p>
      )}

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
        <p><strong>Price:</strong> {selectedProduct.price != null ? `$${selectedProduct.price}` : "N/A"}</p>
        <p><strong>Stock:</strong> {selectedProduct.stoke ?? selectedProduct.stock ?? "N/A"}</p>
        <p><strong>Color:</strong> {selectedProduct.color || "—"}</p>
        <p><strong>Size:</strong> {selectedProduct.size || "—"}</p>
        <p><strong>Delivery Options:</strong> 
          {Array.isArray(selectedProduct.deliveryOption) && selectedProduct.deliveryOption.length > 0 
            ? selectedProduct.deliveryOption.join(", ") 
            : "—"}
        </p>
        <p><strong>Shipping Charge:</strong> {selectedProduct.shippingCharge != null ? `$${selectedProduct.shippingCharge}` : "—"}</p>
      </div>

      {/* Image gallery */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Product Images</h3>
        {selectedProduct.images?.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto">
            {selectedProduct.images.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-32 overflow-hidden bg-gray-100 rounded-lg"
              >
                <img
                  src={img}
                  alt={`Product ${i + 1}`}
                  className="object-cover w-full h-full transition-transform duration-200 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-5 py-2 text-white bg-[#101749] rounded-lg hover:bg-[#0c1236] transition"
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
