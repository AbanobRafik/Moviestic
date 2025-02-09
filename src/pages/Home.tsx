import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import { Link } from "react-router-dom";

const Home = () => {
  const MAX_TITLE_LENGTH = 30; // Adjust this value based on your needs

  const truncateTitle = (
    title: string | undefined,
    maxLength: number = MAX_TITLE_LENGTH
  ): string => {
    if (!title) return "";
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const [trendingMovies, setTrendingMovies] = useState<Card[]>([]);
  const [trendingTv, setTrendingTv] = useState<Card[]>([]);
  const [trendingPeople, setTrendingPeople] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getTrending(
    mediaType: string,
    callBack: (data: Card[]) => void
  ) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTFjOGU1YzIwOWNiZjc2YjhhNGNmZjUyYWQ1ZDcyYiIsIm5iZiI6MTczODg0OTQxNS4xMjQsInN1YiI6IjY3YTRiYzg3ZDQ3YmM3N2NiODg1Yjk3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZvJjMJ3uyguZFl4ZfTqaXIfZA9vaDgNmgRjvlBZpU9M`,
          },
        }
      );
      callBack(data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
  }, []);

  return (
    <div className="px-20 py-2">
      <div id="trending-movies" className="flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mt-10 mb-6 border-b-4 border-gradient-to-r from-amber-400 to-yellow-600 pb-2 tracking-wide drop-shadow-lg">
          🎥 Trending Movies to watch
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mx-10 ">
          {isLoading
            ? Array.from({ length: 10 }, (_, idx) => <CardSkeleton key={idx} />)
            : trendingMovies.slice(0, 10).map((movie) => (
                <Link
                  to={`/moviedetails/${movie.id}/${movie.title}`}
                  key={movie.id}
                >
                  <Card
                    key={movie.id}
                    id={movie.id}
                    poster_path={movie.poster_path}
                    title={truncateTitle(movie.title)} // Truncate the title here
                    vote_average={movie.vote_average}
                  />
                </Link>
              ))}
        </div>
      </div>
      <div id="trending-tv" className="flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mt-10 mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg tracking-wide drop-shadow-lg">
          📺 Trending TV Shows right now
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 10 }, (_, idx) => <CardSkeleton key={idx} />)
            : trendingTv.slice(0, 10).filter((tv)=> tv.vote_average).map((tv) => (
                <Link to={`/tvdetails/${tv.id}/${tv.name}`} key={tv.id}>
                  <Card
                    key={tv.id}
                    id={tv.id}
                    poster_path={tv.poster_path}
                    title={truncateTitle(tv.name)} // Truncate the title here
                    vote_average={tv.vote_average}
                  />
                </Link>
              ))}
        </div>
      </div>
      <div id="trending-people" className="flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mt-10 mb-6 text-white bg-gradient-to-r from-emerald-500 to-blue-600 py-3 rounded-lg tracking-wide drop-shadow-lg">
          🌟 Trending People to Follow
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array.from({ length: 10 }, (_, idx) => <CardSkeleton key={idx} />)
            : trendingPeople.slice(0, 10).map((person) => (
                <Link
                  to={`/persondetails/${person.id}/${person.name}`}
                  key={person.id}
                >
                  <Card
                    key={person.id}
                    id={person.id}
                    profile_path={person.profile_path}
                    name={person.name}
                    popularity={person.popularity}
                  />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
