import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useGetMyProfileQuery } from "../../features/api/authApi"; // ✅ import API hook
import logoImage from "../../assets/image/hoofprint.png";
import defaultImage from "../../assets/image/superadmin.png"; // fallback image

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  // ✅ Fetch profile from API
  const { data, error, isLoading } = useGetMyProfileQuery();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Extract user info (fallback to defaults)
  const adminProfile = {
    name: data?.data?.name || "Admin",
    role: data?.data?.role || "super-admin",
    image: data?.data?.image || defaultImage, // <-- make sure backend returns `image` key
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 shadow-sm w-full bg-[#101749]">
        <div className="flex justify-between py-4 ">
          <Link to={"/"} className="w-8 h-10">
            <img src={logoImage} alt="logo" className="ml-20" />
          </Link>

          <div className="flex items-center gap-4 cursor-pointer md:mr-8">
            <div className="items-center justify-center hidden w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:flex">
              <img
                src={adminProfile.image}
                alt="admin"
                className="object-cover w-10 h-10"
              />
            </div>
            <div className="hidden text-right md:block">
              {isLoading ? (
                <h3 className="text-lg font-semibold text-white">Loading...</h3>
              ) : error ? (
                <h3 className="text-lg font-semibold text-red-400">Error</h3>
              ) : (
                <h3 className="text-lg font-semibold text-white">
                  {adminProfile.name}
                </h3>
              )}
            </div>

            <button className="block lg:hidden" onClick={showDrawer}>
              <RxHamburgerMenu className="text-2xl text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar for large screens */}
        <div className="fixed left-0 hidden w-64 h-full bg-white shadow-md lg:block">
          <Sidebar adminProfile={adminProfile} />
        </div>

        {/* Mobile Drawer */}
        <ConfigProvider
          theme={{
            components: {
              Drawer: {
                colorBgElevated: "#ffffff",
              },
            },
          }}
        >
          <Drawer
            placement="right"
            width="100%"
            onClose={onClose}
            open={open}
            closeIcon={<IoMdClose className="text-2xl" />}
          >
            <Sidebar adminProfile={adminProfile} />
          </Drawer>
        </ConfigProvider>

        {/* Main Content - Adjusted for Sidebar */}
        <div className="flex-1 p-5 overflow-y-auto lg:ml-72">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
