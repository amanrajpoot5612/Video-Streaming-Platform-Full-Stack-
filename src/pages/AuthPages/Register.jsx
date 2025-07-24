import React, { useState } from 'react';
import {
  User as UserIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  Camera as CameraIcon,
  Image as ImageIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon
} from 'lucide-react';
import axiosInstance from '../../api/axios';
import Notification from '../../component/Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {

  const navigate = useNavigate();
  // State to manage form data
  const [notify, setNotify] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    avatar: null,
    coverImage: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const {user , setUser} = useAuth()

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Create preview for images
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'avatar') {
          setAvatarPreview(reader.result);
        } else if (name === 'coverImage') {
          setCoverPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.avatar);
    data.append('coverImage', formData.coverImage);

    try {
      // Simulate API call
      const res = await axiosInstance.post('/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          credentials: 'true',
        },
      });

      setNotify({
        message: res.data.message || 'Registration successful!',
        color: 'green',
        duration: 3000
      })
      navigate('/');

      // Reset form
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '', 
        avatar: null,
        coverImage: null
      });
      setAvatarPreview(null);
      setCoverPreview(null);
      console.log(`res : ${res}`);
      console.log(`res.data : ${res.data}`);
      
      // setUser()
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setNotify({
        message: err.response?.data?.message || 'Registration failed. Please try again.',
        color: 'red',
        duration: 3000  
      })
      // Navigate('/');
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-neutral-900 flex">
      {/* Left Panel - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-neutral-800 to-neutral-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-8">
            <UserIcon className="w-12 h-12 text-neutral-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Welcome</h1>
          <p className="text-neutral-400 text-lg mb-8">
            Join our community and connect with people from around the world. Share your thoughts, moments, and experiences.
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-neutral-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">Watch & Share</div>
              <div className="text-neutral-400 text-sm">upto 1k Videos</div>
            </div>
            <div className="bg-neutral-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">Interact with</div>
              <div className="text-neutral-400 text-sm">50 Creators</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Notification Component */}
          {
            notify && (
              <Notification
                message={notify.message}
                color={notify.color}
                duration={notify.duration}
                onClose={() => setNotify(null)}
              />
            )
          }
          <div className="bg-neutral-800 rounded-xl shadow-2xl p-8 border border-neutral-700">
            {/* Mobile Header */}
            <div className="text-center mb-8 lg:hidden">
              <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-8 h-8 text-neutral-300" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-neutral-400">Fill in your details to get started</p>
            </div>

            <div className="space-y-6">
              {/* Full Name & Username Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      placeholder="Username"
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Create a password"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Image Uploads Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Avatar Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-20 h-20 bg-neutral-700 rounded-full flex items-center justify-center border-2 border-neutral-600 overflow-hidden">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                      ) : (
                        <CameraIcon className="w-8 h-8 text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="inline-flex items-center px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-600 cursor-pointer transition-colors"
                      >
                        <CameraIcon className="w-4 h-4 mr-1" />
                        Choose
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Cover Image
                  </label>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-full h-20 bg-neutral-700 rounded-lg overflow-hidden border-2 border-neutral-600">
                      {coverPreview ? (
                        <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="hidden"
                        id="cover-upload"
                      />
                      <label
                        htmlFor="cover-upload"
                        className="inline-flex items-center px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-xs font-medium text-neutral-300 hover:bg-neutral-600 cursor-pointer transition-colors"
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Choose
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-neutral-400 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-neutral-300 hover:text-white transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;