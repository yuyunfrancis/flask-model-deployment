import React from "react";

const PredictionDetails = () => {
  // Simulate prediction data
  const prediction = {
    image: "https://via.placeholder.com/150",
    title: "Prediction Title",
    description:
      "This is a detailed description of the prediction. It can be multiple sentences long and contain detailed information about the prediction.",
  };

  return (
    <div>
      {prediction ? (
        <div className="flex flex-col items-center">
          <img
            src={prediction.image}
            alt="Prediction result"
            className="h-64 w-full object-cover object-center"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {prediction.title}
          </h2>
          <p className="mt-4 text-base text-gray-700">
            {prediction.description}
          </p>
        </div>
      ) : (
        <p>No prediction found</p>
      )}
    </div>
  );
};

export default PredictionDetails;
