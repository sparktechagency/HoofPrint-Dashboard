import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  return (
    <div>
      <p className="mb-5 text-xl font-bold text-center text-primary">
        Change Password
      </p>
      <form className="space-y-4 w-auto md:w-[480px]">
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-xl font-bold "
          >
            Current Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full px-5 py-3  rounded-md   border-2 border-black placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute flex items-center t right-3 bottom-4"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="mb-2 text-xl font-bold "
          >
            New Password
          </label>
          <div className="relative w-full">
            <input
              type={newPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full  border-2 border-black rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setNewPassword(!newPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="mb-2 text-xl font-bold "
          >
            Confirm New Password
          </label>
          <div className="relative w-full">
            <input
              type={confirmPassword ? "text" : "password"}
              name="password"
              placeholder="**********"
              className="w-full border-2 border-black rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl "
              required
            />
            <button
              type="button"
              onClick={() => setConfirmPassword(!confirmPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {confirmPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="py-5 text-center">
          <button className="bg-[#101749] text-white font-semibold w-full py-3 rounded-md">
            Save & Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
