import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';

const useAuth = () => {

  const { loggedIn } = useSelector((state: RootState) => state.systemLogin)

  if (localStorage.getItem("accessToken")) {
    const loggedIn = true
    const user = { loggedIn } ;
    return user && user.loggedIn
  }

  const user = { loggedIn} ;
  return user && user.loggedIn
}

const ProtectedRoute = () => {

  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

//

export default ProtectedRoute