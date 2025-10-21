import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { DotLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  console.log(location);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLoader color="#ad46ff" />;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoute;
