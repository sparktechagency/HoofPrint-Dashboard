import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import userImage from "../../assets/image/admin.jpg";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  // Generate more sample data

  const initialUsers = [
    {
      id: "#01",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "123-456-7890",
      location: "New York",
      avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    },
    {
      id: "#02",
      name: "Michael Smith",
      email: "michael.smith@example.com",
      phone: "987-654-3210",
      location: "Los Angeles",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    },
    {
      id: "#03",
      name: "Emma Williams",
      email: "emma.williams@example.com",
      phone: "555-123-4567",
      location: "Chicago",
      avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    },
    {
      id: "#04",
      name: "Daniel Brown",
      email: "daniel.brown@example.com",
      phone: "444-987-6543",
      location: "Houston",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    {
      id: "#05",
      name: "Olivia Davis",
      email: "olivia.davis@example.com",
      phone: "333-555-7777",
      location: "Phoenix",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      id: "#06",
      name: "Liam Miller",
      email: "liam.miller@example.com",
      phone: "222-444-8888",
      location: "San Diego",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: "#07",
      name: "Sophia Wilson",
      email: "sophia.wilson@example.com",
      phone: "111-999-5555",
      location: "Dallas",
      avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    },
    {
      id: "#08",
      name: "Noah Moore",
      email: "noah.moore@example.com",
      phone: "666-777-8888",
      location: "Austin",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      id: "#09",
      name: "Isabella Taylor",
      email: "isabella.taylor@example.com",
      phone: "777-888-9999",
      location: "Miami",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      id: "#10",
      name: "James Anderson",
      email: "james.anderson@example.com",
      phone: "555-555-5555",
      location: "Atlanta",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      id: "#11",
      name: "Mia Thomas",
      email: "mia.thomas@example.com",
      phone: "888-777-6666",
      location: "Boston",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      id: "#12",
      name: "Benjamin Jackson",
      email: "benjamin.jackson@example.com",
      phone: "444-333-2222",
      location: "Philadelphia",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    {
      id: "#13",
      name: "Charlotte White",
      email: "charlotte.white@example.com",
      phone: "123-789-4560",
      location: "San Francisco",
      avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    },
    {
      id: "#14",
      name: "Lucas Harris",
      email: "lucas.harris@example.com",
      phone: "777-333-1111",
      location: "Las Vegas",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    },
    {
      id: "#15",
      name: "Amelia Martin",
      email: "amelia.martin@example.com",
      phone: "555-222-3333",
      location: "Denver",
      avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    },
    {
      id: "#16",
      name: "Elijah Thompson",
      email: "elijah.thompson@example.com",
      phone: "444-666-8888",
      location: "Seattle",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: "#17",
      name: "Harper Garcia",
      email: "harper.garcia@example.com",
      phone: "333-222-1111",
      location: "Portland",
      avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    },
    {
      id: "#18",
      name: "William Martinez",
      email: "william.martinez@example.com",
      phone: "123-555-9999",
      location: "Miami",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      id: "#19",
      name: "Evelyn Robinson",
      email: "evelyn.robinson@example.com",
      phone: "888-666-4444",
      location: "New York",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      id: "#20",
      name: "Henry Clark",
      email: "henry.clark@example.com",
      phone: "777-555-4444",
      location: "Chicago",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    },
    {
      id: "#21",
      name: "Abigail Rodriguez",
      email: "abigail.rodriguez@example.com",
      phone: "111-888-6666",
      location: "Houston",
      avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    },
    {
      id: "#22",
      name: "Sebastian Lewis",
      email: "sebastian.lewis@example.com",
      phone: "333-444-5555",
      location: "Austin",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    {
      id: "#23",
      name: "Ella Lee",
      email: "ella.lee@example.com",
      phone: "666-555-4444",
      location: "Dallas",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      id: "#24",
      name: "Alexander Walker",
      email: "alexander.walker@example.com",
      phone: "555-444-3333",
      location: "Atlanta",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      id: "#25",
      name: "Avery Hall",
      email: "avery.hall@example.com",
      phone: "222-999-8888",
      location: "Philadelphia",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      id: "#26",
      name: "Jack Allen",
      email: "jack.allen@example.com",
      phone: "111-444-7777",
      location: "San Diego",
      avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    },
    {
      id: "#27",
      name: "Scarlett Young",
      email: "scarlett.young@example.com",
      phone: "777-222-3333",
      location: "Seattle",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    {
      id: "#28",
      name: "Levi Hernandez",
      email: "levi.hernandez@example.com",
      phone: "888-111-4444",
      location: "Portland",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      id: "#29",
      name: "Grace King",
      email: "grace.king@example.com",
      phone: "555-666-7777",
      location: "San Francisco",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
      id: "#30",
      name: "Matthew Wright",
      email: "matthew.wright@example.com",
      phone: "444-111-9999",
      location: "Las Vegas",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // state to hold the selected user for modal
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;
  const navigate = useNavigate();


  // for user search functionality
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredUsers(initialUsers);
    } else {
      const filtered = initialUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.accType.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  };

  // for pagination functionality
  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

    const handleViewUser = (user) => {
  navigate(`/user-details/${user.id}`, { state: { user } }); // Passing user data as state
};

  const handleBlockUser = (user) => {
    setSelectedUser(user); // set the clicked user
    setIsModalBlock(true);
  };

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

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
                    <div className="flex">
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="object-cover w-10 h-10 rounded-full"
                      />
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

      {/* ================= Modal for user  details ============= */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-4 overflow-hidden bg-white rounded-md">
            <div className="relative">
              {/* Modal Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute p-1 text-white rounded-full right-2 top-2 bg-white/10 hover:bg-white/20"
              >
                <IoMdClose />
              </button>

              {/* Modal Header */}
              <div className="bg-[#52B5D1] p-6 text-center rounded-md">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden border-4 border-white rounded-full">
                  <img src={userImage} className="object-cover w-full h-full" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedUser.name}
                </h2>
              </div>

              {/* Modal  Content  */}
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <h3 className="font-bold text-black ">Email</h3>
                      <p className="text-gray-700">{selectedUser.email}</p>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-black">Account Type</h3>
                      <p className="text-gray-700">{selectedUser.accType}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <h3 className="font-bold text-black">Date Joined</h3>
                      <p className="text-gray-700">{selectedUser.date}</p>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-black">Location</h3>
                      <p className="text-gray-700">USA</p>{" "}
                      {/* You can customize */}
                    </div>
                  </div>
                </div>
                {/* Social Media Buttons */}
                <div className="mt-6">
                  <h3 className="mb-2 font-semibold text-black">Attach File</h3>
                  <div className="flex space-x-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Modal for  Block Users ============= */}
      {isModalBlock && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md overflow-hidden bg-white rounded-md">
            <div className="relative">
              {/* Modal Close Button */}
              <button
                onClick={() => setIsModalBlock(false)}
                this
                close
                not
                working
                className="absolute p-1 rounded-full right-2 top-2 bg-white/10 hover:bg-white/20"
              >
                <IoMdClose />
              </button>

              {/* Modal Header */}

              <div className="flex flex-col items-center justify-center py-12 space-y-4 px-11">
                <h2 className="text-xl font-bold text-[#101749]">
                  Are You Sure You Want to Block?
                </h2>
                <p>Do you want to Block your Users profile ?</p>
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
