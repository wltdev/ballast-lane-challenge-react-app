import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated() && <Navigation />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/projects" /> : <Login />
            }
          />
          <Route
            path="/projects"
            element={isAuthenticated() ? <Projects /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
