import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

function Footer() {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Rainbow border for light theme */}
      {theme === 'light' && (
        <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />
      )}

      {/* Main Footer Content */}
      <div className={`${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-800'} pt-10 pb-10 px-5`}>
        <div className="flex flex-col gap-12 md:flex-row md:gap-10 md:justify-evenly">
          
          {/* Links Section */}
          <div className={`grid grid-cols-2 gap-10 md:gap-20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="hover:text-white">About Us</Link>
              <a href="#contact" className="hover:text-white">Contact</a>
              <a href="#policy" className="hover:text-white">Privacy Policy</a>
              <a href="#tos" className="hover:text-white">Terms of Service</a>
              <a href="#careers" className="hover:text-white">Careers</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#blog" className="hover:text-white">Blog</a>
              <a href="#community" className="hover:text-white">Community</a>
              <a href="#help" className="hover:text-white">Help Center</a>
              <a href="#support" className="hover:text-white">Support</a>
              <a href="#media-kit" className="hover:text-white">Media Kit</a>
            </div>
          </div>

          {/* Social + Subscription Section */}
          <div className="flex flex-col items-center md:items-start">
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-200'} mb-2`}>Social Links:</span>
            <div className={`flex flex-row gap-4 justify-center md:justify-start ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="md:text-xl lg:text-2xl hover:text-white focus:outline-none focus:ring">
                <i className="bi bi-facebook" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="md:text-xl lg:text-2xl hover:text-white focus:outline-none focus:ring">
                <i className="bi bi-linkedin" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="Github"
                 className="md:text-xl lg:text-2xl hover:text-white focus:outline-none focus:ring">
                <i className="bi bi-github" />
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"
                 className="md:text-xl lg:text-2xl hover:text-white focus:outline-none focus:ring">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"
                 className="md:text-xl lg:text-2xl hover:text-white focus:outline-none focus:ring">
                <i className="bi bi-pinterest" />
              </a>
            </div>

            {/* Newsletter */}
            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-200'} mt-10`}>Get Exclusive Updates:</span>
            <form className="flex flex-col sm:flex-row mt-3 w-full max-w-xs md:max-w-sm">
              <input
                className={`flex-1 min-w-30 p-2 focus:outline-none rounded-l-md border ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-700 text-gray-200 border-gray-600'}`}
                type="text"
                name="subscription-mail"
                id="subscription-mail"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className={`px-4 py-2 text-white font-semibold rounded-r-md cursor-pointer transition-colors ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0067b6] hover:bg-[#005a9c]'}`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`pt-2 pb-2 text-center border-t ${theme === 'dark' ? 'bg-black text-gray-500 border-gray-800' : 'bg-gray-900 text-gray-400 border-gray-700'}`}>
        <span>Copyright © 2025. All rights reserved.</span><br />
        <span><small>Made with ❤️ by Pankaj Rudra</small></span>
      </div>
    </>
  );
}

export default React.memo(Footer);
