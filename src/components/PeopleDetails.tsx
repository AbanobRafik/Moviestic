import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ActorDetailsProps {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  popularity: number;
  known_for_department: string;
}

const ActorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [actorDetails, setActorDetails] = useState<ActorDetailsProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=d11c8e5c209cbf76b8a4cff52ad5d72b&language=en-US`
        );
        setActorDetails(data);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center text-2xl font-semibold mt-16">Loading...</div>
    );
  }

  if (!actorDetails) {
    return (
      <div className="text-center text-2xl text-red-500 mt-16">
        Actor not found
      </div>
    );
  }

  return (
    <div className="container text-center mx-auto p-6 bg-sky-900 text-white rounded-lg shadow-xl max-w-5xl">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
            alt={actorDetails.name}
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-4xl font-extrabold mb-4 text-amber-500">
            {actorDetails.name}
          </h1>
          <p className="text-lg text-gray-300 mb-4">{actorDetails.biography}</p>
          <div className="mb-4">
            <strong className="text-emerald-500">Birthday:</strong>{" "}
            {actorDetails.birthday}
          </div>
          <div className="mb-4">
            <strong className="text-blue-300">Place of Birth:</strong>{" "}
            {actorDetails.place_of_birth}
          </div>
          <div className="mb-4">
            <strong className="text-red-500">Department:</strong>{" "}
            {actorDetails.known_for_department}
          </div>
          <div className="mb-4">
            <strong className="text-purple-400">Popularity:</strong>{" "}
            {actorDetails.popularity.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
