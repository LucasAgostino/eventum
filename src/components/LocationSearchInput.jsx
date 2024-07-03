import React, { useState, useEffect, useRef } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

const LocationSearchInput = ({ onSelect }) => {
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = async address => {
    setAddress(address);
    setShowSuggestions(false);
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      onSelect({ address, ...latLng });
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab' && address) {
      handleSelect(address);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [address]);

  if (loadError) {
    return <div>Error cargando Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{ componentRestrictions: { country: 'AR' } }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder: 'Ingrese la ubicación del evento',
              className: 'location-search-input w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600',
              ref: inputRef,
              onClick: () => setShowSuggestions(true),
              onBlur: () => setShowSuggestions(false),
            })}
            className="w-full px-3 py-2 border border-violet-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-900"
          />
          {showSuggestions && (
            <div className="autocomplete-dropdown-container absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
              {loading && <div className="loading p-2 text-gray-500">Cargando...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active bg-blue-500 text-white'
                  : 'suggestion-item bg-white text-black';
                const key = suggestion.placeId || suggestion.description;
                return (
                  <div
                    key={key}
                    {...getSuggestionItemProps(suggestion, {
                      className: `cursor-pointer p-2 ${className}`,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
