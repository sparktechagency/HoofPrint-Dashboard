import React, { useState, useMemo, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useCreateProductMutation,
  useGetProductsByHoofPrintQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../features/api/productApi";
import { useGetAllCategoriesQuery } from "../../features/api/categoryApi";
import { useGetAllBrandsQuery } from "../../features/api/brandApi";
import { useGetAllUsersQuery } from "../../features/api/userApi";
import { message, Modal } from "antd";
import { EyeIcon, Edit2, Trash2 } from "lucide-react";

function AddProductByAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const { data: productsData, isLoading: productsLoading } = useGetProductsByHoofPrintQuery();

  const products = Array.isArray(productsData?.data?.result) ? productsData.data.result : [];

  const { data: brandsData } = useGetAllBrandsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: usersData } = useGetAllUsersQuery();

  const brands = Array.isArray(brandsData?.data?.result) ? brandsData.data.result : [];
  const categories = Array.isArray(categoriesData?.data?.result) ? categoriesData.data.result : [];
  // const users = Array.isArray(usersData?.data?.result) ? usersData.data.result : [];

  const pageSize = 8;

  // Filtered products
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle add or update
const handleSubmitProduct = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData();

  if (form.product_image.files[0]) {
    formData.append("product_image", form.product_image.files[0]);
  }

  const data = {
    name: form.name.value,
    price: parseFloat(form.price.value),
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
    productFrom: "Hoofprint",
  };

  formData.append("data", JSON.stringify(data));

  try {
    if (editProduct) {
      await updateProduct({ id: editProduct._id, body: formData }).unwrap();
      await refetch();
      message.success("✅ Product updated successfully!");
    } else {
      await createProduct(formData).unwrap();
      message.success("✅ Product created successfully!");
    }

    // ✅ Close modal after success
    setShowModal(false);
    setEditProduct(null);
    form.reset();
  } catch (err) {
    console.log(err);
    message.error("❌ Failed. Please try again.");
  }
};
  // Handle edit
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // Handle delete
  const handleDeleteProduct = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteProduct(id).unwrap();
          message.success("✅ Product deleted successfully!");
        } catch (err) {
          console.log(err)
          message.error("❌ Failed to delete product.");
        }
      },
    });
  };

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* Search + Add Button */}
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
              <th className="px-4 py-2 text-left">Serial</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {productsLoading ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((p, index) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{(currentPage - 1) * pageSize + index + 1}</td>

                  <td className="px-4 py-2">
                    {Array.isArray(p.images) && p.images.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="object-cover w-16 h-16 rounded"
                      />
                    ) : p.product_image ? (
                      <img
                        src={p.product_image}
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
                  <td className="px-4 py-2">${p.price}</td>
                  <td className="px-4 py-2">{p.stoke}</td>
                  <td className="px-4 py-2">{p.color || "N/A"}</td>
                  <td className="px-4 py-2">{p.category?.name || "N/A"}</td>
                  <td className="flex gap-2 px-4 py-2">
                    <EyeIcon size={20} className="cursor-pointer" onClick={() => setViewProduct(p)} />
                    <Edit2 size={20} className="cursor-pointer" onClick={() => handleEditProduct(p)} />
                    <Trash2 size={20} className="text-red-500 cursor-pointer" onClick={() => handleDeleteProduct(p._id)} />
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="mb-5 text-xl font-semibold text-[#101749] text-center">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmitProduct} className="space-y-4">
              {/* Inputs (prefill if editing) */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Product Name:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editProduct?.name || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Price ($):</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editProduct?.price || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Stock:</label>
                  <input
                    type="number"
                    name="stoke"
                    defaultValue={editProduct?.stoke || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Category:</label>
                  <select
                    name="category"
                    defaultValue={editProduct?.category?._id || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Brand:</label>
                  <select
                    name="brand"
                    defaultValue={editProduct?.brand?._id || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div>
                  <label className="text-sm font-medium text-gray-700">User:</label>
                  <select
                    name="user"
                    defaultValue={editProduct?.user || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  >
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name?.firstName
                          ? `${u.name.firstName} ${u.name.lastName || ""}`
                          : u.email || "Unnamed User"}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Remaining inputs */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Color:</label>
                  <input
                    type="text"
                    name="color"
                    defaultValue={editProduct?.color || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Size:</label>
                  <input
                    type="text"
                    name="size"
                    defaultValue={editProduct?.size || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">For Whom:</label>
                  <select
                    name="forWhom"
                    defaultValue={editProduct?.forWhom || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  >
                    <option value="">Select Option</option>
                    <option value="Rider">Rider</option>
                    <option value="Horse">Horse</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Gender:</label>
                  <select
                    name="gender"
                    defaultValue={editProduct?.gender || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Condition:</label>
                  <input
                    type="text"
                    name="condition"
                    defaultValue={editProduct?.condition || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Shipping Charge ($):</label>
                  <input
                    type="number"
                    name="shippingCharge"
                    defaultValue={editProduct?.shippingCharge || ""}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">Description:</label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={editProduct?.description || ""}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#101749]"
                />
              </div>

              {/* Delivery Options */}
              <div>
                <label className="text-sm font-medium text-gray-700">Delivery Options:</label>
                <div className="flex gap-4 mt-2">
                  <label>
                    <input
                      type="checkbox"
                      name="deliveryOption"
                      value="Shipping"
                      defaultChecked={editProduct?.deliveryOption?.includes("Shipping")}
                      className="mr-1"
                    />{" "}
                    Shipping
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="deliveryOption"
                      value="Pickup"
                      defaultChecked={editProduct?.deliveryOption?.includes("Pickup")}
                      className="mr-1"
                    />{" "}
                    Pickup
                  </label>
                </div>
              </div>

              {/* Product Image */}
              <div>
                <label className="text-sm font-medium text-gray-700">Product Image:</label>
                <input
                  type="file"
                  name="product_image"
                  accept="image/*"
                  className="w-full"
                />
                {editProduct?.product_image && (
                  <img
                    src={editProduct.product_image}
                    alt={editProduct.name}
                    className="object-cover w-24 h-24 mt-2 rounded"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
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
                  disabled={isCreating || isUpdating}
                  className="px-4 py-2 text-white bg-[#101749] rounded hover:bg-[#0b1035] disabled:opacity-50"
                >
                  {editProduct
                    ? isUpdating
                      ? "Updating..."
                      : "Update Product"
                    : isCreating
                    ? "Adding..."
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-xl font-semibold text-[#101749] text-center">
              Product Details
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div><strong>Name:</strong> {viewProduct.name}</div>
              <div><strong>Price:</strong> ${viewProduct.price}</div>
              <div><strong>Stock:</strong> {viewProduct.stoke}</div>
              <div><strong>Color:</strong> {viewProduct.color || "N/A"}</div>
              <div><strong>Category:</strong> {viewProduct.category?.name || "N/A"}</div>
              <div><strong>Brand:</strong> {viewProduct.brand?.name || "N/A"}</div>
              <div className="md:col-span-2">
                <strong>Description:</strong> {viewProduct.description || "N/A"}
              </div>
              <div className="md:col-span-2">
                {viewProduct.images && viewProduct.images.length > 0 ? (
                  <img
                    src={viewProduct.images[0]}
                    alt={viewProduct.name}
                    className="object-contain w-full rounded max-h-64"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-64 text-gray-500 bg-gray-200 rounded">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewProduct(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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

export default AddProductByAdmin;
