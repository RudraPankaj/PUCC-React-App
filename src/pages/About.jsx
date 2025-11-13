import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useTheme } from '../hooks/useTheme.jsx';

// Mock data for the 9 committee images.
const committeeImages = [
  { url: '/images/committee/pucc1.jpg', caption: 'Executive Committee Spring 2025', id: 1 },
  { url: '/images/committee/pucc2.jpg', caption: 'Executive Committee Spring 2025', id: 2 },
  { url: '/images/committee/pucc3.jpg', caption: 'Executive Committee Spring 2025', id: 3 },
  { url: '/images/committee/pucc4.jpg', caption: 'Sub-Executive Committee Spring 2025', id: 4 },
  { url: '/images/committee/pucc5.jpg', caption: 'Sub-Executive Committee Spring 2025', id: 5 },
  { url: '/images/committee/pucc6.jpg', caption: 'Sub-Executive Committee Spring 2025', id: 6 },
  { url: '/images/committee/pucc7.jpg', caption: 'Sub-Executive Committee Spring 2025', id: 7 },
  { url: '/images/committee/pucc8.jpg', caption: 'Sub-Executive Committee Spring 2025', id: 8 },
  { url: '/images/committee/pucc9.jpg', caption: 'Sub-Executive Committee Spring 2025', id: 9 },
];

const About = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % committeeImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + committeeImages.length) % committeeImages.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
        
        {/* Hero Section */}
        <div className={`text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r rounded-b-3xl shadow-2xl ${theme === 'dark' ? 'from-gray-900 to-blue-900' : 'from-[#00aae4] to-[#0067b6]'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
              PUCC: Shaping Tomorrow's Tech Leaders
            </h1>
            <p className="text-xl sm:text-2xl opacity-90 font-light">
              প্রিমিয়ার ইউনিভার্সিটি কম্পিউটার ক্লাব, কর্তৃপক্ষ কর্তৃক অনুমোদিত সংবিধান দ্বারা পরিচালিত।
            </p>
          </div>
        </div>

        {/* Club History & Vision */}
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Our Story & Vision</h2>
          <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
            প্রিমিয়ার ইউনিভার্সিটি কম্পিউটার ক্লাব প্রতিষ্ঠিত হয়েছিল একদল উদ্যমী শিক্ষার্থীর হাতে,
            যাদের উদ্দেশ্য ছিল প্রযুক্তি চর্চা, গবেষণা ও প্রতিযোগিতায় অগ্রসর হওয়া। 
            ক্লাবটি শুধুমাত্র প্রতিযোগিতামূলক প্রোগ্রামিং নয়, বরং সফটওয়্যার ইঞ্জিনিয়ারিং,
            নেটওয়ার্কিং এবং কৃত্রিম বুদ্ধিমত্তার ক্ষেত্রেও নেতৃত্ব দিচ্ছে।
          </p>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
            আমাদের ভিশন হলো আগামী দিনের প্রযুক্তি নেতাদের তৈরি করা, যারা জাতীয় ও আন্তর্জাতিক মঞ্চে
            বিশ্ববিদ্যালয়ের প্রতিনিধিত্ব করবে।
          </p>
        </section>

        {/* Leadership Carousel */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 pt-8 ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}>
            Meet the Driving Force: Committee Distribution
          </h2>
          <div className="relative w-full max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden group">
            <div className="h-96 sm:h-[550px] w-full transition-all duration-500 ease-in-out">
              <img
                src={committeeImages[currentIndex].url}
                alt={committeeImages[currentIndex].caption}
                className="w-full h-full object-contain transition-opacity duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white text-center transition-all duration-500">
                <p className="font-semibold text-xl sm:text-2xl">{committeeImages[currentIndex].caption}</p>
                <p className="text-sm opacity-80 mt-1">
                  Photo {currentIndex + 1} of {committeeImages.length}
                </p>
              </div>
            </div>
            <button onClick={goToPrev} className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none focus:ring-4 z-10 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-[#00aae4]'}`}>
              <i className="bi bi-chevron-left text-3xl"></i> 
            </button>
            <button onClick={goToNext} className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none focus:ring-4 z-10 ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-[#00aae4]'}`}>
              <i className="bi bi-chevron-right text-3xl"></i>
            </button>
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {committeeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 shadow ${
                    index === currentIndex ? `${theme === 'dark' ? 'bg-blue-500' : 'bg-[#00aae4]'} scale-110` : 'bg-gray-200 opacity-60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Club Wings */}
        <section className="mt-16 text-center px-6">
          <h3 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Our Four Pillars of Technology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <WingCard 
              icon={<i className={`bi bi-trophy-fill text-4xl ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}></i>}
              title="Competitive Programming"
              description="Problem solving, algorithmic thinking, and participation in national and international contests."
            />
            <WingCard 
              icon={<i className={`bi bi-code-slash text-4xl ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}></i>}
              title="Software Engineering"
              description="Focuses on full-stack development, modern software architecture, and real-world project development."
            />
            <WingCard 
              icon={<i className={`bi bi-cpu-fill text-4xl ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}></i>}
              title="Deep Neural Research"
              description="Exploring Artificial Intelligence, Machine Learning, and conducting data science research projects."
            />
            <WingCard 
              icon={<i className={`bi bi-server text-4xl ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}></i>}
              title="Linux Based Networking"
              description="System administration, network security, server management, and open-source contributions."
            />
          </div>
        </section>

        {/* Milestones & Achievements */}
        <section className={`py-20 mt-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className={`text-3xl font-bold mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Our Achievements</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <MilestoneCard icon="bi bi-award-fill" title="ICPC Participation" desc="PUCC teams have represented the university in national & international ICPC contests." />
              <MilestoneCard icon="bi bi-people-fill" title="Workshops & Seminars" desc="Over 50+ workshops on AI, Networking, and Software Engineering conducted." />
              <MilestoneCard icon="bi bi-lightbulb-fill" title="Research Contributions" desc="Published multiple papers and research projects in AI & Data Science." />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 text-center">
          <h3 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Join PUCC Today!</h3>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Become part of a vibrant tech community, learn, build, and compete with the best.
          </p>
          <Link
            to="/register"
            className={`font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-[#00aae4] hover:bg-[#0067b6] text-white'}`}
          >
            Register as a Member
          </Link>
        </section>

      </div>
      <Footer />
    </>
  );
};

// Reusable Wing Card
const WingCard = ({ icon, title, description }) => {
    const { theme } = useTheme();
    return (
        <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 transform hover:scale-[1.02] ${theme === 'dark' ? 'bg-gray-800 border-blue-500' : 'bg-white border-[#00aae4]'}`}>
            <div className="flex items-center justify-center mb-4">{icon}</div>
            <h4 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        </div>
    )
};

// Reusable Milestone Card
const MilestoneCard = ({ icon, title, desc }) => {
    const { theme } = useTheme();
    return (
        <div className={`rounded-xl shadow-lg p-8 hover:shadow-xl transition-all ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
            <i className={`${icon} text-5xl mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-[#0067b6]'}`}></i>
            <h4 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{title}</h4>
            <p className={`text-gray-600 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
        </div>
    )
};
export default About;

