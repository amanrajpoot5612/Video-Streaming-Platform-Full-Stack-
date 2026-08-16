import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import VideoCard from "../VideoCard";

const Render = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axiosInstance.get("/videos/get-all")
      .then((response) => {
        const items = Array.isArray(response?.data) ? response.data : response?.data?.data || [];
        if (isMounted) setVideos([...items].sort(() => Math.random() - 0.5));
      })
      .catch((error) => console.error("Error fetching videos:", error))
      .finally(() => isMounted && setLoading(false));
    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="bugsy-loading-grid">{Array.from({ length: 8 }, (_, index) => <div className="bugsy-skeleton" key={index} />)}</div>;
  if (!videos.length) return <div className="bugsy-empty-state"><h2>No videos found</h2><p>Try again once videos are available from the platform.</p></div>;
  return <div className="video-grid">{videos.map((video, index) => <VideoCard key={video._id || index} video={video} />)}</div>;
};

export default Render;
