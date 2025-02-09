import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetailsProps {
  id: number;
  title: string;
  original_language: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  genres: Genre[];
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US`
        );
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center text-2xl font-semibold mt-16">Loading...</div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="text-center text-2xl text-red-500 mt-16">
        Movie not found
      </div>
    );
  }

  return (
    <div className="container text-center mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-xl max-w-5xl">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h3 className="text-4xl font-extrabold mb-4 text-blue-400">
            {movieDetails.title}
          </h3>
          <p className="text-lg text-gray-300 mb-4">{movieDetails.overview}</p>
          <div className="mb-4">
            <strong className="text-blue-300">Language:</strong>{" "}
            {movieDetails.original_language}
          </div>
          <div className="mb-4">
            <strong className="text-green-300">Rating:</strong>{" "}
            {movieDetails.vote_average.toFixed(1)}
          </div>

          {/* Genres Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {movieDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full shadow"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
