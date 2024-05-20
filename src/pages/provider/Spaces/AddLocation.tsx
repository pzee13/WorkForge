import Navbar from "../../../component/provider/navbar/Navbar";
import { Box } from "@mui/material";
import { useEffect, useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import SpaceProgress from "./SpaceProgress";
import Geocoder from "./Geocoder";
import { setLocation } from "../../../slices/space";
import Footer  from '../../../component/provider/footer/Footer'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg' });

export function AddLocation(){
    const dispatch = useDispatch();
  const { latitude, longitude } = useSelector((state: RootState) => state.location);
  const mapRef = useRef<any>(null);
  const navigate = useNavigate()
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (latitude === 0 && longitude === 0) {
      fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((data) => {
          mapRef.current?.flyTo({ center: [data.longitude, data.latitude] });
          dispatch(setLocation({ latitude: data.latitude, longitude: data.longitude }));
          reverseGeocode(data.latitude, data.longitude);
        });
    }else {
      reverseGeocode(latitude, longitude);
    }
  }, [latitude, longitude, dispatch]);

  const handleDragEnd = (e: any) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    dispatch(setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng }));
    reverseGeocode(lat, lng);
  };

  const handleGeolocate = (e: any) => {
    const lat = e.coords.latitude;
    const lng = e.coords.longitude;
    dispatch(setLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude }));
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
          setAddress(match.features[0].place_name);
        } else {
          setAddress('Address not found');
        }
      })
      .catch(() => setAddress('Error retrieving address'));
  };

  console.log("adress",address)

    return(
        <>
        <Navbar />
        <SpaceProgress/>
        <div className="pt-10 md:px-20 px-5">
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg"
            initialViewState={{
              longitude,
              latitude,
              zoom: 8,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Marker
              latitude={latitude}
              longitude={longitude}
              draggable
              onDragEnd={handleDragEnd}
            />
            <NavigationControl position="bottom-right" />
            <GeolocateControl
              position="top-left"
              trackUserLocation
              onGeolocate={handleGeolocate}
            />
            <Geocoder/>
          </ReactMapGL>
        </Box>
        <div className="flex justify-around p-5">
        <button className="text-gray-400 font-bold text-xl">Back</button>
        <button onClick={()=>navigate('/provider/addSpaceDetails')} className="text-green-600 font-bold text-xl">Next</button>
        </div>
      </div>
        <Footer />
        </>
    )
}