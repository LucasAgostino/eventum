import React, { useState } from 'react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

const LocationSearchInput = ({ onSelect }) => {
  const [address, setAddress] = useState('');
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = async address => {
    setAddress(address);
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      onSelect({ address, ...latLng });
    } catch (error) {
      console.error('Error', error);
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Ingrese ubicacion',
              className: 'location-search-input w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const key = suggestion.placeId || suggestion.description;
              return (
                <div
                  key={key}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
