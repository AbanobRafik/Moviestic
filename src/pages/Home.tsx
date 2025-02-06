import axios from "axios";
import { useEffect, useState } from "react";
import type Card from "../components/MovieCard";

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
    <div>
      <div id="trending-movies" className="flex flex-col">
        <h2 className="text-3xl font-bold text-center mt-10 ">
          Trending Movies
        </h2>
      </div>
      <div id="trending-tv">
        <h2 className="text-3xl font-bold text-center">Trending Tv</h2>
      </div>
      <div id="trending-people">
        <h2 className="text-3xl font-bold text-center">Trending People</h2>
      </div>
    </div>
  );
};

export default Home;
