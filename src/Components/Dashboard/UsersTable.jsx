// src/pages/users/UsersTable.jsx
import React, { useMemo, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IoMdClose } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import userImage from "../../assets/image/admin.jpg";
import { useGetAllUsersQuery } from "../../features/api/userApi";

const fmtDate = (iso) => {
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

// Normalize to a consistent shape
const normalize = (users) =>
  (users || []).map((u, i) => ({
    id: u?._id || `#${i + 1}`,
    name: u?.name || "Unknown",
    email: u?.email || "",
    phone: u?.phone || "",
    location: u?.address || "Unknown",
    avatar: u?.profile_image || userImage,
    createdAt: u?.createdAt || "",
    totalPurchase: Number(u?.totalPurchase || 0),
    totalSales: Number(u?.totalSales || 0),
    raw: u,
  }));

function UsersTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBlock, setIsModalBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ same API as UserManagement
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  const latestFive = useMemo(() => {
    const apiUsers = data?.data?.result || [];
    const norm = normalize(apiUsers);
    // sort by createdAt desc, then take 5
    norm.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return norm.slice(0, 5);
  }, [data]);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleBlockUser = (user) => {
    setSelectedUser(user);
    setIsModalBlock(true);
  };

  if (isLoading) {
    return <p className="mt-6 text-center">Loading latest users…</p>;
  }
  if (isError) {
    return (
      <p className="mt-6 text-center text-red-600">
        Failed to load users{error?.status ? ` (HTTP ${error.status})` : ""}.
      </p>
    );
  }

  return (
    <>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#101749]">
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
              {latestFive.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                latestFive.map((user, index) => (
                  <tr key={user.id} className="border-b ">
                    <td className="px-4 py-3 text-black">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-3 text-black">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="object-cover w-10 h-10 bg-gray-100 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = userImage;
                          }}
                        />
                        <div>
                          <p className="font-medium leading-tight">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-black">{user.location}</td>
                    <td className="px-4 py-3 text-black">{user.email}</td>
                    <td className="px-4 py-3 text-black">{user.phone}</td>

                    <td className="flex px-4 py-3 space-x-4">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-[#101749] hover:text-[#0b1349]"
                        title="View"
                        aria-label={`View ${user.name}`}
                      >
                        <EyeOutlined />
                      </button>
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="text-[#101749] hover:text-red-400"
                        title="Block"
                        aria-label={`Block ${user.name}`}
                      >
                        <MdBlock size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============= Modal: user details ============= */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-4 overflow-hidden bg-white rounded-md">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute p-1 rounded-full right-2 top-2 hover:bg-gray-100"
                aria-label="Close"
              >
                <IoMdClose />
              </button>

              <div className="bg-[#101749] p-6 text-center rounded-md">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden border-4 border-white rounded-full">
                  <img
                    src={selectedUser.avatar || userImage}
                    onError={(e) => {
                      e.currentTarget.src = userImage;
                    }}
                    className="object-cover w-full h-full"
                    alt={selectedUser.name}
                  />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {selectedUser.name}
                </h2>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <h3 className="font-bold text-black">Email</h3>
                      <p className="text-gray-700">
                        {selectedUser.email || "—"}
                      </p>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-black">Phone</h3>
                      <p className="text-gray-700">
                        {selectedUser.phone || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <h3 className="font-bold text-black">Date Joined</h3>
                      <p className="text-gray-700">
                        {fmtDate(selectedUser.createdAt)}
                      </p>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-black">Location</h3>
                      <p className="text-gray-700">
                        {selectedUser.location || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Totals (optional) */}
                {(Number.isFinite(selectedUser.totalPurchase) ||
                  Number.isFinite(selectedUser.totalSales)) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 rounded-md bg-gray-50">
                      <div className="text-xs text-gray-500">
                        Total Purchase
                      </div>
                      <div className="text-lg font-semibold">
                        {selectedUser.totalPurchase}
                      </div>
                    </div>
                    <div className="p-3 rounded-md bg-gray-50">
                      <div className="text-xs text-gray-500">Total Sales</div>
                      <div className="text-lg font-semibold">
                        {selectedUser.totalSales}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-white bg-[#101749] rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============= Modal: block user ============= */}
      {isModalBlock && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md overflow-hidden bg-white rounded-md">
            <div className="relative">
              <button
                onClick={() => setIsModalBlock(false)}
                className="absolute p-1 rounded-full right-2 top-2 hover:bg-gray-100"
                aria-label="Close"
              >
                <IoMdClose />
              </button>

              <div className="flex flex-col items-center justify-center py-12 space-y-4 px-11">
                <h2 className="text-xl font-bold text-[#101749] text-center">
                  Are You Sure You Want to Block?
                </h2>
                <p className="text-center">
                  Do you want to block this user profile?
                </p>
                <button
                  className="bg-[#101749] py-3 px-8 rounded-md font-semibold text-white"
                  onClick={() => {
                    // TODO: call your block API with selectedUser.raw?._id
                    setIsModalBlock(false);
                  }}
                >
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
