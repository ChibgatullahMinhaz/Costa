import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { uploadImageToImgBB } from "../../utilities/uploadImageToImgBB"; // তোর আগের helper

const ProfileManage = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = user?.photoURL;
      if (photoFile) {
        photoURL = await uploadImageToImgBB(photoFile);
      }

      await updateProfile(user, {
        displayName,
        photoURL,
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-lg p-6 mx-auto my-20 bg-white rounded-lg shadow"
    >
      <h2 className="mb-4 text-2xl font-bold">Manage Profile</h2>

      <label className="block mb-2">Full Name</label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhotoFile(e.target.files[0])}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white rounded ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
        }`}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileManage;
