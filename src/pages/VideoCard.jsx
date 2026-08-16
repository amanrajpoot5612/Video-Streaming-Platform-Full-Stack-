import { ListPlus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import thumbnailFallback from "../assets/thumbnail.jpeg";
import { optimizeCloudinaryUrl } from "../utils/Cloudinary";

const formatDate = (timestamp) => {
  if (!timestamp) return "Recently added";

  const daysAgo = Math.max(0, Math.floor((Date.now() - new Date(timestamp).getTime()) / 86_400_000));
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "1 day ago";
  if (daysAgo < 30) return `${daysAgo} days ago`;
  return new Date(timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const formatViews = (views) => {
  const count = Number(views);
  if (!Number.isFinite(count)) return views || "New";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(".0", "")}K`;
  return count.toString();
};

const VideoCard = ({ video, progress }) => {
  const owner = video?.owner || {};
  const sourceThumbnail = video?.thumbnail || thumbnailFallback;
  const thumbnail = typeof sourceThumbnail === "string" ? optimizeCloudinaryUrl(sourceThumbnail, 640, 360) : thumbnailFallback;
  const avatar = owner.avatar || video?.channelAvatar || thumbnailFallback;
  const title = video?.title || "Untitled video";
  const channel = owner.fullName || video?.channelName || "Bugsy creator";
  const duration = video?.duration ? `${video.duration} min` : "12:42";
  const isLive = Boolean(video?.isLive);

  return (
    <article className="video-card">
      <div className="video-card__thumbnail">
        <Link to={video?._id ? `/watch/${video._id}` : "/"} aria-label={`Watch ${title}`}>
          <img src={thumbnail} alt="" loading="lazy" />
          {isLive ? <span className="video-card__live">• LIVE</span> : <span className="video-card__duration">{duration}</span>}
          {typeof progress === "number" && <span className="video-card__progress"><span style={{ width: `${progress}%` }} /></span>}
        </Link>
        <button type="button" className="video-card__quick-action" aria-label={`Add ${title} to queue`}>
          <ListPlus size={16} />
        </button>
      </div>
      <div className="video-card__meta">
        <img className="video-card__avatar" src={avatar} alt="" loading="lazy" />
        <div className="video-card__copy">
          <h3 className="video-card__title">{title}</h3>
          <p className="video-card__channel">{channel}</p>
          <p className="video-card__stats">{formatViews(video?.views)} views · {formatDate(video?.createdAt)}</p>
        </div>
        <button type="button" className="video-card__more" aria-label={`More options for ${title}`}>
          <MoreHorizontal size={18} />
        </button>
      </div>
    </article>
  );
};

export default VideoCard;
