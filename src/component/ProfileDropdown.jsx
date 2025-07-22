import { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const { user, setUser, Logout , loading} = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();


  const logoutUser = () => {
    console.log("Logout called");
    Logout()
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
  }, [user])

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (loading) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 p-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        {
          user ? (
            <img
              src={user?.coverImage}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-8 h-8" />
          )
        }
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </div>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-md bg-white textured-bg shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
              <Link to="/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" /> Profile
              </Link>
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
              <Link to='/settings' className="flex items-center gap-2" >
                <Settings className="w-4 h-4" /> Settings
              </Link>
              
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer text-red-500"
            onClick={logoutUser} 
            >
                <LogOut className="w-4 h-4" />  
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
