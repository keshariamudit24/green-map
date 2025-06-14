import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

function CommunityTags() {
  const { isSignedIn, user } = useUser();
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [newTag, setNewTag] = useState({
    entity: 'tree', // Default value
    species: '',
    age: '',
    location: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  
  // Fetch all tags when component mounts
  useEffect(() => {
    fetchTags();
  }, []);
  
  // Let's modify how we handle tag data in the fetchTags function
  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/user/all-tags');
      console.log('API response raw:', response.data);
      
      // Assuming the API returns an array of objects with userTag and userFirstName properties
      const formattedTags = response.data.payload.map(item => ({
        ...item.userTag,  // Spread the tag properties to the top level
        userFirstName: item.userFirstName
      }));
      
      console.log('Formatted tags:', formattedTags);
      setTags(formattedTags);
      setError(null);
    } catch (err) {
      console.error('Error fetching tags:', err);
      setError('Failed to load community tags. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTag({
      ...newTag,
      [name]: name === 'age' ? (value ? parseInt(value) : '') : value
    });
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the selected image
      const fileURL = URL.createObjectURL(file);
      setPreviewURL(fileURL);
    }
  };
  
  // Clear file selection
  const clearFileSelection = () => {
    setSelectedFile(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL('');
    }
  };
  
  // Handle form submission with file upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create form data to handle file upload
      const formData = new FormData();
      
      // Add all tag data to formData
      Object.keys(newTag).forEach(key => {
        formData.append(key, newTag[key]);
      });
      
      // Add the file if one is selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      
      // Add user's email from the Clerk user object if signed in
      if (isSignedIn && user?.emailAddresses?.length > 0) {
        const primaryEmail = user.emailAddresses[0].emailAddress;
        formData.append('userEmail', primaryEmail);
        console.log('Adding user email:', primaryEmail);
      }
      
      // Send the request with formData
      await axios.post('http://localhost:3000/tag/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Reset form state
      setIsModalOpen(false);
      setNewTag({
        entity: 'tree',
        species: '',
        age: '',
        location: '',
        description: '',
      });
      clearFileSelection();
      
      // Refresh tags after adding a new one
      fetchTags();
    } catch (err) {
      console.error('Error adding tag:', err);
      alert(`Failed to add tag: ${err.response?.data?.error || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Tags</h1>
          {isSignedIn && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Tag
            </button>
          )}
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && !error && tags.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tags yet</h3>
            <p className="mt-1 text-gray-500">
              Be the first one to add a tag to the community!
            </p>
            {isSignedIn && (
              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add a Tag
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Tags grid */}
        {!isLoading && !error && tags.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.map((tag, index) => {
              // Optional: log outside of JSX
              console.log("Rendering tag:", tag);
              return (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {tag.imgUrl && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={tag.imgUrl}
                        alt={tag.description || "Tag image"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        tag.entity === 'tree' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {tag.entity && tag.entity.charAt(0).toUpperCase() + tag.entity.slice(1)}
                      </span>
                      {tag.species && (
                        <span className="text-sm text-gray-600">{tag.species}</span>
                      )}
                    </div>
                    {tag.age && (
                      <p className="text-sm text-gray-600 mb-2">Age: ~{tag.age} years</p>
                    )}
                    <p className="text-gray-700 font-medium mb-2">{tag.description}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {tag.location}
                    </div>
                    {/* User who posted the tag */}
                    <div className="flex items-center text-gray-500 text-sm border-t pt-2 mt-2">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Posted by: <span className="ml-1 text-gray-700 font-medium">{tag.userFirstName || 'Anonymous User'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Floating action button (visible on mobile) */}
        {isSignedIn && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed md:hidden right-6 bottom-6 z-10 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center focus:outline-none hover:bg-green-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        )}
        
        {/* Modal for adding a new tag */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Add New Tag</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="px-6 py-4">
                <div className="space-y-4">
                  {/* Entity selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Entity Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entity"
                          value="tree"
                          checked={newTag.entity === 'tree'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Tree</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entity"
                          value="lake"
                          checked={newTag.entity === 'lake'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Lake</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Species */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Species {newTag.entity === 'tree' ? '(e.g., Oak, Maple)' : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      name="species"
                      value={newTag.species}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder={newTag.entity === 'tree' ? 'Tree species' : 'Lake type (if applicable)'}
                    />
                  </div>
                  
                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Age (Years) - Optional
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={newTag.age}
                      onChange={handleInputChange}
                      min="0"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Approximate age in years"
                    />
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newTag.location}
                      onChange={handleInputChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Location description or address"
                    />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={newTag.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Describe the tree or lake..."
                    ></textarea>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image (Optional)
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-medium
                          file:bg-green-50 file:text-green-700
                          hover:file:bg-green-100"
                      />
                      {selectedFile && (
                        <button 
                          type="button" 
                          onClick={clearFileSelection}
                          className="ml-3 text-sm text-red-600 hover:text-red-800"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    
                    {/* Image preview */}
                    {previewURL && (
                      <div className="mt-2">
                        <div className="relative w-full h-40 rounded-md overflow-hidden">
                          <img 
                            src={previewURL} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Image preview</p>
                      </div>
                    )}
                    
                    <p className="mt-1 text-xs text-gray-500">
                      Select an image file from your device (JPG, PNG, etc.)
                    </p>
                  </div>
                </div>
                
                {/* Submit and Cancel Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      clearFileSelection();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      'Add Tag'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityTags;
