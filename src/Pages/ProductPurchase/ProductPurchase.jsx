import React, { useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ProductPurchase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ Dummy data (20 records)
  const requests = useMemo(
    () => [
      {
        id: 1,
        address: "123 Green Road, Dhaka",
        phone: "+8801789123456",
        email: "user1@example.com",
        productName: "iPhone 14 Pro",
        brand: "Apple",
        minPrice: 950,
        desiredPrice: 1100,
      },
      {
        id: 2,
        address: "22 North Avenue, Sylhet",
        phone: "+8801678456789",
        email: "user2@example.com",
        productName: "Samsung Galaxy S23",
        brand: "Samsung",
        minPrice: 700,
        desiredPrice: 850,
      },
      {
        id: 3,
        address: "45 Agrabad, Chittagong",
        phone: "+8801999888777",
        email: "user3@example.com",
        productName: "OnePlus 12",
        brand: "OnePlus",
        minPrice: 650,
        desiredPrice: 800,
      },
      {
        id: 4,
        address: "89 KDA Avenue, Khulna",
        phone: "+8801555123456",
        email: "user4@example.com",
        productName: "Xiaomi 14 Ultra",
        brand: "Xiaomi",
        minPrice: 550,
        desiredPrice: 700,
      },
      {
        id: 5,
        address: "11 Gulshan Circle, Dhaka",
        phone: "+8801300223344",
        email: "user5@example.com",
        productName: "Google Pixel 8 Pro",
        brand: "Google",
        minPrice: 900,
        desiredPrice: 1050,
      },
      {
        id: 6,
        address: "12 CDA Avenue, Chattogram",
        phone: "+8801888002233",
        email: "user6@example.com",
        productName: "Vivo X100 Pro",
        brand: "Vivo",
        minPrice: 650,
        desiredPrice: 780,
      },
      {
        id: 7,
        address: "5 Shibbari, Khulna",
        phone: "+8801777001122",
        email: "user7@example.com",
        productName: "Oppo Find X7",
        brand: "Oppo",
        minPrice: 600,
        desiredPrice: 750,
      },
      {
        id: 8,
        address: "2 Dhanmondi, Dhaka",
        phone: "+8801444112233",
        email: "user8@example.com",
        productName: "Asus ROG Phone 8",
        brand: "Asus",
        minPrice: 850,
        desiredPrice: 950,
      },
      {
        id: 9,
        address: "33 Station Road, Rajshahi",
        phone: "+8801666778899",
        email: "user9@example.com",
        productName: "Realme GT 5",
        brand: "Realme",
        minPrice: 500,
        desiredPrice: 600,
      },
      {
        id: 10,
        address: "55 Zindabazar, Sylhet",
        phone: "+8801555997788",
        email: "user10@example.com",
        productName: "Motorola Edge 50 Pro",
        brand: "Motorola",
        minPrice: 620,
        desiredPrice: 720,
      },
      // Page 2 (more dummy data)
      {
        id: 11,
        address: "11 Mirpur-2, Dhaka",
        phone: "+8801300334455",
        email: "user11@example.com",
        productName: "Infinix Zero Ultra",
        brand: "Infinix",
        minPrice: 400,
        desiredPrice: 520,
      },
      {
        id: 12,
        address: "8 Uttara, Dhaka",
        phone: "+8801999334455",
        email: "user12@example.com",
        productName: "Huawei P60 Pro",
        brand: "Huawei",
        minPrice: 750,
        desiredPrice: 880,
      },
      {
        id: 13,
        address: "15 CDA Avenue, Chattogram",
        phone: "+8801777445566",
        email: "user13@example.com",
        productName: "Nokia X30 5G",
        brand: "Nokia",
        minPrice: 480,
        desiredPrice: 550,
      },
      {
        id: 14,
        address: "4 Rangpur City",
        phone: "+8801666888999",
        email: "user14@example.com",
        productName: "Tecno Phantom X2",
        brand: "Tecno",
        minPrice: 420,
        desiredPrice: 510,
      },
      {
        id: 15,
        address: "House 9, Mymensingh",
        phone: "+8801333555777",
        email: "user15@example.com",
        productName: "Lava Blaze 5G",
        brand: "Lava",
        minPrice: 350,
        desiredPrice: 420,
      },
      {
        id: 16,
        address: "20 Kushtia Road",
        phone: "+8801888555777",
        email: "user16@example.com",
        productName: "Honor Magic 6",
        brand: "Honor",
        minPrice: 680,
        desiredPrice: 820,
      },
      {
        id: 17,
        address: "7 Motijheel, Dhaka",
        phone: "+8801555888999",
        email: "user17@example.com",
        productName: "Sony Xperia 1 V",
        brand: "Sony",
        minPrice: 950,
        desiredPrice: 1100,
      },
      {
        id: 18,
        address: "2 College Road, Sylhet",
        phone: "+8801444001122",
        email: "user18@example.com",
        productName: "Meizu 21 Pro",
        brand: "Meizu",
        minPrice: 540,
        desiredPrice: 620,
      },
      {
        id: 19,
        address: "89 Jessore Road, Khulna",
        phone: "+8801777555666",
        email: "user19@example.com",
        productName: "Lenovo Legion Y90",
        brand: "Lenovo",
        minPrice: 720,
        desiredPrice: 830,
      },
      {
        id: 20,
        address: "Bogra City, Bogura",
        phone: "+8801999000111",
        email: "user20@example.com",
        productName: "ZTE Axon 50 Ultra",
        brand: "ZTE",
        minPrice: 500,
        desiredPrice: 580,
      },
    ],
    []
  );

  const filteredRequests = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return requests.filter(
      (r) =>
        r.productName.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
    );
  }, [requests, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAction = (id, action) => {
    alert(`${action} request ID: ${id}`);
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="h-[calc(100vh-80px)] mt-16">
      {/* Search Bar */}
      <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by product, brand, or email…"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#101749] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Email Address</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Min Price ($)</th>
              <th className="px-4 py-2 text-left">Desired Price ($)</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((req, index) => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-2">{req.address}</td>
                  <td className="px-4 py-2">{req.phone}</td>
                  <td className="px-4 py-2">{req.email}</td>
                  <td className="px-4 py-2">{req.productName}</td>
                  <td className="px-4 py-2">{req.brand}</td>
                  <td className="px-4 py-2">{req.minPrice}</td>
                  <td className="px-4 py-2">{req.desiredPrice}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(req.id, "Approved")}
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "Rejected")}
                        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRequests.length > 0 && (
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
    </div>
  );
}

export default ProductPurchase;
