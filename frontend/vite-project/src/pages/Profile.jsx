import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const Profile = () => {

  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Update failed");
        return;
      }

      setMessage("Profile updated successfully");

      
      window.location.reload();

    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

 
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Password update failed");
        return;
      }

      setMessage("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");

    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {message}
        </div>
      )}

      
      <form onSubmit={handleUpdate} className="space-y-4">

        <div>
          <label className="text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-gray-500">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>

      </form>

    
      <hr className="my-6" />

    
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handlePasswordUpdate} className="space-y-4">

        <div>
          <label className="text-gray-500">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="text-gray-500">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>

      </form>

    </div>
  );
};

export default Profile;