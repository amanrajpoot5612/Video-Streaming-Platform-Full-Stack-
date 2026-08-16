import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import thumbnailFallback from "../../assets/thumbnail.jpeg";
import VideoCard from "../VideoCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile", { withCredentials: true });
        if (!isMounted) return;
        setUser(response?.data?.data?.user || response?.data?.data || null);
        setVideos(response?.data?.data?.videos || []);
      } catch (error) {
        console.error("Unable to load profile", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="bugsy-loading-grid" aria-label="Loading profile">{Array.from({ length: 4 }, (_, index) => <div className="bugsy-skeleton" key={index} />)}</div>;

  if (!user) {
    return <section className="bugsy-empty-state"><h2>Your creator profile is waiting</h2><p>Sign in to see your channel, video library, and account information.</p><div style={{ display: "flex", gap: 10, marginTop: 8 }}><Link className="bugsy-btn bugsy-btn--primary" to="/login">Sign in</Link><Link className="bugsy-btn bugsy-btn--ghost" to="/register">Create account</Link></div></section>;
  }

  return (
    <section className="profile-page" aria-labelledby="profile-title">
      <div className="profile-cover"><img src={user.coverImage || thumbnailFallback} alt="Channel cover" /></div>
      <div className="profile-head">
        <img className="profile-avatar" src={user.avatar || thumbnailFallback} alt="" />
        <div className="profile-head__copy"><h1 id="profile-title">{user.fullName || "Your channel"}</h1><p>@{user.username || "creator"}</p></div>
        <Link className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" to="/settings">Edit profile</Link>
      </div>
      <div className="profile-stats"><span><strong>{videos.length}</strong> videos</span><span><strong>{user.subscribersCount || 0}</strong> subscribers</span><span>{user.email}</span></div>
      <div className="profile-tabs" role="tablist"><button type="button" className="profile-tab is-active" role="tab" aria-selected="true">Videos</button><button type="button" className="profile-tab" role="tab" aria-selected="false">About</button></div>
      {videos.length ? <div className="video-grid">{videos.map((video, index) => <VideoCard key={video._id || index} video={{ ...video, owner: video.owner || user }} />)}</div> : <div className="bugsy-empty-state"><h2>No videos published yet</h2><p>Upload your first video to start building this channel.</p><Link className="bugsy-btn bugsy-btn--primary" to="/upload-video">Upload a video</Link></div>}
    </section>
  );
};

export default Profile;
