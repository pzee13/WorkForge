// import  { SetStateAction, useState } from 'react';
// import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Source, Layer } from 'react-map-gl';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


// interface WorkSpaceMap{
//     availableSpaces:number;
//     areaName:string;
//     district:string;
//     state:string;
//     country:string;
//     buildingName:string;
//     floor:string;
//     latitude:number,
//     longitude:number,
// }

// const SpaceDetailsMap:React.FC<WorkSpaceMap> = ({  availableSpaces, areaName, district, state, country, buildingName, floor, latitude, longitude }) => {
//     const [viewport, setViewport] = useState({
//         latitude: latitude,
//         longitude: longitude,
//         zoom: 8,
//         width: '100%',
//         height: '400px'
//     });

//     const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
//     const [route, setRoute] = useState(null);
//     const [distance, setDistance] = useState(null);

//     const handleViewportChange = (newViewport: SetStateAction<{ latitude: number; longitude: number; zoom: number; width: string; height: string; }>) => {
//         setViewport(newViewport);
//     };

//     const handleGeolocate = (e: { coords: { latitude: number; longitude: number; }; }) => {
//         const newLatitude = e.coords.latitude;
//         const newLongitude = e.coords.longitude;
//         setUserLocation({ latitude: newLatitude, longitude: newLongitude });
//         setViewport({
//             ...viewport,
//             latitude: newLatitude,
//             longitude: newLongitude,
//             zoom: 12 // Adjust the zoom level when the user's location is found
//         });
//         fetchDirections(newLatitude, newLongitude);
//     };

