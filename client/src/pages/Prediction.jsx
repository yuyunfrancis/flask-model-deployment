import React, { useEffect, useState } from "react";
import NewPrediction from "./NewPrediction";
import { useNavigate } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import toast from "react-hot-toast";

const PredictionsPage = () => {
  const navigate = useNavigate();
  const predictions = [
    {
      id: "1",
      image: "https://via.placeholder.com/150",
      title: "Prediction 1",
      description: "This is a description of prediction 1.",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/150",
      title: "Prediction 2",
      description: "This is a description of prediction 2.",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/150",
      title: "Prediction 3",
      description: "This is a description of prediction 3.",
    },
    {
      id: "4",
      image: "https://via.placeholder.com/150",
      title: "Prediction 4",
      description: "This is a description of prediction 4.",
    },
    {
      id: "5",
      image: "https://via.placeholder.com/150",
      title: "Prediction 5",
      description: "This is a description of prediction 5.",
    },
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => {
        setItems(data.Items);
        console.log(data.Items);
      });
  }, []);

  const handleNewPredictionClick = () => {
    navigate("/new-prediction");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-auto pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Breast Cancer Prediction System
        </h2>
        <h3 className="text-lg font-bold text-gray-700 mb-6 text-center">
          Previous Predictions
        </h3>

        {predictions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {predictions.map((prediction, index) => (
              <ImageCard
                key={index}
                imageSrc={prediction?.image}
                altText="Prediction result"
                title={prediction?.title}
                description={prediction?.description}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No predictions found</p>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={handleNewPredictionClick}
            className="px-6 py-3 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors duration-300 mr-4"
          >
            Make a New Prediction
          </button>
          <button
            onClick={handleLogoutClick}
            className="px-6 py-3 font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
