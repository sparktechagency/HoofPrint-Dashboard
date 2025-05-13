import React, { useState, useRef, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaCalendarAlt } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

const AllProducts = () => {
  const [products, setProducts] = useState([
    {
      image: 'https://images.pexels.com/photos/28298815/pexels-photo-28298815/free-photo-of-a-man-in-cowboy-hat-riding-a-horse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Ridjacka',
      price: 1200,
    },
    {
      image: 'https://images.pexels.com/photos/28246719/pexels-photo-28246719/free-photo-of-a-man-riding-a-horse-in-a-dirt-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Träns',
      price: 400,
    },
    {
      image: 'https://images.pexels.com/photos/28347217/pexels-photo-28347217/free-photo-of-a-man-on-a-horse-throwing-a-ball.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Ridbyxor',
      price: 600,
    },
    {
      image: 'https://images.pexels.com/photos/1069723/pexels-photo-1069723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Ridbyxor',
      price: 150,
    },
    {
      image: 'https://images.pexels.com/photos/31966333/pexels-photo-31966333/free-photo-of-young-woman-embracing-a-white-horse-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Ridjacka',
      price: 1200,
    },
    {
      image: 'https://images.pexels.com/photos/7882321/pexels-photo-7882321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Sadel',
      price: 2000,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };




  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="mt-16">
      <div className="flex justify-between mb-8 px-4">
        {/* Search Bar */}
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-72"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Calendar Icon */}
        <div className="relative">
            <input type="date" />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center py-10">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="relative w-60 h-80 bg-gray-100 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black opacity-60 p-4">
              <div className="flex justify-between">
                <h3 className="text-white font-bold">{product.title}</h3>
                <p className="text-white">{product.price} SEK</p>
              </div>
            </div>
            <button
              className="absolute top-2 right-2 text-white p-2 rounded-full"
              onClick={() => handleDelete(index)}
            >
              <RiDeleteBin5Line />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
