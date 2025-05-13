import { useState } from "react";

function EditProfile() {
    const [userData, setUserData] = useState({
          name:"Md. Mehedi Hasan",
          email:"mdmehedihasan@gmail.com",
          number:"01712345678",
          address:"79/A Joker Vila, Gotham City"
        });
  return (
    <div>
      <p className="mb-5 text-2xl font-bold text-center ">
        Edit Your Profile
      </p>
      <form className="space-y-4  w-auto md:w-[480px]">
        <div>
          <label className="mb-2 text-xl font-bold ">
            User Name
          </label>
          <input
            type="text"
            name="fullName"
            value={userData.name}
            className="w-full px-5 py-3  border-2  border-black    rounded-md outline-none placeholder:text-xl"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="mb-2 text-xl font-bold ">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            className="w-full px-5 py-3 mt-5  border-2 border-black  rounded-md placeholder:text-xl"
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <label className="mb-2 text-xl font-bold ">
            Contact No
          </label>
          <input
            type="number"
            value={userData.number}
            name="number"
            className="w-full px-5 py-3 mt-5   border-2  border-black    rounded-md placeholder:text-xl"
            placeholder="Contact No"
            required
          />
        </div>
        <div>
          <label className="mb-2 text-xl font-bold ">
            Address
          </label>
          <input
            type="text"
            name="location"
            value={userData.address}
            className="w-full px-5 py-3 mt-5   border-2  border-black   rounded-md placeholder:text-xl"
            placeholder="Enter Address"
            required
          />
        </div>
        <div className="py-5 text-center">
          <button className="bg-[#101749] text-white font-semibold w-full py-2 rounded-lg">
          Save & Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
