import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {authService} from "./services/authService";
import {useSelector} from "react-redux";
import useFetch from "./hooks/useFetch";
import {appService} from "./services/appService";
import {setSubject, setUserSession} from "./redux/actions/actions";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // get it from the state

  authService.getUserSession().then(response => {
    setIsAuthenticated(true);
  }).catch(err => {
    setIsAuthenticated(false);
  });

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;