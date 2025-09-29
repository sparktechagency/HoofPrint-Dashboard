import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { MdBlock, MdLockOpen, MdProductionQuantityLimits } from "react-icons/md";
import { Eye } from "lucide-react";
import userImage from "../../assets/image/admin.jpg";
import { useNavigate } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useToggleBlockUserMutation,
} from "../../features/api/userApi";

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const fmtDateTime = (iso) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(new Date(iso))
      .replace(",", " /");
  } catch {
    return iso;
  }
};

function UserManagement() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // details modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;

  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const { data, error, isLoading, isFetching } = useGetAllUsersQuery();

  const [toggleBlockUser, { isLoading: isBlocking }] =
    useToggleBlockUserMutation();

  const apiUsers = useMemo(() => data?.data?.result || [], [data]);

  // normalize user for table
  const normalize = (users) =>
    users.map((user, index) => ({
      id: user?._id || `${index + 1}`,
      serial: index + 1,
      name: user?.name || "Unknown",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.address || "Unknown",
      avatar: user?.profile_image || userImage,
      totalPurchase: Number(user?.totalPurchase || 0),
      totalSales: Number(user?.totalSales || 0),
      age: user?.age ? user.age : "Not Provided", // ✅ Added Age
      createdAt: user?.createdAt || "",
      updatedAt: user?.updatedAt || "",
      isBlocked: user?.user?.isBlocked || false,
      raw: user,
    }));

  useEffect(() => {
    setFilteredUsers(normalize(apiUsers));
  }, [apiUsers]);

  // debounced search
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

  // open details modal
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleViewUserProduct = (user) => {
    const userId = user?.raw?._id || user?._id || user?.id;
    navigate(`/users/${userId}/products`, {
      state: { user: user.raw || user },
    });
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
          <h1 className="text-lg font-semibold text-[#101749]">
            User Management
          </h1>
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
                <th className="px-4 py-3 text-left">Age</th> {/* ✅ New column */}
                <th className="px-4 py-3 text-left">Total Purchase</th>
                <th className="px-4 py-3 text-left">Total Sales</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(isLoading || isFetching) && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={9}
                  >
                    Loading users...
                  </td>
                </tr>
              )}

              {!isLoading && !isFetching && currentUsers.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={9}
                  >
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
                      <span className="inline-flex items-center justify-center rounded-full ring-1 ring-gray-200 p-[2px]">
                        <img
                          src={user.avatar}
                          alt={user.name || "User"}
                          className="object-cover bg-gray-100 rounded-full w-9 h-9"
                          onError={(e) => {
                            e.currentTarget.src = userImage;
                          }}
                        />
                      </span>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black">{user.location}</td>
                  <td className="px-4 py-3 text-black">{user.email}</td>
                  <td className="px-4 py-3 text-black">{user.phone}</td>
                  <td className="px-4 py-3 text-black">{user.age}</td> {/* ✅ */}
                  <td className="px-4 py-3 text-black">{user.totalPurchase}</td>
                  <td className="px-4 py-3 text-black">{user.totalSales}</td>
                  <td className="px-4 py-3 text-black">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="p-1 rounded text-[#101749] hover:bg-[#101749]/10"
                        title={user.isBlocked ? "Unblock user" : "Block user"}
                        aria-label={`${
                          user.isBlocked ? "Unblock" : "Block"
                        } ${user.name}`}
                      >
                        {user.isBlocked ? (
                          <MdLockOpen size={18} />
                        ) : (
                          <MdBlock size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-1 rounded text-[#101749] hover:bg-[#101749]/10"
                        title="View details"
                        aria-label={`View ${user.name}`}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleViewUserProduct(user)}
                        className="p-1 rounded text-[#101749] hover:bg-[#101749]/10"
                        title="View products"
                        aria-label={`View products for ${user.name}`}
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

      {/* ===== Block/Unblock modal ===== */}
      {isModalBlock && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md overflow-hidden bg-white rounded-md shadow-xl">
            <div className="relative p-6">
              <button
                onClick={() => setIsModalBlock(false)}
                className="absolute p-1 rounded-full right-2 top-2 hover:bg-gray-100"
                aria-label="Close"
              >
                <IoMdClose />
              </button>
              <h2 className="text-xl font-bold text-[#101749] text-center mb-6">
                {selectedUser.isBlocked
                  ? "Are you sure you want to unblock this user?"
                  : "Are you sure you want to block this user?"}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="bg-[#101749] py-2 px-6 rounded-md font-semibold text-white"
                  disabled={isBlocking}
                  onClick={async () => {
                    try {
                      const userId = selectedUser?.raw?.user?._id;
                      await toggleBlockUser(userId).unwrap();
                      setIsModalBlock(false);
                    } catch (err) {
                      console.error("Failed to block/unblock user", err);
                    }
                  }}
                >
                  {isBlocking ? "Processing..." : "Confirm"}
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
      )}
    </>
  );
}

export default UserManagement;