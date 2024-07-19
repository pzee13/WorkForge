// // src/pages/provider/Spaces/AddLocation.tsx
// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ReactMapGL, { Marker, NavigationControl, GeolocateControl,MapRef } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { MapMouseEvent } from 'mapbox-gl'
// import { RootState } from '../../../app/store';
// import { useNavigate } from 'react-router-dom';
// import SpaceProgress from './SpaceProgress';
// import Geocoder from './Geocoder';
// import { setLocation } from '../../../slices/space';
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import { setAddress } from '../../../slices/address';

// const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg' });

// const extractAddressComponents = (address: string) => {
//     const addressComponents = address.split(',').map(component => component.trim());
//     if (addressComponents.length < 4) {
//         throw new Error('Address does not contain enough components');
//     }
//     const country = addressComponents[addressComponents.length - 1];
//     const state = addressComponents[addressComponents.length - 2];
//     const district = addressComponents[addressComponents.length - 3];
//     const areaName = addressComponents[addressComponents.length - 4];
//     return { areaName, district, state, country };
// };

// interface Coordinates {
//     latitude: number;
//     longitude: number;
// }

// interface GeolocationEvent {
//     coords: Coordinates;
// }

// const AddLocation: React.FC = () => {
//     const dispatch = useDispatch();
//     const { latitude, longitude } = useSelector((state: RootState) => state.location);
//     const mapRef = useRef<MapRef>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (latitude === 0 && longitude === 0) {
//             fetch('https://ipapi.co/json')
//                 .then(response => response.json())
//                 .then(data => {
//                     mapRef.current?.flyTo({ center: [data.longitude, data.latitude] });
//                     dispatch(setLocation({ latitude: data.latitude, longitude: data.longitude }));
//                     reverseGeocode(data.latitude, data.longitude);
//                 });
//         } else {
//             reverseGeocode(latitude, longitude);
//         }
//     }, [latitude, longitude, dispatch]);

//     const handleDragEnd = (e:MapMouseEvent) => {
//         const lat = e.lngLat.lat;
//         const lng = e.lngLat.lng;
//         dispatch(setLocation({ latitude: lat, longitude: lng }));
//         reverseGeocode(lat, lng);
//     };

//     const handleGeolocate = (e: GeolocationEvent) => {
//         const lat = e.coords.latitude;
//         const lng = e.coords.longitude;
//         dispatch(setLocation({ latitude: lat, longitude: lng }));
//         reverseGeocode(lat, lng);
//     };

//     const reverseGeocode = (lat: number, lng: number) => {
//         geocodingClient.reverseGeocode({
//             query: [lng, lat],
//             types: ['address']
//         })
//             .send()
//             .then(response => {
//                 const match = response.body;
//                 if (match.features && match.features.length > 0) {
//                     const placeName = match.features[0].place_name;
//                     const { areaName, district, state, country } = extractAddressComponents(placeName);
//                     dispatch(setAddress({ areaName, district, state, country }));
//                 }
//             });
//     };

//     const handleNext = () => {
//         navigate('/provider/addSpace/addSpaceDetails');
//     };

//     return (
//         <>
//             <SpaceProgress />
//             <div className="pt-10 md:px-20 px-5">
//                 <div style={{ height: 400, position: 'relative' }}>
//                     <ReactMapGL
//                         ref={mapRef}
//                         mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
//                         initialViewState={{ longitude, latitude, zoom: 8 }}
//                         mapStyle="mapbox://styles/mapbox/streets-v11"
//                     >
//                         <Marker latitude={latitude} longitude={longitude} draggable onDragEnd={handleDragEnd} />
//                         <NavigationControl position="bottom-right" />
//                         <GeolocateControl position="top-left" trackUserLocation onGeolocate={handleGeolocate} />
//                         <Geocoder />
//                     </ReactMapGL>
//                 </div>
//                 <div className="flex justify-around p-5">
//                     <button className="text-gray-400 font-bold text-xl">Back</button>
//                     <button onClick={handleNext} className="text-green-600 font-bold text-xl">Next</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddLocation;


// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ReactMapGL, { Marker, NavigationControl, GeolocateControl, MapRef } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { MarkerDragEvent } from 'mapbox-gl';
// import { RootState } from '../../../app/store';
// import { useNavigate } from 'react-router-dom';
// import SpaceProgress from './SpaceProgress';
// import Geocoder from './Geocoder';
// import { setLocation } from '../../../slices/space';
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import { setAddress } from '../../../slices/address';

// const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg' });

// const extractAddressComponents = (address: string) => {
//     const addressComponents = address.split(',').map(component => component.trim());
//     if (addressComponents.length < 4) {
//         throw new Error('Address does not contain enough components');
//     }
//     const country = addressComponents[addressComponents.length - 1];
//     const state = addressComponents[addressComponents.length - 2];
//     const district = addressComponents[addressComponents.length - 3];
//     const areaName = addressComponents[addressComponents.length - 4];
//     return { areaName, district, state, country };
// };

// interface Coordinates {
//     latitude: number;
//     longitude: number;
// }

// interface GeolocationEvent {
//     coords: Coordinates;
// }

// const AddLocation: React.FC = () => {
//     const dispatch = useDispatch();
//     const { latitude, longitude } = useSelector((state: RootState) => state.location);
//     const mapRef = useRef<MapRef>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (latitude === 0 && longitude === 0) {
//             fetch('https://ipapi.co/json')
//                 .then(response => response.json())
//                 .then(data => {
//                     mapRef.current?.flyTo({ center: [data.longitude, data.latitude] });
//                     dispatch(setLocation({ latitude: data.latitude, longitude: data.longitude }));
//                     reverseGeocode(data.latitude, data.longitude);
//                 });
//         } else {
//             reverseGeocode(latitude, longitude);
//         }
//     }, [latitude, longitude, dispatch]);

