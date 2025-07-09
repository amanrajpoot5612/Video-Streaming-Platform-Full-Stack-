import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Play, 
  Menu,
  Mic,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

const Navbar = ({ 
  isDark = false, 
  onThemeToggle = () => {}, 
  onMenuToggle = () => {},
  user = {
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    isLoggedIn: true
  }
}) => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = () => {
    console.log('Search query:', searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Left Section - Logo & Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-200">
              YouTube
            </span>
          </div>
        </div>
        
        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search videos, channels, playlists..."
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 rounded-l-full focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                    isSearchFocused 
                      ? 'border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-700 shadow-lg' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                />
                <div className={`absolute inset-0 rounded-l-full transition-all duration-300 pointer-events-none ${
                  isSearchFocused ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''
                }`}></div>
              </div>
              
              {/* Voice Search Button */}
              <button
                type="button"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-l-0 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Mic className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors duration-200" />
              </button>
              
              {/* Search Button */}
              <button
                onClick={handleSearchSubmit}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Section - Account & Settings */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500 hover:text-yellow-400 transition-colors duration-200" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors duration-200" />
            )}
          </button>
          
          {/* Notifications */}
          <button className="relative p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110 active:scale-95">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors duration-200" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          
          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {user.isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 transition-all duration-200"
                  />
                  <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                    isAccountDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">Sign In</span>
                </div>
              )}
            </button>
            
            {/* Dropdown Menu */}
            {isAccountDropdownOpen && user.isLoggedIn && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 transform transition-all duration-200 scale-100 opacity-100">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">Your Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;