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
const connectOptions = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Drop me a line for collaborations, questions, or just to say hello!',
      link: 'mailto:amanrajpoot5612@gmail.com',
      linkText: 'amanrajpoot5612@gmail.com',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Connect with me professionally and see what I\'m working on.',
      link: 'https://linkedin.com/in/amanrajpoot5612',
      linkText: 'View Profile',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      description: 'Follow me for updates, thoughts, and interesting finds.',
      link: 'https://twitter.com/amannnnrajput',
      linkText: '@amannnnrajput',
      bgColor: 'bg-sky-500',
      hoverColor: 'hover:bg-sky-600'
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Check out my code, contribute to projects, or start a discussion.',
      link: 'https://github.com/amanrajpoot5612',
      linkText: 'View Repositories',
      bgColor: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900'
    },
    {
      icon: Globe,
      title: 'Portfolio',
      description: 'Explore my work, projects, and learn more about what I do.',
      link: 'https://amanrajpoot.vercel.app/',
      linkText: 'Visit Website',
      bgColor: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'For quick messages or urgent matters, reach me on WhatsApp.',
      link: 'https://wa.me/+919355505920',
      linkText: 'Send Message',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ];

export default connectOptions;