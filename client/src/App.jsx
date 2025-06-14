import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ClerkProvider, SignedIn } from '@clerk/clerk-react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import MapPreview from './components/MapPreview'
import EventsSection from './components/EventsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import {CreateOrCheckUser} from './pages/CreateOrCheckUser'
import CommunityTags from './pages/CommunityTags'

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <MapPreview />
      <EventsSection />
      <CTASection />
    </>
  )
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
          <Navbar />
          <SignedIn>
            <CreateOrCheckUser />
          </SignedIn>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/community-tags" element={<CommunityTags />} />
            {/* Add other routes as needed */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  )
}

export default App
