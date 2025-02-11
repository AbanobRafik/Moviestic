import { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getMovies() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US&page=1`
      );
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getMovies();
  }, []);

  return (
    <div className="md:px-20 px-8 py-2">
      <div>
        <h3 className="text-center mb-3 md:text-4xl text-2xl border-b-2 px-10 font-bold pb-2 tracking-wide drop-shadow-lg">
          🎥 Movies To Show
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:mx-10 mx-5">
        {isLoading
          ? Array.from({ length: 10 }, (_, idx) => <CardSkeleton key={idx} />)
          : movies.map((movie) => (
              <Link
                to={`/moviedetails/${movie.id}/${movie.title}`}
                key={movie.id}
              >
                <Card
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Movies;
