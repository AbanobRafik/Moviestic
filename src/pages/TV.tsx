import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import CardSkeleton from "../components/CardSkeleton";

const TV = () => {
  const [tv, setTv] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getTv() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US&page=1`
      );
      setTv(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTv();
  }, []);

  return (
    <div className="md:px-20 px-8 py-2">
      <div>
        <h3 className="text-center mb-3 md:text-4xl text-2xl border-b-2 px-10 font-bold pb-2 tracking-wide drop-shadow-lg">
          📺 Tv Show to watch
        </h3>
      </div>
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
