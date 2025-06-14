import EventCard from './EventCard'

function EventsSection() {
  const events = [
    {
      date: "May 15, 2023",
      title: "Oak Tree Planting Day",
      description: "Join us in planting native oak trees in Riverside Park. All tools and saplings provided.",
      location: "Riverside Park, South Entrance",
      color: "green"
    },
    {
      date: "June 3, 2023",
      title: "Lake Quality Assessment",
      description: "Help collect water samples and record data about our local Silver Lake. Training provided.",
      location: "Silver Lake, East Dock",
      color: "blue"
    },
    {
      date: "June 22, 2023",
      title: "Tree Tagging Workshop",
      description: "Learn how to identify and tag different tree species. Perfect for beginners!",
      location: "Community Center, Room 104",
      color: "amber"
    }
  ];

  return (
    <section className="py-12" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Upcoming Events</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 text-center">
          Join our community events to help plant and tag trees and monitor local lakes
        </p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
              location={event.location}
              color={event.color}
            />
          ))}
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
  )
}

export default EventsSection
