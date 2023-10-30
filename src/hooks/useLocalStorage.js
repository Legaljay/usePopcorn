import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key ){
    const [value, setValue] = useState(
        function() {
        const storedValue = localStorage.getItem('key');
        return JSON.parse(storedValue);
      });
    useEffect(() => {
    localStorage.setItem('key', JSON.stringify(value)) //notice here we did not need to spread the watched state because the useeffect is dependeent on watched itself, so for every change in the watched state it is being updated 
    },[value, key])
    return [value, setValue]
}