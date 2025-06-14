function CTASection() {
  return (
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
  )
}

export default CTASection
