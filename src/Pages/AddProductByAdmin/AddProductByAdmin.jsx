import React, { useState, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCreateProductMutation } from "../../features/api/productApi";
import { useGetAllCategoriesQuery } from "../../features/api/categoryApi";
import { useGetAllBrandsQuery } from "../../features/api/brandApi";


function AddProductByAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // 🔹 Fetch brands & categories
  const { data: brandsData } = useGetAllBrandsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery();


//   const brands = Array.isArray(brandsData?.data) ? brandsData.data : [];
// const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
const brands = Array.isArray(brandsData?.data?.result) ? brandsData.data.result : [];
const categories = Array.isArray(categoriesData?.data?.result) ? categoriesData.data.result : [];

  // const brands = brandsData?.data || [];
  // const categories = categoriesData?.data || [];

  const pageSize = 10;

  // 🔍 Filter logic
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 🧾 Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    if (form.product_image.files[0]) {
      formData.append("product_image", form.product_image.files[0]);
    }

    const data = {
      name: form.name.value,
      price: parseFloat(form.price.value),
      user: "688b38882e1086d902050c57", // static for now
      stoke: parseInt(form.stoke.value),
      category: form.category.value,
      description: form.description.value,
      color: form.color.value,
      size: form.size.value,
      forWhom: form.forWhom.value,
      gender: form.gender.value,
      brand: form.brand.value,
      deliveryOption: Array.from(form.deliveryOption)
        .filter((opt) => opt.checked)
        .map((opt) => opt.value),
      shippingCharge: parseFloat(form.shippingCharge.value),
      condition: form.condition.value,
    };

    formData.append("data", JSON.stringify(data));

    try {
      const res = await createProduct(formData).unwrap();
      alert("✅ Product created successfully!");
      console.log(res);
      setShowModal(false);
      form.reset();
    } catch (err) {
      console.error("❌ Product creation failed:", err);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* 🔍 Search + Add Button */}
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

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#101749] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((p, index) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-2">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-cover w-16 h-16 rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-16 h-16 text-sm text-gray-500 bg-gray-200 rounded">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.brand}</td>
                  <td className="px-4 py-2">${p.price}</td>
                  <td className="px-4 py-2">{p.stoke}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
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

      {/* 📄 Pagination */}
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

      {/* 🪟 Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="mb-5 text-xl font-semibold text-[#101749] text-center">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              {/* 🧾 Text Inputs */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Product Name:</label>
                  <input type="text" name="name" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Price ($):</label>
                  <input type="number" name="price" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Stock:</label>
                  <input type="number" name="stoke" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                {/* 🔽 Category Dropdown */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Category:</label>
                  <select name="category" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 🔽 Brand Dropdown */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Brand:</label>
                  <select name="brand" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]">
                    <option value="">Select Brand</option>
                    {brands.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Color:</label>
                  <input type="text" name="color" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Size:</label>
                  <input type="text" name="size" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">For Whom:</label>
                  <input type="text" name="forWhom" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Gender:</label>
                  <input type="text" name="gender" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Condition:</label>
                  <input type="text" name="condition" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Shipping Charge ($):</label>
                  <input type="number" name="shippingCharge" required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
                </div>
              </div>

              {/* 📝 Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">Description:</label>
                <textarea name="description" rows="3" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]" />
              </div>

              {/* 🚚 Delivery Options */}
              <div>
                <label className="text-sm font-medium text-gray-700">Delivery Options:</label>
                <div className="flex gap-4 mt-2">
                  <label>
                    <input type="checkbox" name="deliveryOption" value="Shipping" className="mr-1" /> Shipping
                  </label>
                  <label>
                    <input type="checkbox" name="deliveryOption" value="Pickup" className="mr-1" /> Pickup
                  </label>
                </div>
              </div>

              {/* 🖼️ Image */}
              <div>
                <label className="text-sm font-medium text-gray-700">Product Image:</label>
                <input type="file" name="product_image" accept="image/*" className="w-full" />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-white bg-[#101749] rounded hover:bg-[#0b1035] disabled:opacity-50"
                >
                  {isLoading ? "Adding..." : "Add Product"}
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
