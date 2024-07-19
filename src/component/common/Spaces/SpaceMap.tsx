import  { SetStateAction, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Source, Layer  } from 'react-map-gl';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface UserLocations {
    latitude: number;
    longitude: number;
}

interface CustomViewportProps {
    latitude: number;
    longitude: number;
    zoom: number;
  
}

const SpaceMap:React.FC<UserLocations> = ({ latitude, longitude }) => {
    const [viewport, setViewport] = useState<CustomViewportProps>({
        latitude: latitude,
        longitude: longitude,
        zoom: 12, // Adjust the initial zoom level as needed
    });

    // const [setUserLocation] = useState({ latitude: 0, longitude: 0 });
    const [route, setRoute] = useState(null);

    const handleViewportChange = (newViewport: SetStateAction<{
            latitude: number; longitude: number; zoom: number; // Adjust the initial zoom level as needed
        }>) => {
        setViewport(newViewport);
    };

    const handleGeolocate = (e: { coords: { latitude: number; longitude: number; }; }) => {
        const newLatitude = e.coords.latitude;
        const newLongitude = e.coords.longitude;
        // setUserLocation({ latitude: newLatitude, longitude: newLongitude });
        setViewport({
            ...viewport,
            latitude: newLatitude,
            longitude: newLongitude,
            zoom: 12 // Adjust the zoom level when the user's location is found
        });
        fetchDirections(newLatitude, newLongitude);
    };

    const fetchDirections = (startLat:number, startLng:number) => {
        const accessToken = "pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg";
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${longitude},${latitude}?steps=true&geometries=geojson&access_token=${accessToken}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.routes && data.routes.length > 0) {
                    setRoute(data.routes[0].geometry);
                }
            })
            .catch(error => console.error('Error fetching directions:', error));
    };

    return (
        <section className="dark:bg-gray-50 mt-5 dark:text-gray-800">
            <div className="container mx-auto p-4">
                <div className="w-full">
                    <div className="w-full h-96 rounded-lg">
                    <ReactMapGL
                        {...viewport}
                        mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        onMove={evt => handleViewportChange(evt.viewState)}
                    >
                            <Marker latitude={latitude} longitude={longitude}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-7" style={{ color: 'red' }} />
                            </Marker>
                            
                            {route && (
                                <Source id="route" type="geojson" data={route}>
                                    <Layer
                                        id="route"
                                        type="line"
                                        paint={{
                                            'line-color': '#064749',
                                            'line-width': 4
                                        }}
                                    />
                                </Source>
                            )}
                            <NavigationControl style={{ right: 10, top: 10 }} />
                            <GeolocateControl
                                position="top-left"
                                trackUserLocation={true}
                                onGeolocate={handleGeolocate}
                            />
                        </ReactMapGL>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpaceMap;
