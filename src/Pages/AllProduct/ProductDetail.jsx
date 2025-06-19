import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to capture URL parameter
import { RiDeleteBin5Line } from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductDetail = () => {
  const { categoryId } = useParams(); // Get categoryId from the URL parameter
  const [products, setProducts] = useState([
    { id: 1, image: 'https://images.pexels.com/photos/28298815/pexels-photo-28298815/free-photo-of-a-man-in-cowboy-hat-riding-a-horse.jpeg', title: 'Ridjacka', price: 1200 },
    { id: 2, image: 'https://images.pexels.com/photos/28246719/pexels-photo-28246719/free-photo-of-a-man-riding-a-horse-in-a-dirt-field.jpeg', title: 'Träns', price: 400 },
    { id: 3, image: 'https://images.pexels.com/photos/28347217/pexels-photo-28347217/free-photo-of-a-man-on-a-horse-throwing-a-ball.jpeg', title: 'Ridbyxor', price: 600 },
    { id: 4, image: 'https://images.pexels.com/photos/1069723/pexels-photo-1069723.jpeg', title: 'Ridbyxor', price: 150 },
    { id: 5, image: 'https://images.pexels.com/photos/31966333/pexels-photo-31966333/free-photo-of-young-woman-embracing-a-white-horse-outdoors.jpeg', title: 'Ridjacka', price: 1200 },
    { id: 6, image: 'https://images.pexels.com/photos/7882321/pexels-photo-7882321.jpeg', title: 'Sadel', price: 2000 }
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Find the product by categoryId
    const product = products.find(p => p.id === parseInt(categoryId));
    setSelectedProduct(product);
  }, [categoryId]);

  if (!selectedProduct) {
    return <div>Product not found!</div>; // Show message if product doesn't exist
  }

  return (
    <div className="mt-16">
      <div className="flex justify-between px-4 mb-8">
        <h1 className="text-2xl font-semibold">{selectedProduct.title}</h1>
        <p className="text-xl font-semibold">{selectedProduct.price} SEK</p>
      </div>

      <div className="flex justify-center">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="object-cover w-80 h-80"
        />
      </div>

      {/* Additional product details can be added here */}
    </div>
  );
};

export default ProductDetail;
