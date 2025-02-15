import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState(""); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(debouncedSearchTerm, mediaType); 
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [debouncedSearchTerm, mediaType]); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); 

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(e.target.value);
    }, 500); 
  };

  const handleFilter = (type) => {
    setMediaType(type); 
  };

  return (
    <div className="bg-[#0F172A] min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto p-4 pt-20">
        {/* Updated Heading Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🎥MaileHereko</h1>
          <p className="text-gray-400">
            List of movies and TV Shows. I Promod Poudel have watched 3! done.<br />
            Explore what I have watched and also feel free to make a suggestion.
          </p>
        </div>

        {/* Updated Search Bar */}
        <div className="mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search Movies or TV Shows"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Updated Filter Buttons */}
        <div className="mb-8">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => handleFilter("")}
              className={`px-6 py-2 text-sm font-medium ${
                mediaType === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleFilter("movie")}
              className={`px-6 py-2 text-sm font-medium ${
                mediaType === "movie"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              Movies
            </button>
            <button
              type="button"
              onClick={() => handleFilter("series")}
              className={`px-6 py-2 text-sm font-medium ${
                mediaType === "series"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        {/* Movie Grid */}
        {loading ? (
          <div className="flex justify-center items-center">
            <span>Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies?.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <div className="text-center col-span-full">
                <span>No movies found.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;