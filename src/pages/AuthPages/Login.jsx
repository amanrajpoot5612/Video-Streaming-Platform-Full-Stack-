import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this import
import axiosInstance from '../../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // Changed from username to email to match your form
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Add this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = formData;

    // Validate fields before sending request
    if (!email || !password) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/users/login",
        {
          email: email,        // Send email
          username: null,     // Send the same value as username (since backend accepts both)
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.status === 200) {
        alert("Login successful!");
        navigate('/'); // Fixed: was navigator, now navigate
      } else {
        alert("Login failed. Please check your credentials.");
      }

      // Reset form fields
      setFormData({ email: "", password: "" });

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex">
      {/* Left Panel - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-neutral-800 to-neutral-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-8">
            <LogIn className="w-12 h-12 text-neutral-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Welcome Back!</h1>
          <p className="text-neutral-400 text-lg mb-8">
            Sign in to your account and continue your journey with us. Connect, share, and explore with our community.
          </p>
          
          <div className="space-y-4">
            <div className="bg-neutral-700/50 rounded-lg p-4">
              <div className="text-white font-semibold mb-2">🚀 New Features</div>
              <div className="text-neutral-400 text-sm">
                Discover enhanced messaging, improved profiles, and better content discovery
              </div>
            </div>
            
            <div className="bg-neutral-700/50 rounded-lg p-4">
              <div className="text-white font-semibold mb-2">🔒 Secure & Private</div>
              <div className="text-neutral-400 text-sm">
                Your data is protected with enterprise-grade security and privacy controls
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-neutral-800 rounded-xl shadow-2xl p-8 border border-neutral-700">
            {/* Mobile Header */}
            <div className="text-center mb-8 lg:hidden">
              <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-neutral-300" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-neutral-400">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-neutral-700 border-neutral-600 rounded focus:ring-2 focus:ring-neutral-500 text-neutral-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-neutral-300">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-neutral-800 text-neutral-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-neutral-600 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-neutral-600 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-neutral-400 text-sm">
                Don't have an account?{' '}
                <a href="/register" className="text-neutral-300 hover:text-white transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;