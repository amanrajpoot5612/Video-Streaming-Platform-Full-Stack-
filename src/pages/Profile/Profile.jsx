import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'


const Profile = () => {

    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('/users/profile',
                    {
                        withCredentials: true
                    }
                )
                setUser(res)
                setUser(res.data?.data?.user);
                setVideos(res.data?.data?.videos)

                setLoading(false);
            } catch (error) {
                setUser(null);
                setVideos(null);
                // call special error component
            }
            finally {
                setLoading(false);
            }
        }
        fetchUser();

    }, [])

    if (loading) {
        return <div className="text-center mt-10 text-gray-500">Loading user profile...</div>;
    }

    if (!user) {
        return <div className="text-center mt-10 text-gray-500">
            <h2 className='mb-2 '>Register or Login before accessing profile</h2>
            <Link to={'/register'}>
                <span className='p-2 m-2 cursor-pointer rounded-sm hover:bg-red-400 hover:text-amber-50 bg-red-300'>Register</span>
            </Link>
            <span>/</span>
            <Link to={'/login'}>
                <span className='p-2 m-2 rounded-sm hover:bg-red-400 hover:text-amber-50 bg-red-300'>Login</span>
            </Link>
        </div>
    }


    return (
        <div className="max-w-6xl mx-auto mt-6">
            {/* Cover Image */}
            <div className="relative w-full h-48 sm:h-64 bg-gray-300 rounded-xl overflow-hidden">
                <img
                    src={user.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                {/* Avatar */}
                <div className="absolute -bottom-12 left-6">
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                </div>
            </div>

            {/* User Info */}
            <div className="mt-16 px-6">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            {/* Videos Section */}
            <div className="mt-10 px-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Uploaded Videos</h3>

                {videos && videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div
                                key={video._id}
                                className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
                            >
                                <div className="relative w-full h-48 bg-black group">
                                    <img
                                        src={
                                            video.thumbnail && !video.thumbnail.startsWith("file://")
                                                ? video.thumbnail
                                                : user.avatar
                                        }
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-300"
                                    />
                                    <button
                                        onClick={() => window.open(video.videoFile, "_blank")}
                                        className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        ▶
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-white font-semibold truncate">{video.title}</h4>
                                    <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No videos uploaded yet.</p>
                )}
            </div>

        </div>
    )
}

export default Profile
