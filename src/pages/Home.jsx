import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/homeComponents/HeroSection.jsx'
import AboutSection from '../components/homeComponents/AboutSection.jsx'
import WingsSection from '../components/homeComponents/WingsSection.jsx'
import ConstitutionSection from '../components/homeComponents/ConstitutionSection.jsx'
import CommitteeSection from '../components/homeComponents/CommitteeSection.jsx'
import CTASection from '../components/homeComponents/CTASection.jsx'
import { useTheme } from '../hooks/useTheme.jsx'

function Home() {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WingsSection />
      <ConstitutionSection />
      <CommitteeSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home