import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangePasswordMutation } from "../../features/api/authApi";
import { message } from "antd";

function ChangePass() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.newPassword !== form.confirmPassword) {
    alert("New password and confirm password do not match");
    return;
  }

  try {
    await changePassword({
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      confirmNewPassword: form.confirmPassword, 
    }).unwrap();
    message.success("Password changed successfully!");
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  } catch (err) {
    console.error("Change password failed:", err);
    message.error(err?.data?.message || "Failed to change password");
  }
};


  return (
    <div>
      <p className="mb-5 text-xl font-bold text-center text-primary">
        Change Password
      </p>
      <form className="space-y-4 w-auto md:w-[480px]" onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="w-full">
          <label className="text-xl font-bold">Current Password</label>
          <div className="relative w-full">
            <input
              type={showCurrent ? "text" : "password"}
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full px-5 py-3 border-2 border-black rounded-md placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 bottom-3 flex items-center text-[#6A6D76]"
            >
              {showCurrent ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="w-full">
          <label className="text-xl font-bold">New Password</label>
          <div className="relative w-full">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full px-5 py-3 mt-2 border-2 border-black rounded-md placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 bottom-3 flex items-center text-[#6A6D76]"
            >
              {showNew ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="w-full">
          <label className="text-xl font-bold">Confirm New Password</label>
          <div className="relative w-full">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full px-5 py-3 mt-2 border-2 border-black rounded-md placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 bottom-3 flex items-center text-[#6A6D76]"
            >
              {showConfirm ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="py-5 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#101749] text-white font-semibold w-full py-3 rounded-md"
          >
            {isLoading ? "Saving..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
