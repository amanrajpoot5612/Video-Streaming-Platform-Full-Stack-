import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Setting = () => {
  const { user , logout} = useAuth();
  const [form, setForm] = useState({
    avatar: user.avatar,
    name: user.fullName,
    username: user.username,
    email: user.email,
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated!");
    // Integrate with backend API later
  };

  return (
    <div className="min-h-screen bg-home textured-bg p-6">
      <div className="max-w-3xl mx-auto bg-white textured-bg bg-sidebar rounded-xl shadow-lg p-6 border dark:border-gray-700">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>

        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={form.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <button className="px-4 py-2 bg-sidebar text-white rounded-md hover:opacity-90 transition">
            Change Avatar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-navbar text-white focus:outline-none"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-navbar text-white focus:outline-none"
            />
          </div>

          {/* Email / Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-300">
              Email or Phone
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-navbar text-white focus:outline-none"
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-navbar text-white focus:outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-navbar text-white focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-sidebar text-white rounded-md hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
