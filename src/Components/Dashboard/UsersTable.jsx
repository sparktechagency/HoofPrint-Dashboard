  import React, { useState } from "react";
  import { EyeOutlined } from "@ant-design/icons";
  import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
  import { MdBlock } from "react-icons/md";
  import userImage from "../../assets/image/admin.jpg";
  
  function UsersTable() {
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
    ];
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalBlock, setIsModalBlock] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 

  
    const handleBlockUser = (user) => {
      setSelectedUser(user); 
      setIsModalBlock(true);
    };
  
    return (
      <>
        <div>
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
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {initialUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 text-black">{user.id}</td>
                    <td className="px-4 text-black">
                      <div className="flex">
                        <img
                          src={user.avatar}
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p>{user.name}</p>
                      </div>
                    </td>
                    <td className="px-4 text-black">{user.location}</td>
                    <td className="px-4 text-black">{user.email}</td>
                    <td className="px-4 text-black">{user.phone}</td>
                    <td className="flex px-4 py-3 space-x-4">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-white hover:text-gray-200"
                      >
                        <EyeOutlined size={20} />
                      </button>
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="text-[#101749] hover:text-red-300"
                      >
                        <MdBlock size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  
  export default UsersTable;
  
  