import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { MdBlock, MdProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import userImage from "../../assets/image/admin.jpg";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/api/userApi";

function formatCurrencyBDT(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "৳0";
  }
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(Number(value));
  } catch (e) {
    return `৳${Number(value).toLocaleString()}`;
  }
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function UserManagement() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const { data, error, isLoading, isFetching } = useGetAllUsersQuery();

  const apiUsers = useMemo(() => data?.data?.result || [], [data]);

  // Normalize API users into the shape the table needs
  const normalize = (users) =>
    users.map((user, index) => ({
      id: user?._id || `${index + 1}`,
      serial: index + 1, // for stable display
      name: user?.name || "Unknown",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.address || "Unknown",
      avatar: user?.profile_image || userImage,
      totalPurchase: Number(user?.totalPurchase || 0),
      totalSales: Number(user?.totalSales || 0),
      createdAt: user?.createdAt || "",
      updatedAt: user?.updatedAt || "",
      raw: user,
    }));

  // Initial / refresh load
  useEffect(() => {
    setFilteredUsers(normalize(apiUsers));
  }, [apiUsers]);

  // Debounced search
  const runSearch = useMemo(
    () =>
      debounce((term) => {
        if (!term?.trim()) {
          setFilteredUsers(normalize(apiUsers));
          setCurrentPage(1);
          return;
        }
        const lower = term.toLowerCase();
        const filtered = apiUsers.filter((u) => {
          const name = (u?.name || "").toLowerCase();
          const email = (u?.email || "").toLowerCase();
          const phone = (u?.phone || "").toLowerCase();
          const address = (u?.address || "").toLowerCase();
          return (
            name.includes(lower) ||
            email.includes(lower) ||
            phone.includes(lower) ||
            address.includes(lower)
          );
        });
        setFilteredUsers(normalize(filtered));
        setCurrentPage(1);
      }, 300),
    [apiUsers]
  );

  const handleSearchInput = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    runSearch(term);
  };

  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // const handleViewUser = (user) => {
  //   // Navigate to details page with full user payload in state
  //   navigate(`/user-details/${user.id}`, { state: { user: user.raw || user } });
  // };

  const handleViewUserProduct = (user) => {
  const userId = user?.raw?._id || user?._id || user?.id; // use your normalized object
  navigate(`/users/${userId}/products`, { state: { user: user.raw || user } });
};

  const handleBlockUser = (user) => {
    setSelectedUser(user);
    setIsModalBlock(true);
  };

  if (error) {
    return (
      <div className="mt-10 text-center text-red-600">
        Failed to load users. Please try again.
      </div>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh-80px)] mt-16">
        {/* Header with search */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold text-[#101749]">User Management</h1>
          <div className="w-72">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by name, email, phone, or address"
              value={searchTerm}
              onChange={handleSearchInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#101749]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#101749]">
              <tr className="text-white">
                <th className="px-4 py-3 text-left">Serial</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Total Purchase</th>
                <th className="px-4 py-3 text-left">Total Sales</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(isLoading || isFetching) && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                    Loading users...
                  </td>
                </tr>
              )}

              {!isLoading && !isFetching && currentUsers.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                    No users found.
                  </td>
                </tr>
              )}

              {currentUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-black">
                    {indexOfFirstUser + idx + 1}
                  </td>
                  <td className="px-4 py-3 text-black">
                    <div className="flex items-center gap-2">
                      {/* If you want the avatar, uncomment below */}
                      {/* <img src={user.avatar} alt="User Avatar" className="object-cover w-8 h-8 rounded-full" /> */}
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black">{user.location}</td>
                  <td className="px-4 py-3 text-black">{user.email}</td>
                  <td className="px-4 py-3 text-black">{user.phone}</td>
                  <td className="px-4 py-3 text-black">
                    {user.totalPurchase}
                  </td>
                  <td className="px-4 py-3 text-black">
                    {user.totalSales}
                  </td>
                  <td className="px-4 py-3 text-black">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="p-1 rounded text-[#101749] hover:bg-[#101749]/10"
                        title="Block user"
                        aria-label={`Block ${user.name}`}
                      >
                        <MdBlock size={18} />
                      </button>
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-1 rounded text-[#101749] hover:bg-[#101749]/10"
                        title="View details"
                        aria-label={`View ${user.name}`}
                      >
                        <FaRegUser size={18} />
                      </button>
                        <button
                        onClick={() => handleViewUserProduct(user)}
                        className="p-1 rounded text-[#101749] hover:bg-[#101749]/10"
                        title="View details"
                        aria-label={`View ${user.name}`}
                      >
                        <MdProductionQuantityLimits size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-center gap-1 py-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 mx-1 text-black rounded-full disabled:opacity-40 hover:bg-gray-100"
              disabled={currentPage === 1}
              aria-label="Previous page"
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
              <IoIosArrowForward size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Modal for block user */}
      {isModalBlock && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md overflow-hidden bg-white rounded-md shadow-xl">
            <div className="relative">
              <button
                onClick={() => setIsModalBlock(false)}
                className="absolute p-1 rounded-full right-2 top-2 hover:bg-gray-100"
                aria-label="Close"
              >
                <IoMdClose />
              </button>
              <div className="flex flex-col items-center justify-center px-10 py-10 space-y-4">
                <h2 className="text-xl font-bold text-[#101749] text-center">
                  Are you sure you want to block this user?
                </h2>
                <div className="w-full p-4 text-sm rounded bg-gray-50">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Purchase</span>
                    <span className="font-medium">{formatCurrencyBDT(selectedUser.totalPurchase)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sales</span>
                    <span className="font-medium">{formatCurrencyBDT(selectedUser.totalSales)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    className="bg-[#101749] py-2 px-6 rounded-md font-semibold text-white"
                    onClick={() => {

                      setIsModalBlock(false);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="px-6 py-2 font-semibold text-[#101749] border border-[#101749] rounded-md"
                    onClick={() => setIsModalBlock(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserManagement;
