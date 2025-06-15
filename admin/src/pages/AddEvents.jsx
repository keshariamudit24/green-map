import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddEvents() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    maxParticipants: 50,
    isVirtual: false
  });

  const [eventImage, setEventImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  
  // Check if admin is logged in
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('adminToken');
      if (!isAuthenticated) {
        navigate('/admin/signin');
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
      const fileURL = URL.createObjectURL(file);
      setPreviewURL(fileURL);
    }
  };
  
  const clearImage = () => {
    setEventImage(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // Create form data to handle file upload
      const formData = new FormData();
      
      // Add all event data to formData
      Object.keys(eventData).forEach(key => {
        formData.append(key, eventData[key]);
      });
      
      // Add the file if one is selected
      if (eventImage) {
        formData.append('eventImage', eventImage);
      }
      
      // In a real app, you would send this to your API
      // For demo purposes, we'll just simulate a successful response
      
      // Simulate an API call
      console.log('Submitting event data:', formData);
      
      // Uncomment and adjust this when you have your API ready
      /*
      const response = await axios.post('http://localhost:3000/admin/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      */
      
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form 
      setEventData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        organizer: '',
        maxParticipants: 50,
        isVirtual: false
      });
      clearImage();
      
      // Show success message
      setSuccessMessage('Event added successfully!');
      
      // Auto-dismiss success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
    } catch (error) {
      console.error('Error adding event:', error);
      setErrorMessage('Failed to add event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignOut = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-700"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/admin-logo.png" 
                alt="Green Map Admin" 
                className="h-8 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-logo.svg";
                }}
              />
              <h1 className="text-xl font-bold text-white">Green Map Admin</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-green-800 hover:bg-green-900 text-white text-sm px-3 py-1 rounded flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h2>
          
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleInputChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleInputChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter event location"
                  required
                />
              </div>
              
              {/* Organizer */}
              <div>
                <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 mb-1">
                  Organizer *
                </label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  value={eventData.organizer}
                  onChange={handleInputChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter organizer name"
                  required
                />
              </div>
              
              {/* Max Participants */}
              <div>
                <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  value={eventData.maxParticipants}
                  onChange={handleInputChange}
                  min="1"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="50"
                />
              </div>
              
              {/* Virtual Event Checkbox */}
              <div className="flex items-center h-full">
                <input
                  type="checkbox"
                  id="isVirtual"
                  name="isVirtual"
                  checked={eventData.isVirtual}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-700">
                  This is a virtual event
                </label>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Event Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                rows="4"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Provide event details, agenda, etc."
                required
              ></textarea>
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Image
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                />
                {previewURL && (
                  <button 
                    type="button" 
                    onClick={clearImage}
                    className="ml-3 text-sm text-red-600 hover:text-red-800"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {/* Image preview */}
              {previewURL && (
                <div className="mt-2">
                  <div className="relative w-40 h-40 rounded-md overflow-hidden">
                    <img 
                      src={previewURL} 
                      alt="Event preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Preview</p>
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Event...
                  </span>
                ) : (
                  'Add Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvents;
