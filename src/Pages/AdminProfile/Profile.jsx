import { useState, useEffect } from "react";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "../../features/api/authApi";
import { message } from "antd";

function Profile({ setActiveTab }) {
  const { data, error, isLoading } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  // When API data arrives, update state
  useEffect(() => {
    if (data?.data) {
      setUserData({
        name: data.data.name || "",
        email: data.data.email || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = { name: userData.name }; // ✅ only send name
      const res = await updateProfile(payload).unwrap();
      message.success("Update success:", res);
      setIsEditing(false);
    } catch (err) {
      message.error("Update failed:", err);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching profile</p>;

  return (
    <div>
      <p className="mb-5 text-2xl font-bold text-center">Your Profile</p>
      <form className="space-y-2 w-auto md:w-[480px]" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="mb-2 text-xl font-bold">User Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-5 py-3 mt-2 border-2 border-black rounded-md outline-none placeholder:text-xl ${
              !isEditing ? "bg-gray-100" : ""
            }`}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="mb-2 text-xl font-bold">Email</label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="w-full px-5 py-3 mt-2 bg-gray-100 border-2 border-black rounded-md outline-none placeholder:text-xl"
            placeholder="Enter Email"
          />
        </div>

        <div className="py-5 text-center">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-[#101749] text-white font-semibold w-full py-2 rounded-lg"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-2 font-semibold text-white bg-[#0d144d] rounded-lg"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
