import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoute = () => {
    const { user } = useSelector((state) => state.auth);
    // const user = true;
    return user ? <Outlet /> : <Navigate to='/signin' replace />;
};

export default PrivateRoute;