//     const fetchDirections = (startLat:number, startLng:number) => {
//         const accessToken:string = "pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
//         const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${longitude},${latitude}?steps=true&geometries=geojson&access_token=${accessToken}`;
        
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.routes && data.routes.length > 0) {
//                     setRoute(data.routes[0].geometry);
//                     setDistance(data.routes[0].distance);
//                 }
//             })
//             .catch(error => console.error('Error fetching directions:', error));
//     };


//     // const customMapStyle = {
//     //     version: 8,
//     //     sources: {
//     //         'mapbox-streets': {
//     //             type: 'vector',
//     //             url: 'mapbox://mapbox.mapbox-streets-v8'
//     //         }
//     //     },
//     //     layers: [
//     //         {
//     //             id: 'background',
//     //             type: 'background',
//     //             paint: {
//     //                 'background-color': '#f8fef7' // Background color for the entire map
//     //             }
//     //         },
//     //         {
//     //             id: 'water',
//     //             source: 'mapbox-streets',
//     //             'source-layer': 'water',
//     //             type: 'fill',
//     //             paint: {
//     //                 'fill-color': '#e0f7fa' // Very very light blue for water
//     //             }
//     //         },
//     //         {
//     //             id: 'land',
//     //             source: 'mapbox-streets',
//     //             'source-layer': 'land',
//     //             type: 'fill',
//     //             paint: {
//     //                 'fill-color': '#b0b0b0' // Medium gray for land
//     //             }
//     //         },
//     //         {
//     //             id: 'buildings',
//     //             source: 'mapbox-streets',
//     //             'source-layer': 'building',
//     //             type: 'fill',
//     //             paint: {
//     //                 'fill-color': '#064749' // Dark green for buildings
//     //             }
//     //         },
//     //         {
//     //             id: 'roads',
//     //             source: 'mapbox-streets',
//     //             'source-layer': 'road',
//     //             type: 'line',
//     //             paint: {
//     //                 'line-color': '#86efac', // Secondary color for roads
//     //                 'line-width': 2
//     //             }
//     //         }
//     //     ]
//     // };
    
//     const distanceInKm = distance ? (distance / 1000).toFixed(2) : null;

//     return (
//         <section className="dark:bg-gray-50 dark:text-gray-800">
//         <div className="container flex flex-col mx-auto lg:flex-row">
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 dark:text-customGreen font-extrabold order-2 lg:order-1">
//                 <div className="flex flex-col justify-between h-full px-6 py-8 space-y-6 dark:bg-gray-100 sm:p-8 lg:p-24 ">
//                     <div className="space-y-8">
//                         <h1 className="text-4xl font-extrabold text-customGreen text-center">Details</h1>
//                         <p className="leading-snug">Available Spaces: {availableSpaces}</p>
//                         <p>Area Name: {areaName}</p>
//                         <p>District: {district}</p>
//                         <p>State: {state}</p>
//                         <p>Country: {country}</p>
//                         <p>Building: {buildingName}, Floor: {floor}</p>
//                         {distanceInKm && <p>Distance: {distanceInKm} km</p>}
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 order-1 lg:order-2">
//                 <div className="w-full h-full dark:bg-secondGreen lg:rounded-lg lg:rounded-l-none">
//                     <ReactMapGL
//                         {...viewport}
//                         mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
//                         mapStyle="mapbox://styles/mapbox/streets-v12"
//                         onMove={evt => handleViewportChange(evt.viewState)}
//                     >
//                         <Marker latitude={latitude} longitude={longitude}>
//                             <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-7" style={{ color: 'red', border: '2px  #003e29', borderRadius: '50%' }} />
//                         </Marker>
//                         {userLocation.latitude && userLocation.longitude && (
//                             <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
//                                 <div style={{
//                                     background: 'green',
//                                     height: '20px',
//                                     width: '20px',
//                                     borderRadius: '50%',
//                                     border: '5px solid white'
//                                 }}></div>
//                             </Marker>
//                         )}
//                         {route && (
//                             <Source id="route" type="geojson" data={route}>
//                                 <Layer
//                                     id="route"
//                                     type="line"
//                                     paint={{
//                                         'line-color': '#064749',
//                                         'line-width': 4
//                                     }}
//                                 />
//                             </Source>
//                         )}
//                         <NavigationControl style={{ right: 10, top: 10 }} />
//                         <GeolocateControl
//                             position="top-left"
//                             trackUserLocation={true}
//                             onGeolocate={handleGeolocate}
//                         />
//                     </ReactMapGL>
//                 </div>
//             </div>
//         </div>
//     </section>
//     );
// };

// export default SpaceDetailsMap;


import {  useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Source, Layer, ViewState } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface WorkSpaceMap {
    availableSpaces: number;
    areaName: string;
    district: string;
    state: string;
    country: string;
    buildingName: string;
    floor: string;
    latitude: number;
    longitude: number;
}

const SpaceDetailsMap: React.FC<WorkSpaceMap> = ({
    availableSpaces,
    areaName,
    district,
    state,
    country,
    buildingName,
    floor,
    latitude,
    longitude,
}) => {
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 8,
        width: '100%',
        height: '400px',
    });

    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
    const [route, setRoute] = useState(null);
    const [distance, setDistance] = useState(null);

    const handleViewportChange = (newViewport: ViewState) => {
        setViewport((prevViewport) => ({
            ...prevViewport,
            latitude: newViewport.latitude,
            longitude: newViewport.longitude,
            zoom: newViewport.zoom,
        }));
    };

    const handleGeolocate = (e: GeolocationPosition) => {
        const newLatitude = e.coords.latitude;
        const newLongitude = e.coords.longitude;
        setUserLocation({ latitude: newLatitude, longitude: newLongitude });
        setViewport({
            ...viewport,
            latitude: newLatitude,
            longitude: newLongitude,
            zoom: 12, // Adjust the zoom level when the user's location is found
        });
        fetchDirections(newLatitude, newLongitude);
    };

    const fetchDirections = (startLat: number, startLng: number) => {
        const accessToken: string = "pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg";
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${longitude},${latitude}?steps=true&geometries=geojson&access_token=${accessToken}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.routes && data.routes.length > 0) {
                    setRoute(data.routes[0].geometry);
                    setDistance(data.routes[0].distance);
                }
            })
            .catch((error) => console.error('Error fetching directions:', error));
    };

    const distanceInKm = distance ? (distance / 1000).toFixed(2) : null;

    return (
        <section className="dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col mx-auto lg:flex-row">
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 dark:text-customGreen font-extrabold order-2 lg:order-1">
                    <div className="flex flex-col justify-between h-full px-6 py-8 space-y-6 dark:bg-gray-100 sm:p-8 lg:p-24">
                        <div className="space-y-8">
                            <h1 className="text-4xl font-extrabold text-customGreen text-center">Details</h1>
                            <p className="leading-snug">Available Spaces: {availableSpaces}</p>
                            <p>Area Name: {areaName}</p>
                            <p>District: {district}</p>
                            <p>State: {state}</p>
                            <p>Country: {country}</p>
                            <p>Building: {buildingName}, Floor: {floor}</p>
                            {distanceInKm && <p>Distance: {distanceInKm} km</p>}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 order-1 lg:order-2">
                    <div className="w-full h-full dark:bg-secondGreen lg:rounded-lg lg:rounded-l-none">
                        <ReactMapGL
                            {...viewport}
                            mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
                            mapStyle="mapbox://styles/mapbox/streets-v12"
                            onMove={(evt) => handleViewportChange(evt.viewState)}
                        >
                            <Marker latitude={latitude} longitude={longitude}>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className="mr-2 h-7"
                                    style={{ color: 'red', border: '2px  #003e29', borderRadius: '50%' }}
                                />
                            </Marker>
                            {userLocation.latitude && userLocation.longitude && (
                                <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
                                    <div
                                        style={{
                                            background: 'green',
                                            height: '20px',
                                            width: '20px',
                                            borderRadius: '50%',
                                            border: '5px solid white',
                                        }}
                                    ></div>
                                </Marker>
                            )}
                            {route && (
                                <Source id="route" type="geojson" data={route}>
                                    <Layer
                                        id="route"
                                        type="line"
                                        paint={{
                                            'line-color': '#064749',
                                            'line-width': 4,
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

export default SpaceDetailsMap;
