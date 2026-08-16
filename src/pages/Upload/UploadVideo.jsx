import { useEffect, useRef, useState } from "react";
import { Image, Upload, Video } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Navbar from "../../component/Navbar";
import { useAuth } from "../../context/auth-context";

const UploadVideo = () => {
  const { user } = useAuth();
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({ video: null, thumbnail: null, title: "", description: "", duration: "" });
  const [preview, setPreview] = useState({ videoUrl: null, thumbnail: null });
  const [dragging, setDragging] = useState({ video: false, thumbnail: false });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => () => {
    if (preview.videoUrl) URL.revokeObjectURL(preview.videoUrl);
  }, [preview.videoUrl]);

  const setFile = (file, type) => {
    if (!file) return;
    setFormData((data) => ({ ...data, [type]: file }));
    if (type === "video") {
      setPreview((data) => ({ ...data, videoUrl: URL.createObjectURL(file) }));
    } else {
      const reader = new FileReader();
      reader.onload = () => setPreview((data) => ({ ...data, thumbnail: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event, type) => {
    event.preventDefault();
    setDragging((state) => ({ ...state, [type]: false }));
    setFile(event.dataTransfer.files[0], type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { video, thumbnail, title, description, duration } = formData;
    if (!video || !thumbnail || !title.trim() || !description.trim()) {
      setToast({ type: "error", message: "Add a video, thumbnail, title, and description before publishing." });
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append("videoFile", video);
    data.append("thumbnail", thumbnail);
    data.append("title", title.trim());
    data.append("description", description.trim());
    data.append("duration", duration || "");

    try {
      await axiosInstance.post("/videos/upload", data, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
      setToast({ type: "success", message: "Video uploaded successfully." });
      setFormData({ video: null, thumbnail: null, title: "", description: "", duration: "" });
      setPreview({ videoUrl: null, thumbnail: null });
    } catch (error) {
      setToast({ type: "error", message: error?.response?.data?.message || "Upload failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="standalone-app">
      <Navbar />
      <main className="standalone-page">
        {!user ? (
          <section className="bugsy-empty-state">
            <h2>Sign in before uploading</h2>
            <p>Your videos, thumbnails, and publishing details are stored securely in your creator account.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Link className="bugsy-btn bugsy-btn--primary" to="/login">Sign in</Link>
              <Link className="bugsy-btn bugsy-btn--ghost" to="/register">Create account</Link>
            </div>
          </section>
        ) : (
          <section className="upload-page" aria-labelledby="upload-title">
            <div className="upload-page__head">
              <div><span className="bugsy-eyebrow">Creator studio</span><h1 id="upload-title" className="bugsy-page-title">Upload a video</h1><p className="bugsy-page-subtitle">Add your media and review the details before publishing.</p></div>
              <span className="bugsy-status">Draft</span>
            </div>
            <form className="upload-layout" onSubmit={handleSubmit}>
              <section className="upload-panel">
                <h2 className="upload-panel__title">Media</h2>
                <div className="upload-media-stack">
                  <div className={`upload-dropzone${dragging.video ? " is-dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging((state) => ({ ...state, video: true })); }} onDragLeave={() => setDragging((state) => ({ ...state, video: false }))} onDrop={(event) => handleDrop(event, "video")}>
                    <Video size={30} aria-hidden="true" />
                    <p className="upload-dropzone__title">Drop your video here</p>
                    <p className="upload-dropzone__help">MP4, WebM, or MOV. The duration is read automatically once selected.</p>
                    <input id="video-upload" type="file" name="video" accept="video/*" className="sr-only" onChange={(event) => setFile(event.target.files[0], "video")} />
                    <label className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" htmlFor="video-upload">Choose video</label>
                  </div>
                  {preview.videoUrl && <div className="upload-preview"><video ref={videoRef} src={preview.videoUrl} controls onLoadedMetadata={() => setFormData((data) => ({ ...data, duration: Math.ceil(videoRef.current?.duration || 0) }))} /></div>}
                  <div className="upload-thumbnail">
                    <div className="upload-thumbnail__preview">{preview.thumbnail ? <img src={preview.thumbnail} alt="Selected thumbnail preview" /> : <Image size={28} />}</div>
                    <div className={`upload-dropzone${dragging.thumbnail ? " is-dragging" : ""}`} style={{ minHeight: 124, padding: 12 }} onDragOver={(event) => { event.preventDefault(); setDragging((state) => ({ ...state, thumbnail: true })); }} onDragLeave={() => setDragging((state) => ({ ...state, thumbnail: false }))} onDrop={(event) => handleDrop(event, "thumbnail")}>
                      <p className="upload-dropzone__title">Thumbnail</p><p className="upload-dropzone__help">Use a clear 16:9 image.</p>
                      <input id="thumbnail-upload" type="file" name="thumbnail" accept="image/*" className="sr-only" onChange={(event) => setFile(event.target.files[0], "thumbnail")} />
                      <label className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" htmlFor="thumbnail-upload">Choose image</label>
                    </div>
                  </div>
                </div>
              </section>
              <section className="upload-panel"><h2 className="upload-panel__title">Details</h2><div className="upload-form">
                <div className="bugsy-field"><label htmlFor="video-title">Title</label><input id="video-title" value={formData.title} maxLength="120" placeholder="Give your video a clear, specific title" onChange={(event) => setFormData((data) => ({ ...data, title: event.target.value }))} /><p className="bugsy-field__hint">{formData.title.length}/120 characters</p></div>
                <div className="bugsy-field"><label htmlFor="video-description">Description</label><textarea id="video-description" value={formData.description} maxLength="5000" placeholder="Tell viewers what they can expect" onChange={(event) => setFormData((data) => ({ ...data, description: event.target.value }))} /><p className="bugsy-field__hint">{formData.description.length}/5000 characters</p></div>
                <div className="upload-form__row"><div className="bugsy-field"><label htmlFor="video-visibility">Visibility</label><select id="video-visibility" defaultValue="public"><option value="public">Public</option><option value="unlisted">Unlisted</option><option value="private">Private</option></select></div><div className="bugsy-field"><label htmlFor="video-duration">Duration</label><input id="video-duration" value={formData.duration ? `${formData.duration} min` : "Auto"} readOnly /></div></div>
                <div className="upload-form__footer"><button type="button" className="bugsy-btn bugsy-btn--ghost">Save draft</button><button type="submit" className="bugsy-btn bugsy-btn--primary" disabled={isSubmitting}><Upload size={17} /> {isSubmitting ? "Publishing…" : "Publish video"}</button></div>
              </div></section>
            </form>
          </section>
        )}
      </main>
      {toast && <div className={`bugsy-toast bugsy-toast--${toast.type}`} role="status">{toast.message}</div>}
    </div>
  );
};

export default UploadVideo;
