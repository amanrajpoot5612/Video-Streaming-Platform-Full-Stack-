import VideoCard from "./VideoCard";
const Hero = () => {
  // Sample video data
  const videos = [
    {
      title: "Master React in 30 Minutes",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      duration: "30:15",
      views: "2.1M",
      rating: 4.9,
      category: "React"
    },
    {
      title: "JavaScript ES6 Features Explained",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
      duration: "18:42",
      views: "1.8M",
      rating: 4.7,
      category: "JavaScript"
    },
    {
      title: "CSS Grid vs Flexbox",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
      duration: "12:30",
      views: "956K",
      rating: 4.6,
      category: "CSS"
    },
    {
      title: "Node.js Backend Development",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
      duration: "45:22",
      views: "3.2M",
      rating: 4.8,
      category: "Node.js"
    },
    {
      title: "Python Data Science Basics",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop",
      duration: "25:18",
      views: "1.5M",
      rating: 4.5,
      category: "Python"
    },
    {
      title: "Mobile App Design Principles",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
      duration: "20:45",
      views: "1.1M",
      rating: 4.7,
      category: "Design"
    },
    {
      title: "Docker for Beginners",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=225&fit=crop",
      duration: "35:10",
      views: "2.8M",
      rating: 4.9,
      category: "DevOps"
    },
    {
      title: "Git & GitHub Complete Guide",
      thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop",
      duration: "28:33",
      views: "2.3M",
      rating: 4.8,
      category: "Git"
    },
    {
      title: "TypeScript Full Course",
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop",
      duration: "42:15",
      views: "1.9M",
      rating: 4.6,
      category: "TypeScript"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover Amazing Content
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our curated collection of high-quality videos and tutorials
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1M+</div>
              <div className="text-gray-400">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">50K+</div>
              <div className="text-gray-400">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">10M+</div>
              <div className="text-gray-400">Views</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Grid Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Videos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hand-picked content from top creators in the community
          </p>
        </div>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              rating={video.rating}
              category={video.category}
            />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Load More Videos
          </button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="fixed bottom-20 right-10 w-16 h-16 bg-pink-500 rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
      <div className="fixed top-1/2 right-20 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-bounce animation-delay-2000"></div>
    </div>
  );
};

export default Hero;