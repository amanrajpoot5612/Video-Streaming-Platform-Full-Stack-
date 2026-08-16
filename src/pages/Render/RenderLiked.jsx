import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import LikedVideoCard from "../../component/LikedVideoCard";

const RenderLiked = () => {
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

  if (loading) return <div className="bugsy-loading-grid"><div className="bugsy-skeleton" style={{ gridColumn: "1 / -1", minHeight: 220 }} /></div>;
  if (!videos.length) return <div className="bugsy-empty-state"><h2>No saved videos yet</h2><p>Videos you like will appear in this list.</p></div>;
  return <div className="media-list">{videos.map((video, index) => <LikedVideoCard key={video._id || index} video={video} />)}</div>;
};

export default RenderLiked;
