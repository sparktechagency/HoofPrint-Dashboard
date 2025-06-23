import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      categoryId: 1, // Sodlar
      image:
        "https://images.pexels.com/photos/28298815/pexels-photo-28298815/free-photo-of-a-man-in-cowboy-hat-riding-a-horse.jpeg",
      title: "Ridjacka",
      price: 1200,
    },
    {
      id: 2,
      categoryId: 2, // Hjalmor
      image:
        "https://images.pexels.com/photos/28246719/pexels-photo-28246719/free-photo-of-a-man-riding-a-horse-in-a-dirt-field.jpeg",
      title: "Träns",
      price: 400,
    },
    {
      id: 3,
      categoryId: 2, // Hjalmor
      image:
        "https://images.pexels.com/photos/28347217/pexels-photo-28347217/free-photo-of-a-man-on-a-horse-throwing-a-ball.jpeg",
      title: "Ridjacka",
      price: 600,
    },
    {
      id: 4,
      categoryId: 3, // Sajjer
      image: "https://images.pexels.com/photos/1069723/pexels-photo-1069723.jpeg",
      title: "Ridbyxor",
      price: 150,
    },
    {
      id: 5,
      categoryId: 1, // Sodlar
      image:
        "https://images.pexels.com/photos/31966333/pexels-photo-31966333/free-photo-of-young-woman-embracing-a-white-horse-outdoors.jpeg",
      title: "Ridbyxor",
      price: 160,
    },
    {
      id: 6,
      categoryId: 2, // Hjalmor
      image: "https://images.pexels.com/photos/7882321/pexels-photo-7882321.jpeg",
      title: "Ridhjälm",
      price: 180,
    },
    {
      id: 7,
      categoryId: 2, // Hjalmor
      image:
        "https://images.pexels.com/photos/28298815/pexels-photo-28298815/free-photo-of-a-man-in-cowboy-hat-riding-a-horse.jpeg",
      title: "Träns",
      price: 400,
    },
    {
      id: 8,
      categoryId: 3, // Sajjer
      image:
        "https://images.pexels.com/photos/28246719/pexels-photo-28246719/free-photo-of-a-man-riding-a-horse-in-a-dirt-field.jpeg",
      title: "Sadel",
      price: 2000,
    },
    {
      id: 9,
      categoryId: 1, // Sodlar
      image:
        "https://images.pexels.com/photos/28347217/pexels-photo-28347217/free-photo-of-a-man-on-a-horse-throwing-a-ball.jpeg",
      title: "Sadel",
      price: 1200,
    },
    {
      id: 10,
      categoryId: 3, // Sajjer
      image: "https://images.pexels.com/photos/1069723/pexels-photo-1069723.jpeg",
      title: "Ridstövlar",
      price: 700,
    },
  ]);

  // Map category IDs to names
  const categoryNames = {
    1: "Sodlar",
    2: "Hjalmor",
    3: "Sajjer",
  };

  // Filter products based on selected category
  const filteredProducts = products.filter(
    (product) => product.categoryId === Number.parseInt(categoryId)
  );

  useEffect(() => {
    // Set category name based on categoryId from URL
    const name = categoryNames[Number.parseInt(categoryId)] || "Unknown Category";
    setCategoryName(name);
  }, [categoryId]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleDeleteFromProductList = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 ">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-2 py-1 text-white transition-colors rounded bg-slate-800 hover:bg-slate-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-xl font-semibold">{categoryName}</h1>
      </div>

      {/* Product Grid */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="mt-8 text-center text-gray-500">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDeleteFromProductList(index)} // Delete product from the list
                    className="absolute p-2 text-white rounded-full top-2 right-2"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
                    <span className="text-sm font-semibold text-gray-900">{product.price} SEK</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
