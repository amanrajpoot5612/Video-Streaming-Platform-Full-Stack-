// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get('/users/me');
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not logged in.</p>;

  return (
    <div>
      <h2>Welcome, {user.fullName || user.username}</h2>
      <p>Email: {user.email}</p>
      {user.avatar && <img src={user.avatar} alt="Avatar" width="100" />}
      {/* Add more user info as needed */}
    </div>
  );
};

export default Profile;
