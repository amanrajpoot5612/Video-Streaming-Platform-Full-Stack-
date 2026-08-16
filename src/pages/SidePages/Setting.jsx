import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import thumbnailFallback from "../../assets/thumbnail.jpeg";

const Setting = () => {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", newPassword: "" });

  useEffect(() => {
    setForm({ fullName: user?.fullName || "", username: user?.username || "", email: user?.email || "", password: "", newPassword: "" });
  }, [user]);

  const save = (event) => {
    event.preventDefault();
    alert("Profile update ready to connect to your settings API.");
  };

  if (loading) return <div className="bugsy-loading-grid"><div className="bugsy-skeleton" style={{ gridColumn: "1 / -1", minHeight: 340 }} /></div>;

  return (
    <section className="settings-page" aria-labelledby="settings-title">
      <div className="settings-card">
        <span className="bugsy-eyebrow">Account</span>
        <h1 id="settings-title" className="bugsy-page-title">Account settings</h1>
        <p className="bugsy-page-subtitle">Manage the details displayed on your creator profile.</p>
        <div className="settings-card__avatar"><img src={user?.avatar || thumbnailFallback} alt="Your avatar" /><div><p style={{ margin: 0, fontWeight: 700 }}>Profile image</p><p className="bugsy-field__hint">Shown beside videos and comments.</p></div><button type="button" className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" style={{ marginLeft: "auto" }}>Change image</button></div>
        <form className="settings-form" onSubmit={save}>
          <div className="bugsy-field"><label htmlFor="setting-full-name">Full name</label><input id="setting-full-name" name="fullName" value={form.fullName} onChange={(event) => setForm((data) => ({ ...data, fullName: event.target.value }))} /></div>
          <div className="bugsy-field"><label htmlFor="setting-username">Username</label><input id="setting-username" name="username" value={form.username} onChange={(event) => setForm((data) => ({ ...data, username: event.target.value }))} /></div>
          <div className="bugsy-field"><label htmlFor="setting-email">Email address</label><input id="setting-email" name="email" type="email" value={form.email} onChange={(event) => setForm((data) => ({ ...data, email: event.target.value }))} /></div>
          <div className="auth-grid"><div className="bugsy-field"><label htmlFor="setting-password">Current password</label><input id="setting-password" type="password" value={form.password} onChange={(event) => setForm((data) => ({ ...data, password: event.target.value }))} /></div><div className="bugsy-field"><label htmlFor="setting-new-password">New password</label><input id="setting-new-password" type="password" value={form.newPassword} onChange={(event) => setForm((data) => ({ ...data, newPassword: event.target.value }))} /></div></div>
          <div><button type="submit" className="bugsy-btn bugsy-btn--primary"><Save size={17} /> Save changes</button></div>
        </form>
      </div>
    </section>
  );
};

export default Setting;
