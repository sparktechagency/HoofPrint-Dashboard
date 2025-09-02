import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  useGetAllBrandsQuery,
  usePatchBrandMutation,
  useDeleteBrandMutation,
  useCreateBrandMutation,
} from "../../features/api/brandApi";
import sampleImage from "../../assets/image/admin.jpg";

function Brand() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("edit");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [imageFile, setImageFile] = useState(null);

  const { data, isLoading, error } = useGetAllBrandsQuery();
  const [patchBrand] = usePatchBrandMutation();
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data.result)) {
      setBrands(data.data.result);
    }
  }, [data]);

  const openCreateModal = () => {
    setModalType("create");
    setFormData({ name: "", image: "" });
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand) => {
    setModalType("edit");
    setSelectedBrand(brand);
    setFormData({
      name: brand.name,
      image: brand.brand_image || sampleImage,
    });
    setIsModalOpen(true);
  };

 const handleUpdate = async () => {
  if (!selectedBrand) return;
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (imageFile) {
      formDataToSend.append("brand_image", imageFile);
    }

    await patchBrand({ id: selectedBrand._id, formData: formDataToSend }).unwrap();


    setBrands((prev) =>
      prev.map((b) =>
        b._id === selectedBrand._id
          ? { ...b, name: formData.name, brand_image: formData.image }
          : b
      )
    );
    setIsModalOpen(false);
    setImageFile(null);
  } catch (err) {
    console.error("Failed to update brand:", err);
  }
};

  const handleCreate = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (imageFile) {
      formDataToSend.append("brand_image", imageFile);
    }

    const newBrand = await createBrand(formDataToSend).unwrap();

    const createdBrand = newBrand.data || newBrand.result || newBrand;

    setBrands((prev) => [...prev, createdBrand]);
    setIsModalOpen(false);
    setImageFile(null);
  } catch (err) {
    console.error("Failed to create brand:", err);
    alert("Failed to create brand. Please try again.");
  }
};

  const handleDelete = async (brand) => {
    // if (!window.confirm(`Are you sure you want to delete "${brand.name}"?`)) {
    //   return;
    // }
    try {
      await deleteBrand(brand._id).unwrap();
      setBrands((prev) => prev.filter((b) => b._id !== brand._id));
    } catch (err) {
      console.error("Failed to delete brand:", err);
      alert("Failed to delete brand. Please try again.");
    }
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file); // Save the file itself for sending to backend
    setFormData({ ...formData, image: URL.createObjectURL(file) }); // For preview only
  }
};


  if (isLoading) return <p className="mt-16">Loading brands...</p>;
  if (error) return <p className="mt-16 text-red-500">Failed to load brands</p>;

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#101749] rounded hover:bg-green-700"
        >
          <FaPlus /> Create Brand
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#101749]">
            <tr className="text-white">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand._id} className="border-b">
                <td className="px-4 py-3 text-black">{index + 1}</td>
                <td className="px-4 py-3 text-black">{brand.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={brand.brand_image || sampleImage}
                    alt={brand.name}
                    className="object-fill w-20 rounded-md h-14"
                  />
                </td>
                <td className="flex items-center gap-4 px-4 py-3">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(brand)}
                    disabled={false}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit Brand */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">
              {modalType === "create" ? "Create Brand" : "Edit Brand"}
            </h2>

            <label className="block mb-2 font-medium">Brand Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label className="block mb-2 font-medium">Brand Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="object-cover w-24 h-24 mb-4 rounded"
              />
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-white bg-gray-400 rounded"
              >
                Cancel
              </button>
              {modalType === "create" ? (
                <button
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="px-4 py-2 text-white bg-green-600 rounded"
                >
                  {isCreating ? "Creating..." : "Create"}
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
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

export default Brand;
