import { useState } from "react";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Notification from "../../component/Notification";
import { useAuth } from "../../context/auth-context";
import DemoBanner from "../Banner/DemoBanner";

const Login = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
      setNotification({ message: "Enter your username and password to continue.", color: "red" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", { username: formData.username, email: null, password: formData.password }, { withCredentials: true });
      setUser(response?.data?.data?.user || response?.data?.data || null);
      navigate("/");
    } catch (error) {
      setNotification({ message: error?.response?.data?.message || "Sign in failed. Check your details and try again.", color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DemoBanner />
      <main className="auth-page">
        <div className="auth-page__inner">
          {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
          <section className="auth-card" aria-labelledby="login-title">
            <div className="auth-brand"><LogIn size={20} className="bugsy-brand__mark" /> Bugsy</div>
            <h1 id="login-title" className="auth-title">Welcome back</h1>
            <p className="auth-intro">Sign in to keep watching, upload videos, and manage your channel.</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="bugsy-field">
                <label htmlFor="login-username">Username</label>
                <div className="auth-input-wrap">
                  <User size={18} aria-hidden="true" />
                  <input id="login-username" name="username" value={formData.username} placeholder="Enter your username" onChange={(event) => setFormData((data) => ({ ...data, username: event.target.value }))} autoComplete="username" required />
                </div>
              </div>
              <div className="bugsy-field">
                <label htmlFor="login-password">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={18} aria-hidden="true" />
                  <input id="login-password" name="password" type={showPassword ? "text" : "password"} value={formData.password} placeholder="Enter your password" onChange={(event) => setFormData((data) => ({ ...data, password: event.target.value }))} autoComplete="current-password" required />
                  <button type="button" className="bugsy-icon-btn" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>
              <div className="auth-form__options">
                <label><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /> Remember me</label>
                <a className="auth-link" href="/forgot-password">Forgot password?</a>
              </div>
              <button type="submit" className="bugsy-btn bugsy-btn--primary bugsy-btn--wide" disabled={isLoading}>{isLoading ? "Signing in…" : <><LogIn size={17} /> Sign in</>}</button>
            </form>
            <p className="auth-footer">New to Bugsy? <Link className="auth-link" to="/register">Create an account</Link></p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
