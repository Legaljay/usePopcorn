import { useState,useEffect } from "react"

const KEY = `f230fc15`;
export function useMovies(query, callback, tempQuery){
    const [movies, setMovies] = useState()
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()
    

    useEffect(() => {
        // fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=interstellar`)
        // .then((res)=> res.json())
        // .then((data)=> setMovies(data.Search))
        callback?.()
        async function fetchMovies(){
          try {
            setIsLoading(true)
            setError('')
            const res = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query ? query : tempQuery}`)
    
            if(!res.ok)
              throw new Error('Something went wrong with fetching movies');
    
            const data = await res.json()
            if (data.Response === 'False') throw new Error('Movie not found')
            setMovies(data.Search)
           
          } catch(err){
            console.error(err.message)
            setError(err.message)
          } finally{ //this block of code will always be executed at the very end
            setIsLoading(false)
          }
    
          if(query.length < 3){ 
            // setMovies([]);
            setError('')
            return
          }
        }
        fetchMovies();
      }, [query])

    return {movies, isLoading, error}
}