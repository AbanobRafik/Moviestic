import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Card[]>([]);
  const [trendingTv, setTrendingTv] = useState<Card[]>([]);
  const [trendingPeople, setTrendingPeople] = useState<Card[]>([]);

  async function getTrending(
    mediaType: string,
    callBack: (data: Card[]) => void
  ) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTFjOGU1YzIwOWNiZjc2YjhhNGNmZjUyYWQ1ZDcyYiIsIm5iZiI6MTczODg0OTQxNS4xMjQsInN1YiI6IjY3YTRiYzg3ZDQ3YmM3N2NiODg1Yjk3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZvJjMJ3uyguZFl4ZfTqaXIfZA9vaDgNmgRjvlBZpU9M`,
        },
      }
    );
    callBack(data.results);
  }

  useEffect(() => {
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
          {trendingMovies.slice(0, 10).map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>
      <div id="trending-tv" className="flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mt-10 mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg tracking-wide drop-shadow-lg">
          📺 Trending TV Shows
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingTv.slice(0, 8).map((tv) => (
            <Card
              key={tv.id}
              id={tv.id}
              poster_path={tv.poster_path}
              title={tv.name}
              vote_average={tv.vote_average}
            />
          ))}
        </div>
      </div>
      <div id="trending-people" className="flex flex-col">
        <h2 className="text-4xl font-extrabold text-center mt-10 mb-6 text-white bg-gradient-to-r from-emerald-500 to-blue-600 py-3 rounded-lg tracking-wide drop-shadow-lg">
          🌟 Trending People
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingPeople.slice(0, 10).map((person) => (
            <Card
              key={person.id}
              id={person.id}
              profile_path={person.profile_path}
              name={person.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
