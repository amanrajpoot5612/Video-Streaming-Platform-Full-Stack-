import { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 p-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src="/avatar.png" // use any placeholder or real avatar
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </div>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-md bg-white textured-bg shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
              <User className="w-4 h-4" /> Profile
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
              <Settings className="w-4 h-4" /> Settings
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer text-red-500">
              <LogOut className="w-4 h-4" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
