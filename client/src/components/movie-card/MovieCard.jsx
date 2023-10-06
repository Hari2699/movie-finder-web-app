import './MovieCard.module.css';

export const MovieCard = ({movie}) =>{

    const { title, poster_path, overview, vote_average} = movie;

    return(
        <div className="card-container">
            <div className="card-img-container">
                <img src= {`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie-card" />
            </div>
            <div className="metrics">
                <h1 className="title">{title}</h1>           
                <p className="summary">{overview}</p><br />
            <div/>
            <div className='details'>
                <span className="genre">Genre</span>
                <span className="rating">{`Rating:${vote_average}`}</span>
            </div>
            </div>
        </div>
    )
}