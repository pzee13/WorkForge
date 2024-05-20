import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../slices/space'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
    const dispatch = useDispatch();
  
    const ctrl = new MapBoxGeocoder({
      accessToken: "pk.eyJ1IjoiYXN3aW5wYzkiLCJhIjoiY2x3OTltN3ptMDFjYTJrbzNwZHl5d25reSJ9.L6usilSYLLdBbEm6fbLskg",
      marker: false,
      collapsed: true,
    }); 
  
    useControl(() => ctrl);
  
    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates;
      dispatch(setLocation({ latitude: coords[1], longitude: coords[0] }));
    });
  
    return null;
  };
  
  export default Geocoder;
