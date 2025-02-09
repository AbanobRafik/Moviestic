import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Genre {
  id: number;
  name: string;
}

interface TVDetailsProps {
  id: number;
  name: string;
  original_language: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  genres: Genre[];
  number_of_seasons: number;
}

const TVDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tvDetails, setTvDetails] = useState<TVDetailsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US`
        );
        setTvDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTvDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-2xl mt-16 text-center font-semibold">Loading...</div>
    );
  }

  if (!tvDetails) {
    return (
      <div className="text-2xl mt-16 text-center text-red-500">
        TV Show not found
      </div>
    );
  }

  return (
    <div className="container bg-cyan-900 mx-auto max-w-5xl p-6 text-white rounded-lg shadow-xl ">
      <div className="flex items-center justify-between ">
        {/* img */}
        <div className="w-full md:w-1/3 ">
          <img
            src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
            alt={tvDetails.name}
            className="rounded-xl w-full shadow-md"
          />
        </div>
        {/* details */}
        <div className="w-full md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h3 className="text-4xl font-extrabold text-center mb-4 text-amber-200">
            {tvDetails.name}
          </h3>
          <p className="text-xl text-center text-white">
            {tvDetails.overview}
          </p>
          <div className="flex justify-center mt-4">
            <div>
              <p className="text-lg text-gray-300">
                <span className="text-amber-400 font-bold">Rating: </span>{" "}
                {tvDetails.vote_average}
              </p>
              <p className="text-lg text-gray-300">
                <span className="text-emerald-400 font-bold">language: </span>{" "}
                {tvDetails.original_language}
              </p>
              <p>
                <span className="text-fuchsia-400 font-bold">seasons: </span>
                {tvDetails.number_of_seasons}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {tvDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-indigo-500 text-white px-3 py-1 text-sm rounded-full shadow"
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

export default TVDetails;
