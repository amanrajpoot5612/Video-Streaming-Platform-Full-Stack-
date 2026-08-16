import { Link } from "react-router-dom";
import thumbnailFallback from "../assets/thumbnail.jpeg";
import { optimizeCloudinaryUrl } from "../utils/Cloudinary";

const LikedVideoCard = ({ video }) => {
  const owner = video?.owner || {};
  const source = video?.thumbnail || thumbnailFallback;
  const thumbnail = typeof source === "string" ? optimizeCloudinaryUrl(source, 560, 315) : thumbnailFallback;
  const title = video?.title || "Untitled video";

  return (
    <article className="media-row">
      <Link to={video?._id ? `/watch/${video._id}` : "/"} className="media-row__thumbnail"><img src={thumbnail} alt="" /><span className="video-card__duration">{video?.duration ? `${video.duration} min` : "12:42"}</span></Link>
      <div className="media-row__copy">
        <h2 className="media-row__title">{title}</h2>
        <p className="media-row__meta">{owner.fullName || video?.channelName || "Bugsy creator"} · {video?.views || 0} views</p>
        <p className="media-row__description">{video?.description || "No description has been added to this video yet."}</p>
      </div>
    </article>
  );
};

export default LikedVideoCard;
