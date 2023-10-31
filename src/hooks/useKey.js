import { useEffect, useRef } from "react";

export function useKey(key, action){
    //we usually pass initial value as null if we are trying to use DOM 
    useEffect(() => { //we need to use an effect in order to use a ref that contains a DOM element liket this one  
    // console.log(inputEl.current)
    function callback(e){
    
    if (e.code.toLowerCase() === key.toLowerCase()){
        action();
    }

    }
    document.addEventListener('keydown', callback)
    return () => {
    document.addEventListener('keydown', callback)
    }

    },[action, key])
    return []
}