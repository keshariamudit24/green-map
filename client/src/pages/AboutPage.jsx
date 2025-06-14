import React from 'react';

function AboutPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            About <span className="text-green-600">Green</span><span className="text-blue-600">Map</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Empowering communities to protect and nurture our natural environment through collective action
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              GreenMap was founded with a clear mission: to connect communities with their local environment 
              through the power of collaborative data collection and visualization. We believe that by making 
              environmental stewardship accessible to everyone, we can create a sustainable future for 
              generations to come.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                GreenMap began in 2020 when a group of environmental scientists and community organizers recognized 
                a critical gap: while professional environmental monitoring existed, there was no easy way for 
                everyday citizens to contribute to and access this valuable data.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We started with a simple concept: create a platform where anyone could tag and monitor trees and 
                lakes in their neighborhood. What began as a small local project has grown into a nationwide 
                movement with thousands of active participants contributing valuable environmental data every day.
              </p>
              <p className="text-lg text-gray-700">
                Today, GreenMap is used by individuals, schools, community groups, and environmental organizations 
                across the country to document, protect, and enhance our natural resources.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://placehold.co/800x600/e4f3ea/31343C?text=Our+Story" 
                  alt="Team working on environmental projects" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-xl text-gray-700">Trees Tagged</div>
              <p className="mt-4 text-gray-600">
                Over fifty thousand trees documented and monitored across the nation
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-xl text-gray-700">Lakes Monitored</div>
              <p className="mt-4 text-gray-600">
                Regular water quality assessments conducted by community volunteers
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-amber-100 text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">15K+</div>
              <div className="text-xl text-gray-700">Active Users</div>
              <p className="mt-4 text-gray-600">
                Growing community of environmental stewards making a difference
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-64 bg-gray-100">
                <img 
                  src="https://placehold.co/400x400/e4f3ea/31343C?text=Team+Member" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800">Emma Johnson</h3>
                <div className="text-green-600 font-medium mb-3">Co-Founder & Executive Director</div>
                <p className="text-gray-600">
                  Environmental scientist with a passion for urban forestry and community engagement.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-64 bg-gray-100">
                <img 
                  src="https://placehold.co/400x400/e4f3ea/31343C?text=Team+Member" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800">Michael Chen</h3>
                <div className="text-green-600 font-medium mb-3">Co-Founder & Technology Lead</div>
                <p className="text-gray-600">
                  Software engineer focused on creating tools that make environmental data accessible to all.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-64 bg-gray-100">
                <img 
                  src="https://placehold.co/400x400/e4f3ea/31343C?text=Team+Member" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800">Sophia Martinez</h3>
                <div className="text-green-600 font-medium mb-3">Community Outreach Director</div>
                <p className="text-gray-600">
                  Community organizer specialized in developing partnerships with local organizations and schools.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="mb-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're passionate about environmental conservation, community building, or simply want to make a 
            difference in your neighborhood, there's a place for you at GreenMap.
          </p>
          <a 
            href="#join-us" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10"
          >
            Get Involved Today
          </a>
        </div>

        {/* Partners Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <img src="https://placehold.co/200x80/f3f3f3/31343C?text=Partner+Logo" alt="Partner" className="w-full h-auto" />
            <img src="https://placehold.co/200x80/f3f3f3/31343C?text=Partner+Logo" alt="Partner" className="w-full h-auto" />
            <img src="https://placehold.co/200x80/f3f3f3/31343C?text=Partner+Logo" alt="Partner" className="w-full h-auto" />
            <img src="https://placehold.co/200x80/f3f3f3/31343C?text=Partner+Logo" alt="Partner" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
