import React, { useState, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function AddProductByAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "iPhone 14 Pro",
      brand: "Apple",
      minPrice: 950,
      desiredPrice: 1100,
      image: null,
    },
    {
      id: 2,
      productName: "Samsung Galaxy S23",
      brand: "Samsung",
      minPrice: 700,
      desiredPrice: 850,
      image: null,
    },
  ]);

  const pageSize = 10;

  // Filtered products
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.productName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handlers
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.image.files[0];
    const newProduct = {
      id: editProduct ? editProduct.id : Date.now(),
      productName: form.productName.value,
      brand: form.brand.value,
      minPrice: parseFloat(form.minPrice.value),
      desiredPrice: parseFloat(form.desiredPrice.value),
      image: file ? URL.createObjectURL(file) : editProduct?.image || null,
    };

    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? newProduct : p))
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }

    setShowModal(false);
    setEditProduct(null);
    form.reset();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* Search Bar & Add Button */}
      <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by product or brand..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
          />
        </div>
        <button
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
          className="px-4 py-2 text-white bg-[#101749] rounded-md hover:bg-[#0b1035]"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#101749] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Min Price ($)</th>
              <th className="px-4 py-2 text-left">Desired Price ($)</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((p, index) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{(currentPage - 1) * pageSize + index + 1}</td>
                  <td className="px-4 py-2">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.productName}
                        className="object-cover w-16 h-16 rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-16 h-16 text-sm text-gray-500 bg-gray-200 rounded">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{p.productName}</td>
                  <td className="px-4 py-2">{p.brand}</td>
                  <td className="px-4 py-2">{p.minPrice}</td>
                  <td className="px-4 py-2">{p.desiredPrice}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-[#101749]">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <input
                type="text"
                name="productName"
                defaultValue={editProduct?.productName || ""}
                placeholder="Product Name"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
              />
              <input
                type="text"
                name="brand"
                defaultValue={editProduct?.brand || ""}
                placeholder="Brand"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
              />
              <input
                type="number"
                name="minPrice"
                defaultValue={editProduct?.minPrice || ""}
                placeholder="Min Price ($)"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
              />
              <input
                type="number"
                name="desiredPrice"
                defaultValue={editProduct?.desiredPrice || ""}
                placeholder="Desired Price ($)"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full"
              />
              {editProduct?.image && (
                <img
                  src={editProduct.image}
                  alt="Preview"
                  className="object-cover w-24 h-24 mt-2 rounded"
                />
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditProduct(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#101749] rounded hover:bg-[#0b1035]"
                >
                  {editProduct ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductByAdmin;
