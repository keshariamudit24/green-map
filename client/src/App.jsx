import { useState } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-green-700 font-bold text-2xl">Green<span className="text-blue-600">Map</span></span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                  <a href="#events" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Events</a>
                  <a href="#map" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Map</a>
                  <a href="#about" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
                  <a href="#communities" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Communities</a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Join Now</button>
              <div className="-mr-2 flex md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button" 
                  className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-200 focus:outline-none"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#events" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Events</a>
            <a href="#map" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Map</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#communities" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Communities</a>
            <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Join Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Community-Driven <span className="text-green-600">Tree</span> and <span className="text-blue-600">Lake</span> Tagging
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                Join your local community in mapping and tagging trees and lakes. Help collect valuable environmental data that organizations can use to protect our natural resources.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#join" className="px-8 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition md:py-4 md:text-lg md:px-10 text-center">
                  Join an Event
                </a>
                <a href="#explore" className="px-8 py-3 text-base font-medium rounded-md text-green-600 bg-white border border-green-600 hover:bg-green-50 transition md:py-4 md:text-lg md:px-10 text-center">
                  Explore the Map
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl overflow-hidden shadow-xl transform -rotate-3">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4">
                      <img 
                        src="https://placehold.co/600x400/EEE/31343C?text=Interactive+Community+Map" 
                        alt="Interactive map placeholder" 
                        className="mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
              How GreenMap Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Connecting communities for environmental data collection and sustainability
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-800">Join Local Events</h3>
              <p className="mt-2 text-gray-600">
                Sign up for tree planting and tagging events in your community, organized by local groups and organizations.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-800">Record Environmental Data</h3>
              <p className="mt-2 text-gray-600">
                Document tree types, ages, health conditions, and lake water quality indicators to build a valuable database.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-800">Share Knowledge</h3>
              <p className="mt-2 text-gray-600">
                The collected data helps organizations, researchers, and communities make informed environmental decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-12 bg-gray-50" id="map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 lg:pr-8">
              <h2 className="text-3xl font-extrabold text-gray-800">Interactive Community Map</h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore tagged trees and lakes in your area. See what species thrive locally and which areas need more attention.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-600">Find suitable tree species for your area</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-600">Identify nearby lakes that need conservation efforts</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-600">Discover upcoming community events in your neighborhood</p>
                </li>
              </ul>
              <div className="mt-8">
                <a href="#explore-map" className="text-green-600 font-medium hover:text-green-700 transition flex items-center">
                  Open full map 
                  <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <img className="rounded-lg shadow-lg" src="https://placehold.co/800x600/e4f3ea/31343C?text=GreenMap+Preview" alt="Map preview" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12" id="events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">Upcoming Events</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 text-center">
            Join our community events to help plant and tag trees and monitor local lakes
          </p>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-40 bg-green-200 relative">
                <div className="absolute bottom-0 left-0 bg-green-600 text-white px-4 py-2 rounded-tr-lg font-medium">
                  May 15, 2023
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Oak Tree Planting Day</h3>
                <p className="text-gray-600 mb-4">Join us in planting native oak trees in Riverside Park. All tools and saplings provided.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Riverside Park, South Entrance
                </div>
                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition">
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-40 bg-blue-200 relative">
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-tr-lg font-medium">
                  June 3, 2023
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Lake Quality Assessment</h3>
                <p className="text-gray-600 mb-4">Help collect water samples and record data about our local Silver Lake. Training provided.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Silver Lake, East Dock
                </div>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition">
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-40 bg-amber-200 relative">
                <div className="absolute bottom-0 left-0 bg-amber-600 text-white px-4 py-2 rounded-tr-lg font-medium">
                  June 22, 2023
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Tree Tagging Workshop</h3>
                <p className="text-gray-600 mb-4">Learn how to identify and tag different tree species. Perfect for beginners!</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Community Center, Room 104
                </div>
                <button className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md font-medium transition">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="#all-events" className="inline-flex items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition">
              View All Events
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-12 bg-green-50" id="communities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">Communities Making a Difference</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 text-center">
            See how groups across the country are using GreenMap to make environmental impact
          </p>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img className="h-12 w-auto mb-4" src="https://placehold.co/200x80/f3f3f3/31343C?text=EcoFriends" alt="EcoFriends logo" />
              <p className="text-gray-600">
                "GreenMap has helped our volunteer group coordinate 15 tree-planting events this year, resulting in over 500 new trees in our city."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://placehold.co/100/f3f3f3/31343C?text=JS" alt="User" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                  <p className="text-sm text-gray-500">EcoFriends Coordinator</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img className="h-12 w-auto mb-4" src="https://placehold.co/200x80/f3f3f3/31343C?text=Lake+Guardians" alt="Lake Guardians logo" />
              <p className="text-gray-600">
                "We've been able to monitor water quality across 5 local lakes and coordinate cleanup efforts with precise data mapping."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://placehold.co/100/f3f3f3/31343C?text=MT" alt="User" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Mike Thomas</p>
                  <p className="text-sm text-gray-500">Lake Guardians Director</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img className="h-12 w-auto mb-4" src="https://placehold.co/200x80/f3f3f3/31343C?text=Green+School" alt="Green School Initiative logo" />
              <p className="text-gray-600">
                "Our students use GreenMap to track their school garden project and connect with local environmental experts."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://placehold.co/100/f3f3f3/31343C?text=AL" alt="User" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Amy Lee</p>
                  <p className="text-sm text-gray-500">Science Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-blue-600" id="join">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Join the GreenMap Community Today</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-green-100">
            Help build a comprehensive database of trees and lakes in your area
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a href="#sign-up" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10">
                Sign Up For Free
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a href="#learn-more" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GreenMap</h3>
              <p className="text-gray-300 text-sm">
                A community platform for environmental data collection, tree tagging and lake monitoring.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#map" className="hover:text-white transition">Map</a></li>
                <li><a href="#events" className="hover:text-white transition">Events</a></li>
                <li><a href="#communities" className="hover:text-white transition">Communities</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Tree Identification Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Water Quality Standards</a></li>
                <li><a href="#" className="hover:text-white transition">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Data Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Newsletter</a></li>
                <li>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2023 GreenMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
