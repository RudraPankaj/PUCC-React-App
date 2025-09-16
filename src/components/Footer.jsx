import React from 'react'

function Footer() {
  return (
    <>
      <div className='flex flex-row bg-[#00001f] pt-10 pb-10 justify-evenly'>

        <div className='flex flex-col text-[#9e9e9e] gap-2 footer-links'>
          
          <span><a href="#about-us">About Us</a></span>
          <span><a href="#contact">Contact</a></span>
          <span><a href="#policy">Privacy Policy</a></span>
          <span><a href="#tos">Terms of Service</a></span>
          <span><a href="#careers">Careers</a></span>

        </div>

        <div className='flex flex-col text-[#9e9e9e] gap-2 footer-links'>

          <span><a href="#blog">Blog</a></span>
          <span><a href="#community">Community</a></span>
          <span><a href="#help">Help Center</a></span>
          <span><a href="#support">Support</a></span>
          <span><a href="#media-kit">Media Kit</a></span>

        </div>

        <div className='flex flex-col text-[#9e9e9e]'>

          <span className='text-white'>Socia Links:</span>

          <span className='flex flex-row gap-3'>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="mt-3 md:text-xl lg:text-2xl hover:text-white hover:cursor-pointer focus:outline-none focus:ring"
            >
              <i className="bi bi-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-3 md:text-xl lg:text-2xl hover:text-white hover:cursor-pointer focus:outline-none focus:ring"
            >
              <i className="bi bi-linkedin" aria-hidden="true" />
            </a>
            <a
              href='https://github.com/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Github'
              className='mt-3 md:text-xl lg:text-2xl hover:text-white hover:cursor-pointer focus:outline-none focus:ring'
            >
              <i className="bi bi-github" aria-hidden="true" />
            </a>
            <a
              href='https://x.com/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='X'
              className='mt-3 md:text-xl lg:text-2xl hover:text-white hover:cursor-pointer focus:outline-none focus:ring'
            >
              <i className="bi bi-twitter-x" aria-hidden="true" />
            </a>
            <a
              href='https://pinterest.com/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Pinterest'
              className='mt-3 md:text-xl lg:text-2xl hover:text-white hover:cursor-pointer focus:outline-none focus:ring'
            >
              <i className="bi bi-pinterest" aria-hidden="true" />
            </a>
          </span>

          <span className='text-white mt-5'>Get Exclusive Updates:</span>

          <span className='flex flex-row items-center mt-3 mb-4'>
            <span>
                <input 
                  className='w-24 md:w-32 lg:w-60 ml-0 bg-[#aeaeae] p-1 text-black focus:outline-none' 
                  type="text" 
                  name="subscription-mail" 
                  id="subscription-mail" 
                  placeholder='Enter your email'
                />
            </span>
            <span>
                <input 
                  className='bg-[#0000e9] p-1 pl-3 pr-3 text-white cursor-pointer' 
                  type="submit" 
                  value="Subscribe"
                />
            </span>
          </span>

        </div>

      </div>

      <div className='text-[#a3a3a3] bg-[#00001f] pt-2 pb-2 text-center border-t border-gray-800'>
        <span>Copyright © 2025. All rights reserved.</span><br/>
        <span><small>Made with ❤️ by Pankaj Rudra</small></span>
      </div>
    </>
  )
}

export default Footer