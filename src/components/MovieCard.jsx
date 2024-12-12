import "../css/MovieCard.css"

function MovieCard({ movie }) {
    const kinopoiskId = movie.kinopoiskId || movie.id
    const kinopoiskUrl = `https://www.kinopoisk.ru/film/${kinopoiskId}/`;
    const roundedRating = parseFloat(movie.rating.kp).toFixed(1);

    return (
        <a href={kinopoiskUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            <div className="movie-card">
                <div className="movie-poster">
                    {movie.poster && movie.poster.url ? (
                        <img src={movie.poster.url} alt={movie.name} />
                    ) : (
                        <img src="/default-poster.jpg" alt="Default Poster" />
                    )}

                </div>
                <div className="movie-info">
                    <h3>{movie.name}</h3>
                    <h4>Рейтинг: {roundedRating}</h4>
                    <p>{movie.year}</p>
                </div>
            </div>
        </a>

    )
}

export default MovieCard