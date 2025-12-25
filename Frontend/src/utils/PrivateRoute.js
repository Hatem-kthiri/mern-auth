import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token"));
  }, []);

  return isAuthenticated ? children : navigate("/login");
}

export default PrivateRoute;
