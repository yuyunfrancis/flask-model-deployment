import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ImageCard from "../components/ImageCard";
import axios from "axios";

const NewPrediction = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setSelectedFile(event.target.files[0]);
    setResults(null);
  };

  const handlePredictClick = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];
      try {
        const response = await axios.post("http://127.0.0.1:5000/predict", {
          image: base64Image,
        });
        setLoading(false);
        setResults({
          image: selectedImage,
          title:
            "Confidence Level" + " " + response.data.prediction[0].confidence,
          description: "Prediction" + " " + response.data.prediction[0].class,
        });
        console.log(response.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert(
          "An error occurred while making the prediction. Please try again."
        );
      }
    };
  };

  const handleSaveClick = () => {
    setSaveLoading(true);
    // Simulate saving process
    setTimeout(() => {
      setSaveLoading(false);
      alert("Prediction saved successfully!");
      setSelectedImage(null);
      setResults(null);
    }, 2000); // 2 seconds delay
  };

  const handleUploadAnotherImageClick = () => {
    setSelectedImage(null);
    setResults(null);
  };

  const handleGoToPredictionsClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">
            Breast Cancer Prediction System
          </h2>

          {loading ? (
            <Loader />
          ) : results ? (
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <ImageCard
                imageSrc={results.image}
                altText="Prediction result"
                title={results.title}
                description={results.description}
              />
              <div>
                <button
                  onClick={handleSaveClick}
                  disabled={saveLoading}
                  className="mt-4 px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  {saveLoading ? "Saving..." : "Save Prediction"}
                </button>
                <button
                  onClick={handleUploadAnotherImageClick}
                  className="mt-4 ml-4 px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Upload Another Image
                </button>
                <button
                  onClick={handleGoToPredictionsClick}
                  className="mt-4 ml-4 px-2 py-1 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Go to Predictions
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Uploaded preview"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <p className="mt-32 text-center text-gray-500">
                      No image uploaded
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4"
                  />
                  <button
                    onClick={handlePredictClick}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Predict
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPrediction;
