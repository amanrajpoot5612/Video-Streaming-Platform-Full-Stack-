import videoData from "../../context/TrendingData";

const Trending = () => {
  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-white text-3xl font-bold mb-6">Trending Now</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {videoData.map((video) => (
          <div
            key={video.id}
            className={`flex flex-col bg-gray-900 rounded-2xl p-2 shadow-lg ${video.width} ${video.height}`}
          >
            <video
              className="rounded-xl w-full h-full object-cover"
              src={video.src}
              controls
            />
            <p className="text-white mt-2 text-sm font-semibold truncate">
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
