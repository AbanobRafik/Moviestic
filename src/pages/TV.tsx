import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import CardSkeleton from "../components/CardSkeleton";
import Button from "../components/Ui/Button";

const TV = () => {
  const [tv, setTv] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [choice, setChoice] = useState<
    "top_rated" | "popular" | "on_the_air" | "airing_today"
  >("top_rated");

  useEffect(() => {
    const loadTv = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${choice}?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US&page=1`
        );
        setTv(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTv();
  }, [choice]);

  return (
    <div className="md:px-20 px-8 py-2">
      <div>
        <h3 className="text-center mb-3 md:text-4xl text-2xl border-b-2 px-10 font-bold pb-2 tracking-wide drop-shadow-lg">
          📺 Tv Show to watch
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
          onClick={() => setChoice("on_the_air")}
          className="bg-cyan-400 w-36 py-2 px-4 rounded-lg shadow-md hover:bg-cyan-600 transition-colors duration-500"
        >
          On The Air
        </Button>
        <Button
          onClick={() => setChoice("airing_today")}
          className="bg-indigo-400 w-36 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-500"
        >
          airing today
        </Button>
      </div>
      <br />

      <div className="flex flex-wrap justify-center gap-4 md:mx-10 mx-5">
        {isLoading
          ? Array.from({ length: 10 }, (_, idx) => <CardSkeleton key={idx} />)
          : tv.map((tv) => (
              <Link to={`/tvdetails/${tv.id}/${tv.name}`} key={tv.id}>
                <Card
                  id={tv.id}
                  title={tv.name}
                  poster_path={tv.poster_path}
                  vote_average={tv.vote_average}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default TV;
