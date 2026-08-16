import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const ProfileDropdown = () => {
  const { user, setUser, Logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const logout = async () => {
    await Logout();
    setUser(null);
    navigate("/");
  };

  if (loading) return <span className="profile-menu__placeholder" aria-label="Loading account" />;

  return (
    <div className="profile-menu" ref={menuRef}>
      <button type="button" className="profile-menu__trigger" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label="Open account menu">
        {user?.avatar || user?.coverImage ? <img src={user.avatar || user.coverImage} alt="" /> : <User size={18} />}
        <ChevronDown size={15} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="profile-menu__panel">
          <Link to="/profile" onClick={() => setIsOpen(false)}><User size={16} /> Profile</Link>
          <Link to="/settings" onClick={() => setIsOpen(false)}><Settings size={16} /> Settings</Link>
          <button type="button" onClick={logout}><LogOut size={16} /> Sign out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
