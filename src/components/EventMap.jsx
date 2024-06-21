import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

const EventMap = ({ address }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [mapCenter, setMapCenter] = useState({ lat: -34.397, lng: 150.644 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && address) {
      const geocodeAddress = async (address) => {
        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            setMapCenter({ lat, lng });
          } else {
            setError('Geocode was not successful for the following reason: ' + data.status);
          }
        } catch (error) {
          setError(error.message);
          console.error('Geocode error:', error);
        }
      };

      geocodeAddress(address);
    }
  }, [isLoaded, address]);

  if (!isLoaded) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={mapCenter}
      zoom={15}
    >
      <Marker position={mapCenter} />
    </GoogleMap>
  );
};

export default EventMap;