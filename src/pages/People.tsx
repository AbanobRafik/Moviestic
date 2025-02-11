import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";

const People = () => {
  const [people, setPeople] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getPeople() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US&page=1`
      );
      setPeople(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople();
  }, []);

  return (
    <div className="md:px-20 px-8 py-2">
      <div>
        <h3 className="text-center mb-3 md:text-4xl text-2xl border-b-2 px-10 font-bold pb-2 tracking-wide drop-shadow-lg">
          🌟 Popular People
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:mx-10 mx-5">
        {isLoading
          ? Array.from({ length: 10 }, (_, idx) => <CardSkeleton key={idx} />)
          : people.map((person) => (
              <Link
                to={`/persondetails/${person.id}/${person.name}`}
                key={person.id}
              >
                <Card
                  id={person.id}
                  name={person.name}
                  profile_path={person.profile_path}
                  popularity={person.popularity}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default People;
