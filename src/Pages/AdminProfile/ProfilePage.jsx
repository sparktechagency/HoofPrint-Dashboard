import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Profile from "./Profile";
import { LuPenLine } from "react-icons/lu";
import admin from "../../assets/image/admin.jpg";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="overflow-y-auto ">
      <div className="h-full px-5 pb-5">
        {activeTab === "profile" && (
          <Link to={"/"} className="flex items-center gap-x-5">
            <IoArrowBack size={30} color="#555555" />
            <h1 className="text-3xl font-bold text-white text-start">
              Profile
            </h1>
          </Link>
        )}

        {activeTab === "editProfile" && (
          <Link to={"/"} className="flex items-center gap-x-5">
            <IoArrowBack size={30} color="#555555" />
            <h1 className="text-3xl font-bold text-white text-start">
              Edit Profile
            </h1>
          </Link>
        )}

        {activeTab === "changePassword" && (
          <Link to={"/"} className="flex items-center gap-x-5">
            <IoArrowBack size={30} color="#555555" />
            <h1 className="text-3xl font-bold text-white text-start">
              Change Password
            </h1>
          </Link>
        )}

        <div className="flex flex-col items-center justify-center mx-auto ">
          {/* Profile Picture Section */}
          <div className="w-full">
            <div className="bg-[#343a64]  rounded-md ">
              <div className="p-5 mt-10 ">
                <div className="w-[122px] relative  h-[122px] mx-auto bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                  <img
                    src={admin}
                    alt="profile"
                    className="w-32 h-32 overflow-hidden rounded-full"
                  />
                  {/* Upload Icon */}
                  <div className="absolute right-0 p-2 bg-white rounded-full shadow-md cursor-pointer bottom-2">
                    <label
                      htmlFor="profilePicUpload"
                      className="cursor-pointer"
                    ></label>
                    <LuPenLine />
                    <input
                      type="file"
                      id="profilePicUpload"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation Section */}

          {activeTab === "profile" && (
            <div className="flex items-center justify-center gap-5 my-5 font-semibold text-md md:text-xl">
              <p
                onClick={() => setActiveTab("profile")}
                className={`cursor-pointer pb-1  ${
                  activeTab === "profile" ? " border-b-2 border-[#101749] " : "text-[#101749]"
                }`}
              >
                Profile
              </p>
              <p
                onClick={() => setActiveTab("changePassword")}
                className={`cursor-pointer pb-1  ${
                  activeTab === "changePassword" ? " border-b-2 " : "text-[#101749]"
                }`}
              >
                Change Password
              </p>
            </div>
          )}

          {activeTab === "editProfile" && (
            <div className="flex items-center justify-center gap-5 my-5 font-semibold text-md md:text-xl">
              <p
                onClick={() => setActiveTab("editProfile")}
                className={`cursor-pointer pb-1  ${
                  activeTab === "editProfile" ? " border-b-2  border-[#101749]" : "text-[#101749]"
                }`}
              >
                Edit Profile
              </p>
              <p
                onClick={() => setActiveTab("changePassword")}
                className={`cursor-pointer pb-1  ${
                  activeTab === "changePassword" ? " border-b-2 border-[#101749] " : "text-[#101749]"
                }`}
              >
                Change Password
              </p>
            </div>
          )}

          {activeTab === "changePassword" && (
            <div className="flex items-center justify-center gap-5 my-5 font-semibold text-md md:text-xl">
              <p
                onClick={() => setActiveTab("editProfile")}
                className={`cursor-pointer pb-1 ${
                  activeTab === "profile" ? " border-b-2  border-[#101749]" : "text-[#101749]"
                }`}
              >
                Edit Profile
              </p>
              <p
                onClick={() => setActiveTab("changePassword")}
                className={`cursor-pointer pb-1  ${
                  activeTab === "changePassword" ? " border-b-2 border-[#101749] " : "text-[#101749]"
                }`}
              >
                Change Password
              </p>
            </div>
          )}

          {/* Tab Content Section */}
          <div className="flex items-center justify-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "profile" && (
                <Profile setActiveTab={setActiveTab} />
              )}
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
