import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // add other libraries if needed

const GoogleMapsLoader = ({ children }) => (
  <LoadScript
    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    libraries={libraries}
    loadingElement={<p>Loading Maps...</p>}
  >
    {children}
  </LoadScript>
);

export default GoogleMapsLoader;
