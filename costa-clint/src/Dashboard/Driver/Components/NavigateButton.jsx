import React from 'react';

const NavigateButton = ({ destinationLat, destinationLng }) => {
  const handleNavigate = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <button onClick={handleNavigate}>
      Navigate via Google Maps
    </button>
  );
};

export default NavigateButton;
