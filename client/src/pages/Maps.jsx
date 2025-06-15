import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import L from 'leaflet';

// Fix marker icons - this is critical for proper icon display
delete L.Icon.Default.prototype._getIconUrl;
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons for different marker types
const treeIcon = new L.Icon({
  iconUrl: '/tree-icon.png',  // Make sure these icons exist in public folder
  iconSize: [38, 38],  // Adjusted size
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
   shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

const lakeIcon = new L.Icon({
  iconUrl: '/lake-icon.png',  // Make sure these icons exist in public folder
  iconSize: [38, 38],  // Adjusted size
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
   shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

const defaultIcon = new L.Icon({
    iconUrl: '/marker.png',  // Add this icon in public folder
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export default function MapComponent() {
    const [markers, setMarkers] = useState([]);
    const [newMarker, setNewMarker] = useState(null);
    const [formData, setFormData] = useState({
        entity: '',  // tree or lake
        species: '',
        age: '',
        location: '',
        description: '',
        imgUrl: ''
    });

    // Fetch existing markers
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/markers/all');
                // Log the response to debug
                console.log('Markers response:', response.data);
                // Ensure markers have proper coordinates structure
                const validMarkers = response.data.filter(marker => 
                    marker.location && 
                    Array.isArray(marker.location.coordinates) && 
                    marker.location.coordinates.length === 2
                );
                setMarkers(validMarkers);
            } catch (error) {
                toast.error('Failed to load markers');
                console.error('Error:', error);
            }
        };
        fetchMarkers();
    }, []);

    // Click handler component
    function MapClickHandler() {
        useMapEvents({
            click: (e) => {
                setNewMarker({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                });
            }
        });
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const markerData = {
                ...formData,
                location: {
                    type: 'Point',
                    coordinates: [newMarker.lng, newMarker.lat]
                }
            };
            console.log('Submitting marker data:', markerData); // Debug log

            const response = await axios.post('http://localhost:3000/markers/post', markerData);
            // Ensure the new marker has the same structure as existing ones
            const newMarkerData = {
                ...response.data,
                location: {
                    type: 'Point',
                    coordinates: [newMarker.lng, newMarker.lat]
                }
            };
            setMarkers(prev => [...prev, newMarkerData]);
            setNewMarker(null);
            setFormData({
                entity: '',
                species: '',
                age: '',
                location: '',
                description: '',
                imgUrl: ''
            });
            toast.success('Marker added successfully!');
        } catch (error) {
            toast.error('Failed to add marker');
            console.error('Error:', error);
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
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="bottomright" />
                <MapClickHandler />

                {/* Existing markers with safety checks */}
                {markers.map(marker => {
                    // Skip markers without valid coordinates
                    if (!marker.location?.coordinates) return null;

                    return (
                        <Marker
                            key={marker._id}
                            position={[
                                marker.location.coordinates[1],
                                marker.location.coordinates[0]
                            ]}
                            icon={marker.entity === 'tree' ? treeIcon : lakeIcon}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold capitalize">{marker.entity || 'Unknown'}</h3>
                                    {marker.species && <p><strong>Species:</strong> {marker.species}</p>}
                                    {marker.age && <p><strong>Age:</strong> {marker.age} years</p>}
                                    <p><strong>Location:</strong> {marker.location?.name || 'Unknown'}</p>
                                    {marker.description && <p>{marker.description}</p>}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* New marker with form */}
                {newMarker && (
                    <Marker 
                        position={[newMarker.lat, newMarker.lng]} 
                        icon={formData.entity === 'tree' ? treeIcon : 
                             formData.entity === 'lake' ? lakeIcon : 
                             defaultIcon}  // Dynamic icon based on selected entity
                    >
                        <Popup>
                            <form onSubmit={handleSubmit} className="w-64 p-2">
                                <select
                                    className="w-full mb-2 p-1 border rounded"
                                    value={formData.entity}
                                    onChange={(e) => setFormData({...formData, entity: e.target.value})}
                                    required
                                >
                                    <option value="">Select Entity Type</option>
                                    <option value="tree">Tree</option>
                                    <option value="lake">Lake</option>
                                </select>

                                {formData.entity === 'tree' && (
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
                                            placeholder="Age (in years)"
                                            className="w-full mb-2 p-1 border rounded"
                                            value={formData.age}
                                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                                        />
                                    </>
                                )}

                                <input
                                    type="text"
                                    placeholder="Location Name*"
                                    className="w-full mb-2 p-1 border rounded"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    required
                                />

                                <textarea
                                    placeholder="Description*"
                                    className="w-full mb-2 p-1 border rounded"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    required
                                    rows="3"
                                />

                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    className="w-full mb-2 p-1 border rounded"
                                    value={formData.imgUrl}
                                    onChange={(e) => setFormData({...formData, imgUrl: e.target.value})}
                                />

                                <button 
                                    type="submit" 
                                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                >
                                    Add {formData.entity || 'Marker'}
                                </button>
                            </form>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}
