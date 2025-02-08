const CardSkeleton = () => {
  return (
    <div className="card bg-amber-300 p-2 m-2 rounded-lg hover:scale-110 transform transition-transform duration-300 w-48 flex flex-col animate-pulse">
      {/* Image Placeholder */}
      <div className="h-60 w-full mb-2 bg-gray-400 rounded-lg"></div>

      {/* Title Placeholder */}
      <div className="h-12 bg-gray-400 rounded-lg mx-1"></div>

      {/* Rating Placeholder */}
      <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 px-2 py-1 rounded text-yellow-400 font-semibold text-xs">
        <div className="h-4 w-8 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
