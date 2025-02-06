import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block hover:scale-105 transition-transform">
      <div className="bg-[#1a202c] rounded-lg shadow-md p-4">
        <img 
          src={movie.Poster} 
          alt={movie.Title} 
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="mt-4">
          <h3 className="text-lg font-bold text-white-800">{movie.Title}</h3>
          <p className="text-white-600">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;