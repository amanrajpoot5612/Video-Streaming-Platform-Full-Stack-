const Subscription = () => {
  const subscriptions = [
    { id: 1, name: "TechReviews", subscribers: "2.5M", avatar: "bg-blue-600", isLive: false },
    { id: 2, name: "CookingMaster", subscribers: "1.8M", avatar: "bg-orange-600", isLive: true },
    { id: 3, name: "FitnessGuru", subscribers: "3.2M", avatar: "bg-green-600", isLive: false },
    { id: 4, name: "GameStreamer", subscribers: "4.1M", avatar: "bg-purple-600", isLive: true },
    { id: 5, name: "MusicBeats", subscribers: "2.9M", avatar: "bg-pink-600", isLive: false }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Subscriptions</h2>
      <div className="space-y-3">
        {subscriptions.map(sub => (
          <div key={sub.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700 cursor-pointer">
            <div className={`w-10 h-10 ${sub.avatar} rounded-full flex items-center justify-center relative`}>
              <User className="w-5 h-5 text-white" />
              {sub.isLive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{sub.name}</p>
              <p className="text-gray-300 text-xs">{sub.subscribers} subscribers</p>
            </div>
            {sub.isLive && <span className="text-red-400 text-xs font-bold">LIVE</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
