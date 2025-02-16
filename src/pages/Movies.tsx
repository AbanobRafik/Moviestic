import { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../components/Ui/Button";

const Movies = () => {
  const [movies, setMovies] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [choice, setChoice] = useState<"top_rated" | "popular" | "now_playing" | "upcoming">("top_rated");

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${choice}?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US&page=1`
        );
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, [choice]);

  return (
    <div className="md:px-20 px-8 py-2">
      <div>
        <h3 className="text-center mb-3 md:text-4xl text-2xl border-b-2 px-10 font-bold pb-2 tracking-wide drop-shadow-lg">
          🎥 Movies To Show
        </h3>
      </div>
      <div className="flex md:flex-row flex-col gap-5 justify-center items-center">
        <Button
          onClick={() => setChoice("top_rated")}
          className="bg-amber-400 w-36 hover:bg-amber-600 transition-colors duration-500 py-2 px-4 rounded-lg shadow-md"
        >
          Top Rate
        </Button>
        <Button
          onClick={() => setChoice("popular")}
          className="bg-emerald-400 hover:bg-emerald-600 w-36 py-2 px-4 rounded-lg shadow-md transition-colors duration-500"
        >
          Popular
        </Button>
        <Button
          onClick={() => setChoice("now_playing")}
          className="bg-cyan-400 w-36 py-2 px-4 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-500"
        >
          Now Playing
        </Button>
        <Button
          onClick={() => setChoice("upcoming")}
          className="bg-indigo-400 w-36 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-500"
        >
          Up Coming
        </Button>
      </div>
      <br />
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
