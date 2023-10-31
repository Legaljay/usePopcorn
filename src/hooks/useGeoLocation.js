import { useState } from "react";


export function useGeolocation({loadKey, initialError}) {
    const [isLoading, setIsLoading] = useState(loadKey);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(initialError);


    function getPosition() {

        if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
        (pos) => {
            setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
            });
            setIsLoading(false);
        },
        (error) => {
            setError(error.message);
            setIsLoading(false);
        }
        );
    }
    return {isLoading, position, error, getPosition}
}