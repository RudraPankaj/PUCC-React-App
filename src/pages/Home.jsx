import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/homeComponents/HeroSection'
import AboutSection from '../components/homeComponents/AboutSection'
import WingsSection from '../components/homeComponents/WingsSection'
import ConstitutionSection from '../components/homeComponents/ConstitutionSection'
import CommitteeSection from '../components/homeComponents/CommitteeSection'
import CTASection from '../components/homeComponents/CTASection'

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WingsSection />
      <ConstitutionSection />
      <CommitteeSection />
      <CTASection />
      <Footer />
    </>
  )
}

export default Home