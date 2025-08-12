import React from "react";
import useAuth from "../../Hooks/useAuth";

const ProfileView = () => {
  const { user } = useAuth(); // Firebase user

  return (
    <div className="max-w-lg p-6 mx-auto my-20 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-bold">My Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="object-cover w-32 h-32 mb-4 rounded-full"
        />
        <p className="text-lg font-semibold">{user?.displayName || "No Name"}</p>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileView;
