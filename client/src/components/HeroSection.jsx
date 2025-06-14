function HeroSection() {
  return (
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
                  <div className="p-4 relative w-full h-full">
                    {/* Interactive map visualization */}
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <img 
                        src="https://placehold.co/800x500/e4f3ea/31343C?text=Map+Background" 
                        alt="Map background" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Map Markers */}
                    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="absolute top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Floating Info Card */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-xl w-40 text-center">
                      <div className="text-xs font-semibold text-gray-800">Oak Tree</div>
                      <div className="text-xs text-gray-600 mt-1">Planted: May 2023</div>
                      <div className="h-1 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <div className="text-xs text-green-600 mt-1">Health: 70%</div>
                    </div>
                    
                    {/* Controls Overlay */}
                    <div className="absolute top-3 right-3 bg-white bg-opacity-70 p-2 rounded-md shadow flex space-x-1">
                      <button className="w-6 h-6 flex items-center justify-center bg-white rounded shadow">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center bg-white rounded shadow">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-3 left-3 bg-white bg-opacity-70 p-2 rounded-md shadow">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Trees</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs mt-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Lakes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
