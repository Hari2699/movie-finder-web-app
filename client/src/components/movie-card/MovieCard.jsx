import './MovieCard.module.css';

export const MovieCard = ({movie}) =>{

    const {poster_path} = movie;

    return(
        <div className="card-container">
                <img src= {`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie-card" />
        </div>
    )
}