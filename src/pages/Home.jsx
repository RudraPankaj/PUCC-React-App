import React from 'react'
import Navbar from '/src/components/Navbar'
import Footer from '/src/components/Footer'
import HeroSection from '/src/components/homeComponents/HeroSection'
import AboutSection from '/src/components/homeComponents/AboutSection'
import WingsSection from '/src/components/homeComponents/WingsSection'
import ConstitutionSection from '/src/components/homeComponents/ConstitutionSection'
import CommitteeSection from '/src/components/homeComponents/CommitteeSection'
import CTASection from '/src/components/homeComponents/CTASection'

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