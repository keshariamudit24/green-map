import { React, useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Custom icons for different marker types
const treeIcon = new L.Icon({
  iconUrl: '/tree-marker.png',  // Add these icons to your public folder
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const lakeIcon = new L.Icon({
  iconUrl: '/lake-marker.png',  // Add these icons to your public folder
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


export default function MapComponent() {
  const [newMarker, setNewMarker] = useState(null);
  const [markerType, setMarkerType] = useState(null);
  const [existingMarkers, setExistingMarkers] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    // Tree fields
    species: '',
    estimatedAge: '',
    description: '',
    // Lake fields
    name: '',
    approximateSize: '',
    pollutionLevel: 'Low',
    nearbyGreenery: ''
  });

  useEffect(() => {
    // Fetch existing markers
    const fetchMarkers = async () => {
      try {
        const [treesRes, lakesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/trees'),
          axios.get('http://localhost:3000/api/lakes')
        ]);
        setExistingMarkers([
          ...treesRes.data.map(tree => ({ ...tree, type: 'tree' })),
          ...lakesRes.data.map(lake => ({ ...lake, type: 'lake' }))
        ]);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };
    fetchMarkers();
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setNewMarker(e.latlng);
        setMarkerType(null); // Reset marker type on new click
      }
    });

    return newMarker ? (
      <Marker position={newMarker} icon={markerType === 'tree' ? treeIcon : lakeIcon}>
        <Popup>
          {!markerType ? (
            <div className="flex gap-2">
              <button
                onClick={() => setMarkerType('tree')}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Tag Tree
              </button>
              <button
                onClick={() => setMarkerType('lake')}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Tag Lake
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-64">
              {markerType === 'tree' ? (
                // Tree Form
                <>
                  <input
                    type="text"
                    placeholder="Species"
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.species}
                    onChange={(e) => setFormData({...formData, species: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Estimated Age"
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.estimatedAge}
                    onChange={(e) => setFormData({...formData, estimatedAge: e.target.value})}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </>
              ) : (
                // Lake Form
                <>
                  <input
                    type="text"
                    placeholder="Lake Name"
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Approximate Size"
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.approximateSize}
                    onChange={(e) => setFormData({...formData, approximateSize: e.target.value})}
                  />
                  <select
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.pollutionLevel}
                    onChange={(e) => setFormData({...formData, pollutionLevel: e.target.value})}
                  >
                    <option value="Low">Low Pollution</option>
                    <option value="Medium">Medium Pollution</option>
                    <option value="High">High Pollution</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Nearby Greenery"
                    className="w-full mb-2 p-1 border rounded"
                    value={formData.nearbyGreenery}
                    onChange={(e) => setFormData({...formData, nearbyGreenery: e.target.value})}
                  />
                </>
              )}
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                Submit
              </button>
            </form>
          )}
        </Popup>
      </Marker>
    ) : null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = markerType === 'tree' ? '/api/trees' : '/api/lakes';
      const response = await axios.post(`http://localhost:3000${endpoint}`, {
        ...formData,
        type: markerType,
        location: {
          type: 'Point',
          coordinates: [newMarker.lng, newMarker.lat]
        }
      });
      
      setExistingMarkers(prev => [...prev, { ...response.data, type: markerType }]);
      setNewMarker(null);
      setMarkerType(null);
      setFormData({
        type: '',
        species: '',
        estimatedAge: '',
        description: '',
        name: '',
        approximateSize: '',
        pollutionLevel: 'Low',
        nearbyGreenery: ''
      });
    } catch (error) {
      console.error('Error saving marker:', error);
    }
  };

  return (
    <div className="w-full h-screen">
      <MapContainer 
        center={[19.0760, 72.8777]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <LocationMarker />
        
        {/* Display existing markers */}
        {existingMarkers.map(marker => (
          <Marker
            key={marker._id}
            position={[marker.location.coordinates[1], marker.location.coordinates[0]]}
            icon={marker.type === 'tree' ? treeIcon : lakeIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{marker.type === 'tree' ? marker.species : marker.name}</h3>
                <p>{marker.description}</p>
                <p className="text-sm text-gray-500">Added on: {new Date(marker.createdAt).toLocaleDateString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
