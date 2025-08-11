import React, { useEffect, useRef, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import userImage from "../../assets/image/admin.jpg";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/api/userApi";

function UserManagement() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const { data, error, isLoading } = useGetAllUsersQuery();

  // console.log(data)
  const apiUsers = data?.data?.result || [];


  useEffect(() => {
    if (apiUsers.length > 0) {
      const formattedUsers = apiUsers.map((user, index) => ({
        id: `${index + 1}`,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.address || "Unknown",
        avatar: user.profile_image || userImage,
      }));
      setFilteredUsers(formattedUsers);
    }
  }, [data]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (term.trim() === "") {
        const formattedUsers = apiUsers.map((user, index) => ({
          id: `#${index + 1}`,
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.address || "Unknown",
          avatar: user.profile_image || userImage,
        }));
        setFilteredUsers(formattedUsers);
      } else {
        const filtered = apiUsers
          .filter(
            (user) =>
              user.name.toLowerCase().includes(term.toLowerCase()) ||
              user.email.toLowerCase().includes(term.toLowerCase())
          )
          .map((user, index) => ({
            id: `${index + 1}`,
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.address || "Unknown",
            avatar: user.profile_image || userImage,
          }));
        setFilteredUsers(filtered);
      }
      setCurrentPage(1);
    }, 300);
  };

  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewUser = (user) => {
    navigate(`/user-details/${user.id}`, { state: { user } });
  };

  const handleBlockUser = (user) => {
    setSelectedUser(user);
    setIsModalBlock(true);
  };

  if (isLoading) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  return (
    <>
      <div className="h-[calc(100vh-80px)] mt-16">
        {/* Header with search */}
        <div className="flex justify-end p-4">
          <div className="w-72">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead className="bg-[#101749] ">
              <tr className="text-white">
                <th className="px-4 py-3 text-left">Serial</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 text-black">{user.id}</td>
                  <td className="px-4 text-black">
                    <div className="flex items-center gap-2">
                      {/* <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="object-cover w-10 h-10 rounded-full"
                      /> */}
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 text-black">{user.location}</td>
                  <td className="px-4 text-black">{user.email}</td>
                  <td className="px-4 text-black">{user.phone}</td>
                  <td className="flex px-4 py-3 space-x-4">
                    <button
                      onClick={() => handleBlockUser(user)}
                      className="text-[#101749] hover:text-red-300"
                    >
                      <MdBlock size={20} />
                    </button>
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-[#101749] hover:text-red-300"
                    >
                      <FaRegUser size={20} />
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* Modal for user details */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-4 overflow-hidden bg-white rounded-md">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute p-1 text-white rounded-full right-2 top-2 bg-white/10 hover:bg-white/20"
              >
                <IoMdClose />
              </button>
              <div className="bg-[#52B5D1] p-6 text-center rounded-md">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden border-4 border-white rounded-full">
                  <img src={selectedUser.avatar} className="object-cover w-full h-full" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedUser.name}
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <h3 className="font-bold text-black ">Email</h3>
                      <p className="text-gray-700">{selectedUser.email}</p>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-black">Account Type</h3>
                      <p className="text-gray-700">{selectedUser.accType || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <h3 className="font-bold text-black">Date Joined</h3>
                      <p className="text-gray-700">{selectedUser.date || "Unknown"}</p>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-black">Location</h3>
                      <p className="text-gray-700">{selectedUser.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for block user */}
      {isModalBlock && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md overflow-hidden bg-white rounded-md">
            <div className="relative">
              <button
                onClick={() => setIsModalBlock(false)}
                className="absolute p-1 rounded-full right-2 top-2 bg-white/10 hover:bg-white/20"
              >
                <IoMdClose />
              </button>
              <div className="flex flex-col items-center justify-center py-12 space-y-4 px-11">
                <h2 className="text-xl font-bold text-[#101749]">
                  Are You Sure You Want to Block?
                </h2>
                <p>Do you want to Block this user profile?</p>
                <button className="bg-[#101749] py-3 px-8 rounded-md font-semibold text-white">
                  Confirm
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
