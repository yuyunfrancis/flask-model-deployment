import React from "react";
import { useNavigate } from "react-router-dom";

const ImageCard = ({
  id,
  imageSrc,
  altText,
  title,
  description,
  showViewMore,
}) => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate(`/predictions/${id}`);
  };

  return (
    <div className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <img
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6 text-sm text-gray-500">{title}</h3>
      <p className="text-base font-semibold text-gray-900 overflow-auto max-h-32">
        {description}
      </p>
      {showViewMore && (
        <button
          onClick={handleViewMoreClick}
          className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default ImageCard;
