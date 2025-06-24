import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaCalendarAlt } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiOutlineFolderOpen } from 'react-icons/hi';

const AllProducts = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Sort By Price (low to High)");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false); 

  const productCategories = [
    { id: 1, name: "Sodlar", products: 5, sale: 0, selltime: 2 },
    { id: 2, name: "Hjalmor", products: 15, sale: 10, selltime: 6 },
    { id: 3, name: "Sajjer", products: 16, sale: 10, selltime: 5 },
  ];

  const presets = [
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Custom Range",
  ];

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
                {`${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
              </button>

              {/* Conditionally render calendar popup */}
              {calendarVisible && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setCalendarVisible(false)} />
              )}
              {calendarVisible && (
                <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-md shadow-xl flex p-6 min-w-[700px]">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {/* From Date Picker */}
                    <div>
                      <label className="text-sm font-semibold text-black">From</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="w-full px-3 py-2 mt-1 border"
                      />
                    </div>
                    {/* To Date Picker */}
                    <div>
                      <label className="text-sm font-semibold text-black">To</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="w-full px-3 py-2 mt-1 border"
                      />
                    </div>
                    <div className="flex col-span-2 gap-6 mt-4">
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
                      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} inline />
                    </div>
                  </div>

                  {/* Presets */}
                  <div className="flex flex-col pl-4 border-l">
                    {presets.map((item, idx) => (
                      <button
                        key={idx}
                        className={`text-left px-4 py-2 hover:bg-gray-100 rounded-md text-sm ${
                          item === "Custom Range" ? "bg-orange-100 font-semibold" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                    <button
                      className="px-4 py-2 mt-auto text-white bg-blue-900 rounded-md"
                      onClick={() => setCalendarVisible(false)}
                    >
                      Apply
                    </button>
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
                <HiOutlineFolderOpen size={50} />
              </div>

              {/* Category Name */}
              <h3 className="mb-3 text-lg font-semibold text-gray-900">{category.name}</h3>

              {/* Statistics */}
              <div className="mb-4 space-y-1 text-sm text-gray-600">
                <div>Products {category.products}</div>
                <div>Sale {category.sale}</div>
                <div>Avg. Sell Time {category.selltime} days</div>
              </div>

              {/* View Products Link */}
              <button
                onClick={() => handleViewProducts(category.id)}
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
