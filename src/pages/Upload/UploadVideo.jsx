import {
    VideoIcon,
    ImageIcon,
    FileTextIcon,
    ClockIcon,
    UploadIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../api/axios";
import Navbar from "../../component/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";


export default function UploadVideo() {

    const {user} = useAuth();

    const [formData, setFormData] = useState({
        video: null,
        thumbnail: null,
        title: "",
        description: "",
        duration: "",
    });

    const [preview, setPreview] = useState({
        thumbnail: null,
        videoURL: null,
    });

    const [dragging, setDragging] = useState({ video: false, thumbnail: false });
    const [toast, setToast] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (formData.video && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                const durationInSeconds = videoRef.current.duration;
                const durationInMinutes = Math.ceil(durationInSeconds / 60);
                setFormData((prev) => ({ ...prev, duration: durationInMinutes }));
            };
        }
    }, [formData.video]);

    const handleFileChange = (file, name) => {
        setFormData((prev) => ({ ...prev, [name]: file }));

        if (name === "video") {
            const url = URL.createObjectURL(file);
            setPreview((prev) => ({ ...prev, videoURL: url }));
            
        }

        if (name === "thumbnail") {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview((prev) => ({ ...prev, thumbnail: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e, type) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging((prev) => ({ ...prev, [type]: true }));
    };

    const handleDrop = (e, type) => {
        e.preventDefault();
        setDragging((prev) => ({ ...prev, [type]: false }));
        const file = e.dataTransfer.files[0];
        handleFileChange(file, type);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            handleFileChange(files[0], name);
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const { video, thumbnail, title, description, duration } = formData;
    if (!video || !thumbnail || !title || !description) {
        setToast({ message: "Please fill all fields and upload files.", type: "error" });
        return;
    }
    // g form data:", { video, thumbnail, title, description, duration });
    
  const data = new FormData();
  data.append("videoFile", video || null);
  data.append("thumbnail", thumbnail || null);
  data.append("title", title || "");
  data.append("description", description || "");
  data.append("duration", duration || "");

  try {
    const res = await axiosInstance.post("/videos/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    if (res.status !== 201) {
        throw new Error("Upload failed");
    }
    setToast({ message: "Upload successful!", type: "success" });
    // sponse:", res.data);
    setTimeout(() => {
        setToast({ message: "wait for few seconds", type: "wait" }); 
    } , 3000);
    setTimeout(() => {
        setToast(null);
    } , 3000)
    setFormData({ video: null, thumbnail: null, title: '', description: '', duration: '' });
    setPreview({ thumbnail: null, videoURL: null });
  } catch (err) {
    console.error("Upload error:", err);
    const message =
      err?.response?.data?.message || "Upload failed. Try again.";
    setToast({ message, type: "error" });
    setTimeout(() => {
        setToast(null);
    } , 3000)
  }
};

    // if(!user){
    //     return <div className="text-center mt-10 text-gray-500">
    //         <h2 className='mb-2 '>Register or Login before uploadng video</h2>
    //         <Link to={'/register'}>
    //             <span className='p-2 m-2 cursor-pointer rounded-sm hover:bg-red-400 hover:text-amber-50 bg-red-300'>Register</span>
    //         </Link>
    //         <span>/</span>
    //         <Link to={'/login'}>
    //             <span className='p-2 m-2 rounded-sm hover:bg-red-400 hover:text-amber-50 bg-red-300'>Login</span>
    //         </Link>
    //     </div>
    // }


    return (
        <>
        <nav className="text-amber-50">
            <Navbar/>
        </nav>
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
            {!user?
                <div className="text-center mt-10 text-gray-700 font-[500]">
            <h2 className='mb-2 '>Register or Login before uploadng video</h2>
            <Link to={'/register'}>
                <span className='p-2 m-2 cursor-pointer rounded-sm hover:bg-red-400 hover:text-amber-50 bg-red-300'>Register</span>
            </Link>
            <span>/</span>
            <Link to={'/login'}>
                <span className='p-2 m-2 rounded-sm hover:bg-red-400 hover:text-amber-50 bg-red-300'>Login</span>
            </Link>
        </div>
            :


            
            <div className="w-full max-w-6xl bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl p-8">
                
                <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                    <UploadIcon className="w-6 h-6 text-white" /> Upload New Video
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Section - Drag & Drop */}
                    <div className="space-y-6">
                        {/* Video Dropzone */}
                        <div
                            onDragOver={(e) => handleDrag(e, "video")}
                            onDrop={(e) => handleDrop(e, "video")}
                            className={`h-64 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-300 ${dragging.video ? "border-blue-400 bg-neutral-700" : "border-neutral-600"}`}
                        >
                            <VideoIcon className="w-10 h-10 text-white" />
                            <p className="text-white mt-2">Drag & Drop Video or Click to Choose</p>
                            <input
                                type="file"
                                accept="video/*"
                                name="video"
                                onChange={handleInputChange}
                                className="hidden"
                                id="video-upload"
                            />
                            <label htmlFor="video-upload" className="mt-2 px-4 py-2 bg-blue-600 rounded text-white cursor-pointer">Choose Video</label>
                        </div>
                        {preview.videoURL && (
                            <video
                                src={preview.videoURL}
                                controls
                                // ref={videoRef}
                                className="mt-2 w-full rounded border border-neutral-600"
                            />
                        )}

                        {/* Thumbnail Dropzone */}
                        <div
                            onDragOver={(e) => handleDrag(e, "thumbnail")}
                            onDrop={(e) => handleDrop(e, "thumbnail")}
                            className={`h-64 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-300 ${dragging.thumbnail ? "border-green-400 bg-neutral-700" : "border-neutral-600"}`}
                        >
                            <ImageIcon className="w-10 h-10 text-white" />
                            <p className="text-white mt-2">Drag & Drop Thumbnail or Click to Choose</p>
                            <input
                                type="file"
                                accept="image/*"
                                name="thumbnail"
                                onChange={handleInputChange}
                                className="hidden"
                                id="thumbnail-upload"
                            />
                            <label htmlFor="thumbnail-upload" className="mt-2 px-4 py-2 bg-green-600 rounded text-white cursor-pointer">Choose Thumbnail</label>
                        </div>
                        {preview.thumbnail && (
                            <img
                                src={preview.thumbnail}
                                alt="Thumbnail Preview"
                                className="mt-2 w-full h-40 rounded-lg object-cover border border-neutral-600"
                            />
                        )}
                    </div>

                    {/* Right Section - Details */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter a title"
                                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                placeholder="Describe your video"
                                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 resize-none focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Duration (auto)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                readOnly
                                className="w-full px-4 py-3 bg-neutral-600 border border-neutral-600 rounded-lg text-white placeholder-neutral-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                        >
                            Upload Video
                        </button>
                    </div>
                </form>

                {/* Toast */}
                {toast && (
                    <div
                        className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-md text-white font-medium transition-all duration-500 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
                    >
                        {toast.message}
                    </div>
                )}
            </div>
}
        </div>
        </>
    );
}