//     const handleDragEnd = (e: MarkerDragEvent) => {
//         const lat = e.lngLat.lat;
//         const lng = e.lngLat.lng;
//         dispatch(setLocation({ latitude: lat, longitude: lng }));
//         reverseGeocode(lat, lng);
//     };

//     const handleGeolocate = (e: GeolocationEvent) => {
//         const lat = e.coords.latitude;
//         const lng = e.coords.longitude;
//         dispatch(setLocation({ latitude: lat, longitude: lng }));
//         reverseGeocode(lat, lng);
//     };

//     const reverseGeocode = (lat: number, lng: number) => {
//         geocodingClient.reverseGeocode({
//             query: [lng, lat],
//             types: ['address']
//         })
//             .send()
//             .then(response => {
//                 const match = response.body;
//                 if (match.features && match.features.length > 0) {
//                     const placeName = match.features[0].place_name;
//                     const { areaName, district, state, country } = extractAddressComponents(placeName);
//                     dispatch(setAddress({ areaName, district, state, country }));
//                 }
//             });
//     };

//     const handleNext = () => {
//         navigate('/provider/addSpace/addSpaceDetails');
//     };

//     return (
//         <>
//             <SpaceProgress />
//             <div className="pt-10 md:px-20 px-5">
//                 <div style={{ height: 400, position: 'relative' }}>
//                     <ReactMapGL
//                         ref={mapRef}
//                         mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
//                         initialViewState={{ longitude, latitude, zoom: 8 }}
//                         mapStyle="mapbox://styles/mapbox/streets-v11"
//                     >
//                         <Marker latitude={latitude} longitude={longitude} draggable onDragEnd={handleDragEnd} />
//                         <NavigationControl position="bottom-right" />
//                         <GeolocateControl position="top-left" trackUserLocation onGeolocate={handleGeolocate} />
//                         <Geocoder />
//                     </ReactMapGL>
//                 </div>
//                 <div className="flex justify-around p-5">
//                     <button className="text-gray-400 font-bold text-xl">Back</button>
//                     <button onClick={handleNext} className="text-green-600 font-bold text-xl">Next</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddLocation;


import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootState } from '../../../app/store';
import { useNavigate } from 'react-router-dom';
import SpaceProgress from './SpaceProgress';
import Geocoder from './Geocoder';
import { setLocation } from '../../../slices/space';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { setAddress } from '../../../slices/address';

const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg' });

const extractAddressComponents = (address: string) => {
    const addressComponents = address.split(',').map(component => component.trim());
    if (addressComponents.length < 4) {
        throw new Error('Address does not contain enough components');
    }
    const country = addressComponents[addressComponents.length - 1];
    const state = addressComponents[addressComponents.length - 2];
    const district = addressComponents[addressComponents.length - 3];
    const areaName = addressComponents[addressComponents.length - 4];
    return { areaName, district, state, country };
};

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface GeolocationEvent {
    coords: Coordinates;
}

interface CustomMarkerDragEvent {
    lngLat: {
        lat: number;
        lng: number;
    };
}

const AddLocation: React.FC = () => {
    const dispatch = useDispatch();
    const { latitude, longitude } = useSelector((state: RootState) => state.location);
    const mapRef = useRef<MapRef>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (latitude === 0 && longitude === 0) {
            fetch('https://ipapi.co/json')
                .then(response => response.json())
                .then(data => {
                    mapRef.current?.flyTo({ center: [data.longitude, data.latitude] });
                    dispatch(setLocation({ latitude: data.latitude, longitude: data.longitude }));
                    reverseGeocode(data.latitude, data.longitude);
                });
        } else {
            reverseGeocode(latitude, longitude);
        }
    }, [latitude, longitude, dispatch]);

    const handleDragEnd = (e: CustomMarkerDragEvent) => {
        const lat = e.lngLat.lat;
        const lng = e.lngLat.lng;
        dispatch(setLocation({ latitude: lat, longitude: lng }));
        reverseGeocode(lat, lng);
    };

    const handleGeolocate = (e: GeolocationEvent) => {
        const lat = e.coords.latitude;
        const lng = e.coords.longitude;
        dispatch(setLocation({ latitude: lat, longitude: lng }));
        reverseGeocode(lat, lng);
    };

    const reverseGeocode = (lat: number, lng: number) => {
        geocodingClient.reverseGeocode({
            query: [lng, lat],
            types: ['address']
        })
            .send()
            .then(response => {
                const match = response.body;
                if (match.features && match.features.length > 0) {
                    const placeName = match.features[0].place_name;
                    const { areaName, district, state, country } = extractAddressComponents(placeName);
                    dispatch(setAddress({ areaName, district, state, country }));
                }
            });
    };

    const handleNext = () => {
        navigate('/provider/addSpace/addSpaceDetails');
    };

    return (
        <>
            <SpaceProgress />
            <div className="pt-10 md:px-20 px-5">
                <div style={{ height: 400, position: 'relative' }}>
                    <ReactMapGL
                        ref={mapRef}
                        mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
                        initialViewState={{ longitude, latitude, zoom: 8 }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                    >
                        <Marker latitude={latitude} longitude={longitude} draggable onDragEnd={handleDragEnd} />
                        <NavigationControl position="bottom-right" />
                        <GeolocateControl position="top-left" trackUserLocation onGeolocate={handleGeolocate} />
                        <Geocoder />
                    </ReactMapGL>
                </div>
                <div className="flex justify-around p-5">
                    <button className="text-gray-400 font-bold text-xl">Back</button>
                    <button onClick={handleNext} className="text-green-600 font-bold text-xl">Next</button>
                </div>
            </div>
        </>
    );
};

export default AddLocation;
