import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaCalendarAlt } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AllProducts = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Sort By Price (low to High)");

  const [startDate, setStartDate] = useState(new Date()); // Store selected start date
  const [endDate, setEndDate] = useState(new Date()); // Store selected end date
  const [calendarVisible, setCalendarVisible] = useState(false); // To show/hide calendar

  const productCategories = [
    { id: 1, name: "Sodlar", products: 5, sale: 0, outOfStock: 2 },
    { id: 2, name: "Hjalmor", products: 15, sale: 10, outOfStock: 6 },
    { id: 3, name: "Sajjer", products: 16, sale: 10, outOfStock: 5 },
  ];

  // Navigate to the ProductDetail page with the category ID
  const handleViewProducts = (categoryId) => {
    navigate(`/product-detail/${categoryId}`);
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
          <div className="text-sm text-gray-500 mr-96">
            {/* Calendar Icon with Date Range Selection */}
            <div className="relative flex items-center space-x-4">
              <button
                onClick={() => setCalendarVisible(!calendarVisible)} 
                className="flex items-center text-blue-800"
              >
                <FaCalendarAlt className="mr-2" />
                {`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`} 
                {/* Display selected date range */}
              </button>

              {/* Conditionally render calendar popup */}
              {calendarVisible && (
                <div className="absolute z-10 mt-80 ">
                  <div className="flex gap-4">
                    {/* From Date Picker */}
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MM/dd/yyyy"
                      inline
                    />
                    {/* To Date Picker */}
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="MM/dd/yyyy"
                      inline
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 pr-8 text-sm bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Category</option>
              <option>Sodlar</option>
              <option>Hjalmor</option>
              <option>Sajjer</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 pr-8 text-sm bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Sort By Price (low to High)</option>
              <option>Sort By Price (High to low)</option>
              <option>Sort By Name (A to Z)</option>
              <option>Sort By Name (Z to A)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
            >
              {/* Folder Icon */}
              <div className="mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>

              {/* Category Name */}
              <h3 className="mb-3 text-lg font-semibold text-gray-900">{category.name}</h3>

              {/* Statistics */}
              <div className="mb-4 space-y-1 text-sm text-gray-600">
                <div>Products {category.products}</div>
                <div>Sale {category.sale}</div>
                <div>Out of Stock {category.outOfStock}</div>
              </div>

              {/* View Products Link */}
              <button
                onClick={() => handleViewProducts(category.id)} // Pass category ID
                className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
                View Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
