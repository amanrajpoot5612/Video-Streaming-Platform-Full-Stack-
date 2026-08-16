import { useEffect, useState } from "react";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import thumbnailFallback from "../../assets/thumbnail.jpeg";
import Navbar from "../../component/Navbar";
import VideoPlayer from "../../component/VideoPlayer";
import { optimizeCloudinaryUrl } from "../../utils/Cloudinary";

const formatDate = (timestamp) => timestamp
  ? new Date(timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  : "Recently added";

const UpNextCard = ({ video, index }) => {
  const source = video?.thumbnail || thumbnailFallback;
  const image = typeof source === "string" ? optimizeCloudinaryUrl(source, 320, 180) : thumbnailFallback;
  const owner = video?.owner?.fullName || "Bugsy creator";

  return (
    <article className="up-next-card">
      <div className="up-next-card__thumbnail">
        <img src={image} alt="" />
        <span className="video-card__duration">{video?.duration ? `${video.duration} min` : `${8 + index}:24`}</span>
      </div>
      <div>
        <h3 className="up-next-card__title">{video?.title || "A fresh perspective from the Bugsy community"}</h3>
        <p>{owner}</p>
        <p>{video?.views || "1.2K"} views</p>
      </div>
    </article>
  );
};

const PlayerPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [upNext, setUpNext] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchVideo = async () => {
      try {
        const [videoResponse, feedResponse] = await Promise.all([
          axiosInstance.get(`/videos/watch/${id}`),
          axiosInstance.get("/videos/get-all"),
        ]);
        if (!isMounted) return;
        setVideo(videoResponse?.data?.data || videoResponse?.data || null);
        const feed = Array.isArray(feedResponse?.data) ? feedResponse.data : feedResponse?.data?.data || [];
        setUpNext(feed.filter((item) => item._id !== id).slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch video", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchVideo();
    return () => { isMounted = false; };
  }, [id]);

  const owner = video?.owner || {};
  const ownerAvatar = owner.avatar || thumbnailFallback;

  return (
    <div className="watch-app">
      <Navbar />
      <main className="watch-page standalone-page">
        {loading ? (
          <div className="bugsy-loading-grid" aria-label="Loading video"><div className="bugsy-skeleton" style={{ gridColumn: "1 / -1", minHeight: 420 }} /></div>
        ) : !video ? (
          <div className="bugsy-empty-state"><h2>This video is unavailable</h2><p>It may have been removed or you may not have permission to view it.</p></div>
        ) : (
          <div className="watch-layout">
            <section>
              <VideoPlayer video={video} />
              <h1 className="watch-title">{video.title}</h1>
              <p className="watch-substats">{video.views || 0} views · {formatDate(video.createdAt)}</p>
              <div className="watch-channel">
                <img className="watch-channel__avatar" src={ownerAvatar} alt="" />
                <div className="watch-channel__copy">
                  <p className="watch-channel__name">{owner.fullName || "Bugsy creator"}</p>
                  <p className="watch-channel__subs">Community channel</p>
                </div>
                <button type="button" className="bugsy-btn bugsy-btn--primary bugsy-btn--compact">Subscribe</button>
                <div className="watch-actions">
                  <button type="button" className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact"><ThumbsUp size={16} /> Like</button>
                  <button type="button" className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact"><Share2 size={16} /> Share</button>
                  <button type="button" className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact"><Bookmark size={16} /> Save</button>
                </div>
              </div>
              <details className="watch-description">
                <summary>{video.description?.slice(0, 160) || "No description has been added yet."} <span>Show more</span></summary>
                <p>{video.description || "No description has been added yet."}</p>
              </details>
            </section>
            <aside className="up-next" aria-label="Up next">
              <h2 className="up-next__heading">Up next <button type="button" className="bugsy-btn bugsy-btn--subtle bugsy-btn--compact">Autoplay</button></h2>
              {upNext.length > 0 ? upNext.map((item, index) => <UpNextCard key={item._id || index} video={item} index={index} />) : <p className="bugsy-page-subtitle">More recommendations will appear here.</p>}
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlayerPage;
