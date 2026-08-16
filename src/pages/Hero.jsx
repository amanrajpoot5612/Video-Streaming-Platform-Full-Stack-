import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axios";
import VideoCard from "./VideoCard";

const categories = ["For you", "Music", "Gaming", "Design", "Coding", "News", "Sports", "Documentaries"];

const Hero = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("For you");

  useEffect(() => {
    let isMounted = true;

    const getVideos = async () => {
      try {
        const response = await axiosInstance.get("/videos/get-all");
        const items = Array.isArray(response?.data) ? response.data : response?.data?.data || [];

        if (isMounted) {
          setVideos([...items].sort(() => Math.random() - 0.5));
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getVideos();
    return () => { isMounted = false; };
  }, []);

  const continuedVideos = useMemo(() => videos.slice(0, 2), [videos]);

  return (
    <section className="bugsy-page home-feed" aria-labelledby="home-title">
      <div className="bugsy-page-head">
        <div>
          <span className="bugsy-eyebrow">Discover</span>
          <h1 id="home-title">Home</h1>
        </div>
      </div>

      <div className="home-feed__chips" role="tablist" aria-label="Video categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`bugsy-chip${activeCategory === category ? " is-active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bugsy-loading-grid" aria-label="Loading videos">
          {Array.from({ length: 8 }, (_, index) => <div className="bugsy-skeleton" key={index} />)}
        </div>
      ) : videos.length === 0 ? (
        <div className="bugsy-empty-state">
          <h2>Your feed is ready for its first video</h2>
          <p>When videos are available from your backend, recommendations and recent uploads will appear here.</p>
        </div>
      ) : (
        <>
          {continuedVideos.length > 0 && (
            <section aria-labelledby="continue-watching">
              <h2 id="continue-watching" className="bugsy-section-title">Continue watching</h2>
              <div className="continue-rail">
                {continuedVideos.map((video, index) => (
                  <VideoCard key={video._id || `${video.title}-${index}`} video={video} progress={index === 0 ? 63 : 28} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="recommended-videos">
            <h2 id="recommended-videos" className="bugsy-section-title">Recommended for you</h2>
            <div className="video-grid">
              {videos.map((video, index) => <VideoCard key={video._id || `${video.title}-${index}`} video={video} />)}
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default Hero;
