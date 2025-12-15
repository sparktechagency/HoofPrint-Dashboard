import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  usePatchCategoryMutation,
} from "../../features/api/categoryApi";
import sampleImage from "../../assets/image/admin.jpg";

function Category() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("edit");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [imageFile, setImageFile] = useState(null);

  // NEW: filtering state
  const [searchTerm, setSearchTerm] = useState("");
  const searchDebounceRef = useRef(null);

  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const [patchCategory] = usePatchCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data.result)) {
      setCategories(data.data.result);
    }
  }, [data]);

  const openCreateModal = () => {
    setModalType("create");
    setFormData({ name: "", image: "" });
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setModalType("edit");
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      image: category.category_image || sampleImage,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (imageFile) {
        formDataToSend.append("category_image", imageFile);
      }

      await patchCategory({
        id: selectedCategory._id,
        formData: formDataToSend,
      }).unwrap();

      setCategories((prev) =>
        prev.map((c) =>
          c._id === selectedCategory._id
            ? {
                ...c,
                name: formData.name,
                // NOTE: the server returns the actual file URL. This line only updates preview
                category_image: imageFile ? formData.image : c.category_image,
              }
            : c
        )
      );
      setIsModalOpen(false);
      setImageFile(null);
    } catch (err) {
      console.error("Failed to update category:", err);
      alert("Failed to update category. Please try again.");
    }
  };

  const handleCreate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (imageFile) {
        formDataToSend.append("category_image", imageFile);
      }

      const newCategory = await createCategory(formDataToSend).unwrap();
      const createdCategory = newCategory.data || newCategory.result || newCategory;

      setCategories((prev) => [...prev, createdCategory]);
      setIsModalOpen(false);
      setImageFile(null);
    } catch (err) {
      console.error("Failed to create category:", err);
      alert("Failed to create category. Please try again.");
    }
  };

  const handleDelete = async (category) => {
    try {
      await deleteCategory(category._id).unwrap();
      setCategories((prev) => prev.filter((c) => c._id !== category._id));
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // Debounced search setter
  const onSearchChange = (e) => {
    const value = e.target.value;
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 250);
  };

  // Derived filtered list (case-insensitive by name)
  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((c) => (c?.name || "").toLowerCase().includes(term));
  }, [categories, searchTerm]);

  const indexOfLastCategory = currentPage * pageSize;
  const indexOfFirstCategory = indexOfLastCategory - pageSize;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (isLoading) return <p className="mt-16">Loading categories...</p>;
  if (error) return <p className="mt-16 text-red-500">Failed to load categories</p>;

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* Header actions */}
      <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row">
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 text-white rounded bg-[#101749] hover:opacity-90"
        >
          <FaPlus /> Create Category
        </button>

        {/* NEW: Filter by category name */}
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter by category name…"
            onChange={onSearchChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#101749]">
            <tr className="text-white">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Total Products</th>
              <th className="px-4 py-3 text-left">Total Products Sold</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category, index) => (
              <tr key={category._id} className="border-b">
                <td className="px-4 py-3 text-black"> {(currentPage - 1) * pageSize + index + 1}</td>
                <td className="px-4 py-3 text-black">{category.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={category.category_image || sampleImage}
                    alt={category.name}
                    className="object-fill w-20 rounded-md h-14"
                  />
                </td>
                <td className="px-4 py-3 text-black">{category.totalProducts}</td>
                <td className="px-4 py-3 text-black">{category.totalProductsSold}</td>
                <td className="flex items-center gap-4 px-4 py-3">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredCategories.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No categories match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredCategories.length > 0 && (
        <div className="flex items-center justify-center gap-1 py-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-40 hover:bg-gray-100"
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FaArrowLeft size={20} />
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
            <FaArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Modal for Create/Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">
              {modalType === "create" ? "Create Category" : "Edit Category"}
            </h2>

            <label className="block mb-2 font-medium">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label className="block mb-2 font-medium">Category Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="object-cover w-24 h-24 mb-4 rounded" />
            )}

            <div className="flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-white bg-gray-400 rounded">
                Cancel
              </button>
              {modalType === "create" ? (
                <button onClick={handleCreate} className="px-4 py-2 text-white bg-green-600 rounded">
                  Create
                </button>
              ) : (
                <button onClick={handleUpdate} className="px-4 py-2 text-white bg-blue-500 rounded">
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
