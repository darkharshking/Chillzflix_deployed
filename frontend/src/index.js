import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MoviesList from "./components/MoviesList";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider, useAuth } from "./AuthContext"; // Import the AuthProvider and useAuth
import Movie from "./pages/movieDetail/movie";
import Header from "./components/Header";

// Define HomeRoute component
const HomeRoute = () => {
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      setIsToken(true);
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return isToken ? <App /> : <Navigate to="/login" replace />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* Wrap your app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route
            path="/movies/:type"
            element={
              <>
                <Header /> <MoviesList />
              </>
            }
          />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
