const History = () => {
  const historyVideos = [
    { id: 1, title: "React Tutorial for Beginners", channel: "CodeMaster", duration: "15:32", thumbnail: "bg-blue-500" },
    { id: 2, title: "CSS Grid Layout Complete Guide", channel: "WebDev Pro", duration: "22:15", thumbnail: "bg-green-500" },
    { id: 3, title: "JavaScript ES6 Features", channel: "JS Ninja", duration: "18:45", thumbnail: "bg-purple-500" },
    { id: 4, title: "Node.js Backend Development", channel: "BackendGuru", duration: "35:20", thumbnail: "bg-red-500" },
    { id: 5, title: "MongoDB Database Tutorial", channel: "DataExpert", duration: "28:10", thumbnail: "bg-yellow-500" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Watch History</h2>
      <div className="space-y-3">
        {historyVideos.map(video => (
          <div key={video.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700 cursor-pointer">
            <div className={`w-16 h-12 ${video.thumbnail} rounded flex items-center justify-center`}>
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium truncate">{video.title}</p>
              <p className="text-gray-300 text-xs">{video.channel} • {video.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History