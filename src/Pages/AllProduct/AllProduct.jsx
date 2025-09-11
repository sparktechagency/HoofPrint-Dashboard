import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { Eye } from "lucide-react";
import { useGetAllProductsQuery } from "../../features/api/productApi";

function AllProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;

  // Fetch all products
  const { data, isLoading, isError, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products: {error.message}</p>;

  // ✅ Fix: products are inside data.data.result
  const products = Array.isArray(data?.data?.result) ? data.data.result : [];

  // Filtering
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    alert("Delete functionality is not implemented yet.");
  };

  return (
    <>
      <div className="h-[calc(100vh-80px)] mt-16">
        <div className="flex justify-between p-4">
          <div className="w-72">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#101749] mb-4">
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
                  <tr key={product._id}>
                    {/* Serial Number calculation */}
                    <td className="px-4 text-black">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 text-black">
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className="object-cover w-10 h-10 my-2 rounded"
                      />
                    </td>
                    <td className="px-4 text-black">{product.name}</td>
                    <td className="px-4 text-black">${product.price}</td>
                    <td className="px-4 text-black">{product.stoke}</td>
                    <td className="px-4 text-black">{product.color}</td>
                    <td className="px-4 text-black">
                      {product.category?.name}
                    </td>
                    <td className="">
                      <button
                        className="ml-8"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye size={18} />
                      </button>
                      {/* <button onClick={() => handleDeleteProduct(product)}>
                        <FaTrash size={18} color="red" />
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <IoIosArrowBack size={20} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded-full ${
                currentPage === index + 1
                  ? "text-white bg-[#101749]"
                  : "bg-transparent text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-3/4 p-6 bg-white rounded-lg max-w-[800px] flex flex-col">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
            <p > <strong>Description:</strong>{selectedProduct.description}</p>
            </div>
            <div className="mt-4">
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p>
                <strong>Stock:</strong> {selectedProduct.stoke}
              </p>
              <p>
                <strong>Color:</strong> {selectedProduct.color}
              </p>
              <p>
                <strong>Size:</strong> {selectedProduct.size}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category?.name}
              </p>
              <p>
                <strong>Delivery Options:</strong>{" "}
                {selectedProduct.deliveryOption.join(", ")}
              </p>
              <p>
                <strong>Shipping Charge:</strong> $
                {selectedProduct.shippingCharge}
              </p>
            </div>

            {/* Image Gallery */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Images</h3>
              <div className="flex mt-2 space-x-4 overflow-x-auto">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="object-cover w-32 h-32 rounded-md"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AllProducts;
