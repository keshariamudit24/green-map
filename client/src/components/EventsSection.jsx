import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/events');
        console.log(response.data.payload)
        setEvents(response.data.payload || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 pt-36" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Upcoming Events</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 text-center">
          Join our community events to help plant and tag trees and monitor local lakes
        </p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">No upcoming events</p>
          ) : (
            events.map((event) => (
              <EventCard
                key={event._id}
                date={new Date(event.date).toLocaleDateString()}
                title={event.title}
                description={event.description}
                location={event.location}
                color="green"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}


export default EventsSection;
