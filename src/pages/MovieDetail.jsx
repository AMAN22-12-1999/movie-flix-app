import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";
import { FaStar } from "react-icons/fa";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  return (
    <div className="bg-[#0F172A] min-h-screen text-white">

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.Title}</h1>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="bg-blue-500 text-xs px-3 py-1 rounded-full">
              {movie.Type}
            </span>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">{movie.imdbRating}/10</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Movie Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>

          {/* Right Side - Details */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Storyline</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-400">Year</label>
                <p className="font-semibold">{movie.Year}</p>
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Runtime</label>
                <p className="font-semibold">{movie.Runtime}</p>
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Released</label>
                <p className="font-semibold">{movie.Released}</p>
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Director</label>
                <p className="font-semibold">{movie.Director}</p>
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Genre</label>
                <p className="font-semibold">{movie.Genre}</p>
              </div>
              <div className="space-y-2">
                <label className="text-gray-400">Actors</label>
                <p className="font-semibold">{movie.Actors}</p>
              </div>
            </div>

            {/* Additional Info */}
            {movie.Awards && movie.Awards !== "N/A" && (
              <div className="mt-8 p-6 bg-gray-800 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Awards</h3>
                <p className="text-gray-300">{movie.Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;