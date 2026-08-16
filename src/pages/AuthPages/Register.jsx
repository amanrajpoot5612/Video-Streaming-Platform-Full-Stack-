import { useState } from "react";
import { Camera, Eye, EyeOff, Image, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Notification from "../../component/Notification";

const Register = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "", avatar: null, coverImage: null });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (!files) {
      setFormData((data) => ({ ...data, [name]: value }));
      return;
    }
    const file = files[0] || null;
    setFormData((data) => ({ ...data, [name]: file }));
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => (name === "avatar" ? setAvatarPreview(reader.result) : setCoverPreview(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value || ""));

    try {
      await axiosInstance.post("/users/register", data, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
      navigate("/login");
    } catch (error) {
      setNotification({ message: error?.response?.data?.message || "Registration failed. Please try again.", color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-page__inner auth-page__inner--wide">
        {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
        <section className="auth-card" aria-labelledby="register-title">
          <div className="auth-brand"><User size={20} className="bugsy-brand__mark" /> Bugsy</div>
          <h1 id="register-title" className="auth-title">Create your account</h1>
          <p className="auth-intro">Set up your creator profile in a few focused steps.</p>
          <form className="auth-form auth-form--register" onSubmit={handleSubmit}>
            <div className="auth-grid">
              <div className="bugsy-field"><label htmlFor="full-name">Full name</label><div className="auth-input-wrap"><User size={18} /><input id="full-name" name="fullName" value={formData.fullName} placeholder="Your name" onChange={handleChange} required /></div></div>
              <div className="bugsy-field"><label htmlFor="register-username">Username</label><div className="auth-input-wrap"><User size={18} /><input id="register-username" name="username" value={formData.username} placeholder="Choose a username" onChange={handleChange} required /></div></div>
            </div>
            <div className="bugsy-field"><label htmlFor="register-email">Email address</label><div className="auth-input-wrap"><Mail size={18} /><input id="register-email" name="email" type="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} autoComplete="email" required /></div></div>
            <div className="bugsy-field"><label htmlFor="register-password">Password</label><div className="auth-input-wrap"><Lock size={18} /><input id="register-password" name="password" type={showPassword ? "text" : "password"} value={formData.password} placeholder="Create a password" onChange={handleChange} autoComplete="new-password" required /><button type="button" className="bugsy-icon-btn" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            <div className="auth-upload-grid">
              <div className="auth-upload"><span className="bugsy-field__hint">Profile image</span><div className="auth-upload__avatar">{avatarPreview ? <img src={avatarPreview} alt="Avatar preview" /> : <Camera size={25} />}</div><input id="avatar-upload" name="avatar" type="file" accept="image/*" onChange={handleChange} required hidden /><label className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" htmlFor="avatar-upload">Choose image</label></div>
              <div className="auth-upload"><span className="bugsy-field__hint">Cover image</span><div className="auth-upload__cover">{coverPreview ? <img src={coverPreview} alt="Cover preview" /> : <Image size={25} />}</div><input id="cover-upload" name="coverImage" type="file" accept="image/*" onChange={handleChange} required hidden /><label className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" htmlFor="cover-upload">Choose image</label></div>
            </div>
            <button type="submit" className="bugsy-btn bugsy-btn--primary bugsy-btn--wide" disabled={isLoading}>{isLoading ? "Creating account…" : "Create account"}</button>
          </form>
          <p className="auth-footer">Already have an account? <Link className="auth-link" to="/login">Sign in</Link></p>
        </section>
      </div>
    </main>
  );
};

export default Register;
