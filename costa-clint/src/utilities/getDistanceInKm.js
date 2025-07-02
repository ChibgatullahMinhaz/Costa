const getDistanceInKm = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceText = response.rows[0].elements[0].distance.text; // e.g. "12.3 km"
          const distanceValue = response.rows[0].elements[0].distance.value; // in meters
          resolve(distanceValue / 1000); // return in kilometers
        } else {
          reject("Distance fetch failed: " + status);
        }
      }
    );
  });
};
