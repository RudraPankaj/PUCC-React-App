import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="bg-[#00001f] pt-10 pb-10 px-5">
        {/* Main wrapper */}
        <div className="flex flex-col gap-15 md:flex-row md:gap-10 md:justify-evenly">
          
          {/* Links Section */}
          <div className="grid grid-cols-2 gap-10 md:gap-20 text-[#9e9e9e]">
            <div className="flex flex-col gap-2 footer-links">
              <span><Link to="/about">About Us</Link></span>
              <span><a href="#contact">Contact</a></span>
              <span><a href="#policy">Privacy Policy</a></span>
              <span><a href="#tos">Terms of Service</a></span>
              <span><a href="#careers">Careers</a></span>
            </div>

            <div className="flex flex-col gap-2 footer-links">
              <span><a href="#blog">Blog</a></span>
              <span><a href="#community">Community</a></span>
              <span><a href="#help">Help Center</a></span>
              <span><a href="#support">Support</a></span>
              <span><a href="#media-kit">Media Kit</a></span>
            </div>
          </div>

          {/* Social + Subscription */}
          <div className="flex flex-col text-[#9e9e9e] items-center md:items-start">
            <span className="text-white mb-2">Social Links:</span>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
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
            <span className="text-white mt-10">Get Exclusive Updates:</span>
            <form className="flex flex-col sm:flex-row mt-3 w-full max-w-xs md:max-w-sm">
              <input
                className="flex-1 min-w-30 bg-[#aeaeae] p-2 text-black focus:outline-none"
                type="text"
                name="subscription-mail"
                id="subscription-mail"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-[#0000e9] px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-[#a3a3a3] bg-[#00001f] pt-2 pb-2 text-center border-t border-gray-800">
        <span>Copyright © 2025. All rights reserved.</span><br />
        <span><small>Made with ❤️ by Pankaj Rudra</small></span>
      </div>
    </>
  )
}

export default React.memo(Footer)