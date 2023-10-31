import { useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";



export default function GeoLocation() {
//   const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(0);
//   const [position, setPosition] = useState({});
//   const [error, setError] = useState(null);

  const {isLoading, position, error, getPosition} = useGeolocation(false, null)
  const { lat, lng } = position;

//   function getPosition() {
//     setCountClicks((count) => count + 1);

//     if (!navigator.geolocation)
//       return setError("Your browser does not support geolocation");

//     setIsLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude
//         });
//         setIsLoading(false);
//       },
//       (error) => {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     );
//   }
function handleCount(){
  setCountClicks((count) => count + 1);
  getPosition?.()
}

  return (
    <div>
      <button onClick={handleCount} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
