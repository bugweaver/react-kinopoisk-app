import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [hasMore, setHasMore] = useState(true); // Flag to indicate if there are more movies to load

    const loadMovies = async (page) => {
      try {
          setLoading(true);
          let newMovies;
          if (searchQuery.trim()) {
              const searchResults = await searchMovies(searchQuery, page);
              newMovies = searchResults.docs.filter(
                  (movie) => movie.name && movie.poster && movie.poster.url
              );
          } else {
              const popularMovies = await getPopularMovies(page);
              newMovies = popularMovies.docs.filter((movie) => movie.name);
          }

          if (newMovies.length === 0) {
              setHasMore(false);
          }

          setMovies((prevMovies) => [...prevMovies, ...newMovies]);
          setError(null);
      } catch (err) {
          console.error("Error loading movies:", err);
          setError("Failed to load movies...");
          setHasMore(false);
      } finally {
          setLoading(false);
      }
  };

    useEffect(() => {
        const initializeMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                if (popularMovies && popularMovies.docs) {
                    const filteredMovies = popularMovies.docs.filter(
                        (movie) => movie.name
                    );
                    setMovies(filteredMovies);
                    setHasMore(popularMovies.docs.length > 0);
                } else {
                    setError("Response does not contain movies");
                    setMovies([]);
                }
            } catch (err) {
                console.error("Error loading movies:", err);
                setError("Failed to load movies...");
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };
        initializeMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        setMovies([]);
        setCurrentPage(1);
        setHasMore(true);
        await loadMovies(1);
    };

    const loadMoreMovies = () => {
        if (loading || !hasMore) return;
        const nextPage = currentPage + 1;
        loadMovies(nextPage);
        setCurrentPage(nextPage);
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Поиск..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Искать
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>

            {loading && <div className="loading">Loading...</div>}

            {hasMore && !loading && (
                <button onClick={loadMoreMovies} className="load-more-button">
                    Загрузить еще
                </button>
            )}
        </div>
    );
}

export default Home;