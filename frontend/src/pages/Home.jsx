import "../css/Home.css"

import MovieCard from "../components/MovieCard.jsx";
import {useState, useEffect} from "react";
import {getPopularMovies,searchMovies} from "../services/api.js";


function Home() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    //const movies = getPopularMovies()

    useEffect(()=> {
        const loadPopularMovies =  async ()=>{
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            } catch (error) {
                console.log(error);
                setError("Fail to load popular movies");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim() || loading) return;

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setError(null)
            setMovies(searchResults)
        } catch(error){
            console.log(error);
            setError(error)
        } finally {
            setLoading(false)
        }
        //setSearchQuery("----"); //state can be updated also here
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search..."
                       className="search-input"
                       value={searchQuery}
                       onChange={(e=>setSearchQuery(e.target.value))}
                />
                <button type="submit"
                        className="search-button">
                    Search
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ?
                (<div className={"loading"}>Loading...</div>) : (
            <div className="movies-grid">
                {
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                }
            </div>
                )
            }
        </div>
    )
}

export default Home;