import { Bell, Bug, Menu, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../context/auth-context";

const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <nav className="app-topbar" aria-label="Global navigation">
      <div className="app-topbar__brand">
        {onToggleSidebar && (
          <button type="button" className="bugsy-icon-btn" onClick={onToggleSidebar} aria-label="Toggle navigation">
            <Menu size={20} />
          </button>
        )}
        <Link to="/" className="bugsy-brand" aria-label="Bugsy home">
          <Bug className="bugsy-brand__mark" size={24} strokeWidth={2.4} />
          <span className="bugsy-brand__name">Bugsy</span>
        </Link>
      </div>

      <label className="bugsy-search" aria-label="Search videos">
        <Search size={16} aria-hidden="true" />
        <input type="search" placeholder="Search videos, channels, topics" />
        <kbd>/</kbd>
      </label>

      <div className="app-topbar__end">
        <Link to="/upload-video" className="bugsy-btn bugsy-btn--primary bugsy-btn--compact">
          <Plus size={16} aria-hidden="true" />
          <span className="bugsy-btn__text">Upload</span>
        </Link>
        <button type="button" className="bugsy-icon-btn" aria-label="Notifications, 3 unread">
          <Bell size={19} />
          <span className="bugsy-badge">3</span>
        </button>
        {user ? (
          <ProfileDropdown />
        ) : (
          <div className="bugsy-auth-links">
            <Link to="/register">Register</Link>
            <span aria-hidden="true">/</span>
            <Link to="/login">Sign in</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
