import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useGeocodeAddress(address) {
    const [coordinates, setCoordinates] = useState(null);
  
    useEffect(() => {
      const geocodeAddress = async () => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCyClGli0gh0OB5AnwKUpisdiz3PQLUzdg`
          );
          const { lat, lng } = response.data.results[0].geometry.location;
          setCoordinates({ lat, lng });
          console.log(coordinates)
        } catch (error) {
          console.error(error);
        }
      };
  
      geocodeAddress();
    }, [address]);
  
    return coordinates;
  }

  function Map(props) {
    const { eventLoc } = props;
    const address = eventLoc ? `${eventLoc}, Ireland` : null;
    console.log(address)
    const coordinates = useGeocodeAddress(address);
    
    if (!eventLoc || !coordinates) {
      return 'Loading...';
    }

  
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap center={coordinates} zoom={10} mapContainerStyle={{width: "300px", height: "300px"}}>
          <MarkerF position={coordinates} />
        </GoogleMap>
      </div>
    );
  }

export default Map;