import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    setIsAuthenticated(!localStorage.getItem("token"));
  }, []);

  return isAuthenticated ? children : navigate("/");
}

export default PublicRoute;
