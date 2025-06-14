import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const handleSignIn = () => {
    openSignIn({
      redirectUrl: window.location.href, // Redirect back to current page after sign in
    });
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-green-700 font-bold text-2xl">Green<span className="text-blue-600">Map</span></Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/events" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Events</Link>
                <Link to="/map" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Map</Link>
                <Link to="/about" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isSignedIn ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  Welcome, {user.firstName || 'User'}
                </div>
                <div className="relative">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <img 
                      src={user.profileImageUrl} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover border-2 border-green-500" 
                    />
                    <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Join Now
              </button>
            )}
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
          <Link to="/" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/events" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Events</Link>
          <Link to="/map" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Map</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">About</Link>
          
          {isSignedIn ? (
            <div className="mt-3 px-3 py-2 border-t border-gray-200 flex items-center">
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="h-8 w-8 rounded-full object-cover border-2 border-green-500 mr-2" 
              />
              <div className="text-sm text-gray-700">
                {user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'My Account'}
              </div>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Join Now
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
