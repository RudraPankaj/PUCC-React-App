import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="bg-[var(--color-bg-secondary)] pt-10 pb-10 px-5">
        {/* Main wrapper */}
        <div className="flex flex-col gap-15 md:flex-row md:gap-10 md:justify-evenly">
          
          {/* Links Section */}
          <div className="grid grid-cols-2 gap-10 md:gap-20 text-gray-300 dark:text-[var(--color-text-secondary)]">
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
          <div className="flex flex-col text-gray-300 dark:text-[var(--color-text-secondary)] items-center md:items-start">
            <span className="text-white dark:text-[var(--color-text-primary)] mb-2">Social Links:</span>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"                 className="md:text-xl lg:text-2xl hover:text-white dark:hover:text-[var(--color-text-primary)] focus:outline-none focus:ring">
                <i className="bi bi-facebook" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="md:text-xl lg:text-2xl hover:text-white dark:hover:text-[var(--color-text-primary)] focus:outline-none focus:ring">
                <i className="bi bi-linkedin" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="Github"
                className="md:text-xl lg:text-2xl hover:text-white dark:hover:text-[var(--color-text-primary)] focus:outline-none focus:ring">
                <i className="bi bi-github" />
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="md:text-xl lg:text-2xl hover:text-white dark:hover:text-[var(--color-text-primary)] focus:outline-none focus:ring">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"
                className="md:text-xl lg:text-2xl hover:text-white dark:hover:text-[var(--color-text-primary)] focus:outline-none focus:ring">
                <i className="bi bi-pinterest" />
              </a>
            </div>

            {/* Newsletter */}
            <span className="text-white dark:text-[var(--color-text-primary)] mt-10">Get Exclusive Updates:</span>
            <form className="flex flex-col sm:flex-row mt-3 w-full max-w-xs md:max-w-sm">
              <input
                className="flex-1 min-w-30 bg-[var(--color-bg-primary)] p-2 text-gray-800 dark:text-[var(--color-text-primary)] focus:outline-none"
                type="text"
                name="subscription-mail"
                id="subscription-mail"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-[var(--color-primary)] px-4 py-2 text-white dark:text-[var(--color-text-primary)] hover:bg-[var(--color-secondary)] cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-gray-300 dark:text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] pt-2 pb-2 text-center border-t border-[var(--color-border)]">
        <span>Copyright © 2025. All rights reserved.</span><br />
        <span><small>Made with ❤️ by Pankaj Rudra</small></span>
      </div>
    </>
  )
}

export default React.memo(Footer)