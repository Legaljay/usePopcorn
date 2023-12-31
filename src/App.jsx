import { useEffect, useRef, useState } from "react";
import StarRating from "./components/StarRating";
import {RiseLoader} from 'react-spinners'
import './App.css'
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorage";
import { useKey } from "./hooks/useKey";
import GeoLocation from "./components/GeoLocation";
// import StarRating from './components/StarRating'

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const KEY = `f230fc15`;

  export default function App() {
    // const [movies, setMovies] = useState();
    // // const [watched, setWatched] = useState(tempWatchedData);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState('')
    
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null)
    // const [watched, setWatched] = useState(
    //   function() {
    //   const storedValue = localStorage.getItem('watched');
    //   return JSON.parse(storedValue);
    // });
    const tempQuery ='interstellar'
    const [watched, setWatched] = useLocalStorageState([], 'watched')
    const {movies,isLoading, error} = useMovies(query, handleCloseMovie, tempQuery)
  
  

    function handleSelectMovie(id){
      setSelectedId(previd => id === previd? null : id)
    }

    function handleCloseMovie(){
      setSelectedId(null)
    }

    function handleAddWatched(movie){
      setWatched(watched => [...watched, movie]);
      //localStorage.setItem('watched', JSON.stringify([...watched, movie])); //storing the data in local storage, we needed to convert from watched stale state the need for the spreading
    }

    function handleDeleteWatched(id){
      setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
    }

    // useEffect(() => {
    //   localStorage.setItem('watched', JSON.stringify(watched)) //notice here we did not need to spread the watched state because the useeffect is dependeent on watched itself, so for every change in the watched state it is being updated 
    // },[watched])
  
    // useEffect(() => {
    //   // fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=interstellar`)
    //   // .then((res)=> res.json())
    //   // .then((data)=> setMovies(data.Search))
  
    //   async function fetchMovies(){
    //     try {
    //       setIsLoading(true)
    //       setError('')
    //       const res = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query ? query : tempQuery}`)
  
    //       if(!res.ok)
    //         throw new Error('Something went wrong with fetching movies');
  
    //       const data = await res.json()
    //       if (data.Response === 'False') throw new Error('Movie not found')
    //       setMovies(data.Search)
         
    //     } catch(err){
    //       console.error(err.message)
    //       setError(err.message)
    //     } finally{ //this block of code will always be executed at the very end
    //       setIsLoading(false)
    //     }
  
    //     if(query.length < 3){ 
    //       // setMovies([]);
    //       setError('')
    //       return
    //     }
    //   }
    //   fetchMovies();
    // }, [query])
  
    // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    //   .then((res)=> res.json())
    //   .then((data)=> console.log(data))
  
    return (
      <>
        
        <NavBar>
          <Logo />
          <Search query={query} setQuery={setQuery}/>
          <SearchResult movies={movies}/>
        </NavBar>
        <Main>
          {/* <GeoLocation/> */}
          <Box>
            {/* {
              isLoading? <Loader /> : <MovieList movies={movies}/>
            } */}
            {
              isLoading &&  <Loader /> 
            }
            {
              !isLoading && !error  && 
              <MovieList 
                movies={movies} 
                onSelectMovie={handleSelectMovie}
              />
            }
            {error && <ErrorMessage message={error}/>}
          </Box>
          <Box>
            {
              selectedId ? (
                <MovieDetails 
                  selectedId={selectedId} 
                  onCloseMovie={handleCloseMovie} 
                  onAddWatched={handleAddWatched}
                  watched={watched}
                />
                ) : (
                <>
                  <WatchedSummary watched={watched}/>
                  <WatchedMovieList  watched={watched} onDeleteWatched={handleDeleteWatched}/>
                
                </>
                )
            }
          </Box>
        </Main>
        {/* <StarRating /> */}
      </>
    );
  }

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}){
  const [movie,setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState()
  const countRef = useRef(0)

  useEffect(() => {
    if (userRating) countRef.current += 1
  },[userRating])

  const isWatched =  watched?.map(movie => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched?.find(movie => movie.imdbID === selectedId)?.userRating

  const {
    Title: title, 
    Year: year, 
    Poster: poster, 
    Runtime: runtime, 
    imdbRating, 
    Plot: plot, 
    Released: released, 
    Actors: actors, 
    Director: director, 
    Genre: genre 
  } = movie;

  useEffect(()=>{
    async function getMovieDetails(){
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${selectedId}`)
      const data = await res.json();
      setIsLoading(false)
      setMovie(data)
    }
    getMovieDetails();
  },[selectedId])

  function handleAdd(){
    const newWatchedMovie = {
      imdbID: selectedId,
      title, 
      year, 
      poster, 
      imdbRating: Number(imdbRating), 
      runtime: Number(runtime.split(" ").at(0)), 
      userRating,
      countRatingDeccisions: countRef.current,
     
    }
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey('Escape', onCloseMovie);

  return (
    <div className="details">
      {isLoading? <Loader /> : (
      <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
          <img src={poster} alt={title}/>
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p>{genre}</p>
            <p><span>&star;</span>{imdbRating} IMDb rating</p>
          </div>
        </header>
        <section>
          <div className="rating">
            {
            !isWatched ? (
              <>
              <StarRating 
                maxRating={10} 
                size={36} 
                onSetRating={setUserRating}
              />
              {
                userRating > 0 && 
                (<button 
                    className="btn-add" 
                    onClick={handleAdd}
                  >+ Add to list
                  </button>
                )}
              </>
              ): (<p>You rated this movie {watchedUserRating}<span>⭐️</span></p>)}
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        {/* {selectedId} */}
      </>
      )}
    </div>
  )
}

function NavBar ({children}){ //structural component
  
  return (
      <nav className="nav-bar">
        {children}
      </nav>
)}

function Logo(){ //stateless component
  return(
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search ({query, setQuery}){ //statefull component
// useEffect(() => {
//   const el = document.querySelector('.search')
//   console.log(el)
//   el.focus()
// }, [])
const inputEl = useRef(null) //we usually pass initial value as null if we are trying to use DOM 
// useEffect(() => { //we need to use an effect in order to use a ref that contains a DOM element liket this one  
//   // console.log(inputEl.current)
//   function callback(e){
//     if (document.activeElement === inputEl.current){//checks for the current active element that is being focused
//       return;
//     }
//     if (e.code === 'Enter'){
//       inputEl.current.focus()
//       setQuery('')
//     }
    
//   }
//   document.addEventListener('keydown', callback)
//   return () => {
//     document.addEventListener('keydown', callback)
//   }
  
// },[setQuery])

  useKey('Enter', () => {
    if (document.activeElement === inputEl.current){//checks for the current active element that is being focused
      return;
    }
    inputEl.current.focus()
    setQuery('')
  })

  return(
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

function SearchResult({movies}){ //stateless component
  return(
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  )
}

function Main ({children}) { //structural component

  return(
    <main className="main">
        {children}
    </main>
  )
}

function Box ({children}){//stateful component
  const [isOpen, setIsOpen] = useState(true);
  return(
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
  )
}

function MovieList({movies, onSelectMovie}) {
  
  return(
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}/>
      ))}
    </ul>
  )
}

function Movie({movie, onSelectMovie}){

  return(
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}
/*function WatchedBox (){
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return(
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMovieList  watched={watched}/>
                
            </>
          )}
        </div>
  )
}*/

function WatchedSummary({watched}){
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating?.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating?.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovieList({watched, onDeleteWatched}){
  return(
    <ul className="list">
                {watched?.map((movie) => (
                    <li key={movie.imdbID}>
                      <img src={movie.poster} alt={`${movie.title} poster`} />
                      <h3>{movie.title}</h3>
                      <div>
                        <p>
                          <span>⭐️</span>
                          <span>{movie.imdbRating}</span>
                        </p>
                        <p>
                          <span>🌟</span>
                          <span>{movie.userRating}</span>
                        </p>
                        <p>
                          <span>⏳</span>
                          <span>{movie.runtime} min</span>
                        </p>
                        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
                      </div>
                    </li>
                    ))
                  }
      </ul>
  )
}

function Loader() {
  return (
    // <p className="loader">Loading...</p>
    <div className="w-full h-screen grid place-items-center">
      <RiseLoader color="#6741d9" size='20px' width='100%' height='100%'/>
    </div>
    )
}


function ErrorMessage({message}){
  return (
    <p className="error">
      <span>@@er</span> {message}
    </p>
  )
}