import { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Twitter, 
  Github, 
  Globe, 
  MessageCircle, 
  Send,
  ArrowRight,
  Heart
} from 'lucide-react';
import connectOptions from '../../context/connectOptions';

const ConnectWithMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect with Me
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            I'd love to hear from you! Reach out through any of these channels or send me your feedback directly.
          </p>
        </div>

        {/* Connect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {connectOptions.map((option, index) => (
            <div
              key={index}
              className="bg-neutral-700 rounded-xl p-6 hover:bg-neutral-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className={`w-12 h-12 ${option.bgColor} ${option.hoverColor} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {option.title}
              </h3>
              
              <p className="text-neutral-300 mb-4 leading-relaxed">
                {option.description}
              </p>
              
              <a
                href={option.link}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {option.linkText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        {/* <div className="bg-neutral-700 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-red-500" />
              Send Feedback
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Have suggestions for improving the app? Found a bug? I'd love to hear your thoughts!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-200 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Bug report, feature request, etc."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-200 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                placeholder="Tell me what's on your mind..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitted 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg'
              } disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : isSubmitted ? (
                <>
                  <Heart className="w-5 h-5" />
                  Sent! Thank you
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Feedback
                </>
              )}
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
}

export default ConnectWithMe;