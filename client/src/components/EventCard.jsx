function EventCard({ date, title, description, location, color = "green" }) {
  // Define color variants
  const colorVariants = {
    green: {
      bg: "bg-green-200",
      button: "bg-green-600 hover:bg-green-700",
      badge: "bg-green-600"
    },
    blue: {
      bg: "bg-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-600"
    },
    amber: {
      bg: "bg-amber-200",
      button: "bg-amber-600 hover:bg-amber-700",
      badge: "bg-amber-600"
    }
  };

  const colorClasses = colorVariants[color] || colorVariants.green;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <div className={`h-40 ${colorClasses.bg} relative`}>
        <div className={`absolute bottom-0 left-0 ${colorClasses.badge} text-white px-4 py-2 rounded-tr-lg font-medium`}>
          {date}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
        <button className={`mt-6 w-full ${colorClasses.button} text-white py-2 rounded-md font-medium transition`}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default EventCard;
