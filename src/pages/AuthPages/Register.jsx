// pages/Register.jsx
import React, { useState } from 'react';
import axiosInstance from '../../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    avatar: null,
    coverImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.avatar);
    data.append('coverImage', formData.coverImage);

    try {
      const res = await axiosInstance.post('/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration success:', res.data);
      alert('User registered!');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <label>Avatar:</label>
        <input type="file" name="avatar" accept="image/*" onChange={handleChange} required />
        <label>Cover Image:</label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
