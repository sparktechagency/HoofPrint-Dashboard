import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const buyProducts = [
    { no: 1, name: "Ridhjalm", price: "180 SEK" },
    { no: 2, name: "Ridhjalm", price: "180 SEK" },
    { no: 3, name: "Ridhjalm", price: "180 SEK" },
  ];

  const sellProducts = [
    { no: 1, name: "Ridstövlar", price: "700 SEK" },
    { no: 2, name: "Ridstövlar", price: "700 SEK" },
    { no: 3, name: "Ridstövlar", price: "700 SEK" },
  ];

  const currentProducts = [
    { no: 1, name: "Ridhjalm", price: "180 SEK" },
    { no: 2, name: "Ridstövlar", price: "700 SEK" },
    { no: 3, name: "Ridbyxor", price: "160 SEK" },
  ];

  const handleBackClick = () => {
    alert("Navigating back to User Page");
  };
  return (
    <div>
      <div className="min-h-screen p-6 mt-16 bg-gray-50">
        <div>
          {/* Back Button */}
          <button className=" px-4 py-2 mb-2  text-white transition-colors rounded-md bg-[#101749] hover:bg-slate-700">
            <Link to={"/user-management"} className="flex items-center gap-2">
              <FaArrowLeft />
              Back to User Page
            </Link>
          </button>

          {/* User Details Section */}
          <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h1 className="mb-6 text-2xl font-semibold text-gray-900">
              User Details
            </h1>

            <div className="flex items-start gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="User Profile"
                  className="object-cover w-20 h-20 rounded-full"
                />
              </div>

              {/* User Information */}
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 font-medium text-gray-700">Name:</span>
                  <span className="text-gray-600">Jacob</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-700">Age:</span>
                  <span className="text-gray-600">26</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-700">
                    Phone Number:
                  </span>
                  <span className="text-gray-600">Jacob</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-700">Email:</span>
                  <span className="text-gray-600">jacob@gmail.com</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium text-gray-700">
                    Location:
                  </span>
                  <span className="text-gray-600">
                    1650 Broadway, New York City, NY 10019-6833
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buy Products Section */}
          <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Buy Products
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-collapse border-gray-300">
                <thead>
                  <tr className="text-white bg-slate-800">
                    <th className="px-4 py-3 text-left border border-gray-300">
                      No
                    </th>
                    <th className="px-4 py-3 text-left border border-gray-300">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left border border-gray-300">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buyProducts.map((product) => (
                    <tr key={product.no} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300">
                        {product.no}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {product.price}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-medium bg-gray-50">
                    <td
                      className="px-4 py-3 border border-gray-300"
                      colSpan={2}
                    >
                      Total
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      540 SEK
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sell Products Section */}
          <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Sell Products
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-collapse border-gray-300">
                <thead>
                  <tr className="text-white bg-slate-800">
                    <th className="px-4 py-3 text-left border border-gray-300">
                      No
                    </th>
                    <th className="px-4 py-3 text-left border border-gray-300">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left border border-gray-300">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sellProducts.map((product) => (
                    <tr key={product.no} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300">
                        {product.no}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {product.price}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-medium bg-gray-50">
                    <td
                      className="px-4 py-3 border border-gray-300"
                      colSpan={2}
                    >
                      Total
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      2100 SEK
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Current Products Section */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Current Products
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-collapse border-gray-300">
                <thead>
                  <tr className="text-white bg-slate-800">
                    <th className="px-4 py-3 text-left border border-gray-300">
                      No
                    </th>
                    <th className="px-4 py-3 text-left border border-gray-300">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left border border-gray-300">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.no} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300">
                        {product.no}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
