function FeaturesSection() {
  return (
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
  )
}

export default FeaturesSection
