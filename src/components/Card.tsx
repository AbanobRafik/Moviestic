  interface Card {
    id: number;
    title?: string;
    name?: string;
    vote_average?: number;
    poster_path?: string;
    profile_path?: string;
  }

  const Card = ({
    id,
    title,
    name,
    vote_average,
    poster_path,
    profile_path,
  }: Card) => {
    const imgUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : profile_path
      ? `https://image.tmdb.org/t/p/w500${profile_path}`
      : null;

    return (
      <div
        id={`card-${id}`}
        className="card bg-amber-300 p-2 m-2 rounded-lg hover:scale-110 transform transition-transform duration-300"
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={name || title}
            className="h-64 rounded-lg w-full"
          />
        ) : (
          <div>
            <span>No Image Available</span>
          </div>
        )}
        <h3 className="text-center font-bold text-[var(--primary-color)] max-h-16 line-clamp-2 text-2xl break-words whitespace-normal overflow-hidden">
          {title || name || null}
        </h3>
        {vote_average ? (
          <span className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 px-2 py-1 rounded text-yellow-400 font-semibold">
            Rating: {vote_average.toFixed(1)}
          </span>
        ) : null}
      </div>
    );
  };

  export default Card;