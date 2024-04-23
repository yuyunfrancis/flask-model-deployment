import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Predictions from "../pages/Prediction";
import NewPrediction from "../pages/NewPrediction";
import PredictionDetails from "../pages/PredictionDetails";
import PageNotFound from "../pages/PageNotFound";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AppRoutes = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/"
        element={currentUser ? <PrivateRoutes /> : <Navigate to="/login" />}
      >
        <Route index element={<Predictions />} />
        <Route path="new-prediction" element={<NewPrediction />} />
        <Route path="predictionDetails" element={<PredictionDetails />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
