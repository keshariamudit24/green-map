import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

function MyTags() {
  const { isSignedIn, user } = useUser();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For edit functionality
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For delete confirmation
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  
  // For file handling when editing
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  
  // Add new state for confirmation modals
  const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] = useState(false);
  const [tagToUpdate, setTagToUpdate] = useState(null);
  
  // Fetch user's tags when component mounts or user changes
  useEffect(() => {
    if (isSignedIn) {
      fetchUserTags();
    }
  }, [isSignedIn, user]);
  
  const fetchUserTags = async () => {
    if (!isSignedIn || !user?.emailAddresses?.[0]?.emailAddress) return;
    
    setIsLoading(true);
    try {
      // Get user's email address
      const userEmail = user.emailAddresses[0].emailAddress;
      
      // Use route parameter format as defined in server's userRoute.js
      const response = await axios.get(`http://localhost:3000/user/my-tags/${encodeURIComponent(userEmail)}`);
      
      console.log('User tags response:', response.data);
      
      // The server returns { msg: "sending user tags", payload: user.tag }
      // where user.tag is the array of tag objects
      if (response.data?.payload && Array.isArray(response.data.payload)) {
        // Make sure we properly handle MongoDB's _id field
        const tagsWithIds = response.data.payload.map(tag => ({
          ...tag,
          // Ensure both id and _id are available to avoid reference issues
          id: tag._id.toString(),
          _id: tag._id
        }));
        
        setTags(tagsWithIds);
      } else {
        setTags([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching user tags:', err);
      setError(`Failed to load your tags: ${err.response?.data?.error || err.message}`);
      
      // For demo purposes only - use dummy data in development
      if (process.env.NODE_ENV !== 'production') {
        const dummyTags = [
          {
            id: '1',
            entity: 'tree',
            species: 'Oak',
            age: 45,
            location: 'Central Park, New York',
            description: 'A beautiful oak tree with wide branches',
            imgUrl: '/uploads/tree1.jpg',
            createdAt: '2023-08-15T14:30:00Z'
          },
          {
            id: '2',
            entity: 'lake',
            species: 'Freshwater',
            location: 'Highland Park',
            description: 'Small lake with lots of fish and water plants',
            imgUrl: '/uploads/lake1.jpg',
            createdAt: '2023-09-22T10:15:00Z'
          }
        ];
        
        console.log('Using dummy data for development');
        setTags(dummyTags);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Open edit modal and set current tag
  const handleEditClick = (tag) => {
    // Make a deep copy to avoid reference issues
    setCurrentTag(JSON.parse(JSON.stringify(tag)));
    setIsEditModalOpen(true);
    // If tag has an image, set preview with proper URL handling
    if (tag.imgUrl) {
      // Check if the URL already has http:// or https://
      const fullImgUrl = tag.imgUrl.startsWith('http') 
        ? tag.imgUrl 
        : `http://localhost:3000${tag.imgUrl}`;
      setPreviewURL(fullImgUrl);
    } else {
      setPreviewURL('');
    }
  };
  
  // Modify submit function to show confirmation modal first
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Show confirmation modal instead of immediately submitting
    setTagToUpdate({...currentTag});
    setIsUpdateConfirmModalOpen(true);
  };
  
  // New function to proceed with update after confirmation
  const proceedWithUpdate = async () => {
    setIsSubmitting(true);
    try {
      const userEmail = user?.emailAddresses?.[0]?.emailAddress;
      
      if (!userEmail) {
        throw new Error('User email is not available');
      }
      
      // Prepare the request data - IMPORTANT: Add debugging to log ID format
      console.log("Original tag ID type:", typeof tagToUpdate._id, "Value:", tagToUpdate._id);
      console.log("String ID type:", typeof tagToUpdate.id, "Value:", tagToUpdate.id);
      
      // Use string ID consistently
      const tagId = tagToUpdate.id.toString();
      
      const updateData = {
        email: userEmail,
        tagId: tagId,
        confirmUpdate: true,
        entity: tagToUpdate.entity,
        species: tagToUpdate.species || "",
        age: tagToUpdate.age || 0,
        location: tagToUpdate.location,
        description: tagToUpdate.description,
      };
      
      console.log("Sending update with data:", JSON.stringify(updateData, null, 2));
      
      try {
        // Handle file upload if needed
        if (selectedFile) {
          const formData = new FormData();
          
          // Add all update data to formData
          Object.keys(updateData).forEach(key => {
            formData.append(key, updateData[key]);
          });
          
          formData.append('image', selectedFile);
          
          console.log("Sending multipart request with file");
          const response = await axios.put('http://localhost:3000/user/update', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          console.log("Server response:", response.data);
        } else {
          // Regular JSON request for data-only updates
          console.log("Sending JSON request without file");
          const response = await axios.put('http://localhost:3000/user/update', updateData);
          console.log("Server response:", response.data);
        }
        
        // Close all modals and reset state
        setIsUpdateConfirmModalOpen(false);
        setIsEditModalOpen(false);
        setCurrentTag(null);
        setTagToUpdate(null);
        setSelectedFile(null);
        setPreviewURL('');
        
        // Refresh tags from server to ensure consistency
        fetchUserTags();
        
        // Add success alert
        alert("Tag updated successfully!");
        
      } catch (axiosError) {
        // This is a nested try/catch to better handle axios errors
        console.error('Axios error details:', axiosError);
        
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          console.error('Server Error Status:', axiosError.response.status);
          console.error('Server Error Data:', axiosError.response.data);
          console.error('Server Error Headers:', axiosError.response.headers);
          
          // Show more detailed error message
          throw new Error(`Server error ${axiosError.response.status}: ${
            axiosError.response.data.error || 
            axiosError.response.data.message || 
            'Unknown server error'
          }`);
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('No response received:', axiosError.request);
          throw new Error('No response received from server. Please check your connection.');
        } else {
          // Something happened in setting up the request
          console.error('Error setting up request:', axiosError.message);
          throw new Error(`Request setup failed: ${axiosError.message}`);
        }
      }
      
    } catch (err) {
      console.error('Error updating tag:', err);
      alert(`Failed to update tag: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Open delete confirmation modal
  const handleDeleteClick = (tag) => {
    console.log("Delete button clicked for tag:", tag);
    setTagToDelete(tag);
    setIsDeleteConfirmModalOpen(true); // This should open the modal
    
    // Debug to check state was set
    setTimeout(() => {
      console.log("Modal state after click:", {
        tagToDelete: tag,
        isDeleteConfirmModalOpen: true
      });
    }, 100);
  };
  
  // Proceed with delete after confirmation
  const proceedWithDelete = async () => {
    if (!tagToDelete) return;
    
    setIsSubmitting(true);
    try {
      const userEmail = user?.emailAddresses?.[0]?.emailAddress;
      
      if (!userEmail) {
        throw new Error('User email is not available');
      }
      
      // Use the correct ID field - MongoDB might be using _id instead of id
      const tagId = tagToDelete._id || tagToDelete.id;
      
      console.log('Attempting to delete tag:', { 
        tagId, 
        email: userEmail, 
        tag: tagToDelete 
      });
      
      // Send the delete request with required data
      await axios.delete('http://localhost:3000/user/delete', {
        data: {
          email: userEmail,
          tagId: tagId,
          confirmDelete: true // Confirmation flag
        }
      });
      
      console.log('Tag deleted successfully');
      
      // Update local state to remove the deleted tag
      setTags(prevTags => prevTags.filter(tag => {
        // Handle both _id and id for maximum compatibility
        const currentId = tag._id || tag.id;
        const deleteId = tagToDelete._id || tagToDelete.id;
        return currentId !== deleteId;
      }));
      
      // Close modal
      setIsDeleteConfirmModalOpen(false);
      setTagToDelete(null);
      
      // Show success message
      alert('Tag deleted successfully!');
      
    } catch (err) {
      console.error('Error deleting tag:', err);
      
      // Detailed error logging for debugging
      if (err.response) {
        console.error('Server response:', err.response.data);
        console.error('Status code:', err.response.status);
      }
      
      alert(`Failed to delete tag: ${err.response?.data?.error || err.message}`);
      
      // Close modal even on error to avoid locking the UI
      setIsDeleteConfirmModalOpen(false);
      setTagToDelete(null);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle input changes when editing
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTag({
      ...currentTag,
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
    if (previewURL && !currentTag.imgUrl) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL('');
    } else if (currentTag.imgUrl) {
      // Reset to the original image
      setPreviewURL(`http://localhost:3000${currentTag.imgUrl}`);
    }
  };
  
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tags</h1>
          
          {/* Add a refresh button */}
          {isSignedIn && (
            <button
              onClick={() => fetchUserTags()}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md flex items-center text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh
                </span>
              )}
            </button>
          )}
        </div>
        
        {/* Message if not signed in */}
        {!isSignedIn && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please sign in to view your tags.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {isSignedIn && isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        )}
        
        {/* Error state */}
        {isSignedIn && error && (
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
        {isSignedIn && !isLoading && !error && tags.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tags yet</h3>
            <p className="mt-1 text-gray-500">
              You haven't added any tags to the community yet.
            </p>
          </div>
        )}
        
        {/* Tags grid */}
        {isSignedIn && !isLoading && !error && tags.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.map((tag) => (
              <div key={tag.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                {/* Edit and Delete buttons */}
                <div className="absolute top-2 right-2 z-10 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(tag)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
                    title="Edit tag"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(tag)}
                    className="bg-white p-2 rounded-full shadow hover:bg-red-50 transition-colors"
                    title="Delete tag"
                  >
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              
                {tag.imgUrl && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      // Handle different URL formats (absolute or relative paths)
                      src={tag.imgUrl.startsWith('http') ? tag.imgUrl : `http://localhost:3000${tag.imgUrl}`}
                      alt={tag.description || "Tag image"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x300?text=No+Image";
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
                  
                  {/* Date added */}
                  <div className="text-xs text-gray-500 mt-2">
                    Added: {new Date(tag.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Edit Modal */}
        {isEditModalOpen && currentTag && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Edit Tag</h3>
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setCurrentTag(null);
                      clearFileSelection();
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleEditSubmit} className="px-6 py-4">
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
                          checked={currentTag.entity === 'tree'}
                          onChange={handleEditInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Tree</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entity"
                          value="lake"
                          checked={currentTag.entity === 'lake'}
                          onChange={handleEditInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Lake</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Species */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Species {currentTag.entity === 'tree' ? '(e.g., Oak, Maple)' : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      name="species"
                      value={currentTag.species || ''}
                      onChange={handleEditInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder={currentTag.entity === 'tree' ? 'Tree species' : 'Lake type (if applicable)'}
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
                      value={currentTag.age || ''}
                      onChange={handleEditInputChange}
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
                      value={currentTag.location || ''}
                      onChange={handleEditInputChange}
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
                      value={currentTag.description || ''}
                      onChange={handleEditInputChange}
                      required
                      rows="3"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Describe the tree or lake..."
                    ></textarea>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Image (Optional)
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
                      {(selectedFile || previewURL) && (
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
                  </div>
                </div>
                
                {/* Submit and Cancel Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setCurrentTag(null);
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
                        Updating...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal - Make sure we're referencing the correct state */}
        {isDeleteConfirmModalOpen && tagToDelete && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 rounded-full p-2 mr-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">
                      Are you sure you want to delete this tag?
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
                
                {/* Show which tag is being deleted */}
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {tagToDelete.entity}</p>
                  {tagToDelete.species && (
                    <p className="text-sm text-gray-600"><span className="font-medium">Species:</span> {tagToDelete.species}</p>
                  )}
                  <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {tagToDelete.location}</p>
                  <p className="text-sm text-gray-600 truncate"><span className="font-medium">Description:</span> {tagToDelete.description}</p>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Cancel delete clicked");
                      setIsDeleteConfirmModalOpen(false);
                      setTagToDelete(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Confirm delete clicked");
                      proceedWithDelete();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      'Delete Tag'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Update Confirmation Modal */}
        {isUpdateConfirmModalOpen && tagToUpdate && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fadeIn">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Confirm Update</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 rounded-full p-2 mr-4">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Are you sure you want to update this tag? This action will modify the tag information.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {tagToUpdate.entity}</p>
                  {tagToUpdate.species && (
                    <p className="text-sm text-gray-600"><span className="font-medium">Species:</span> {tagToUpdate.species}</p>
                  )}
                  <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {tagToUpdate.location}</p>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsUpdateConfirmModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={proceedWithUpdate}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      'Confirm Update'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default MyTags;
