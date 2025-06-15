import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();
  
  const handleSignInClick = () => {
    navigate('/admin/signin');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/admin-logo.png" 
                alt="Green Map Admin" 
                className="h-10 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/fallback-logo.svg';
                }}
              />
              <h1 className="text-3xl font-bold text-white">Green Map Admin</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-8 text-center">
            <div className="flex flex-col items-center">
              <svg className="h-16 w-16 text-green-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Green Map Admin Panel</h2>
              <p className="text-gray-600 max-w-lg mb-8">
                This is a restricted area for authorized administrators only. Please sign in with your administrator credentials to access the management features.
              </p>
              <button
                onClick={handleSignInClick}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Sign In as Administrator
              </button>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                For support, please contact the system administrator at admin@greenmap.org
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-green-800 text-green-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Green Map Administration</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminHome;
