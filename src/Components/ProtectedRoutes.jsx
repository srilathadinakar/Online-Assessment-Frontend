//protected routes
import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from '../Pages/NotFound';

const ProtectedRoutes = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const role  = localStorage.getItem('role');    

    if (!token) {
        return <Navigate to="/login" />;
    }
    if (adminOnly && role !== "admin") {
        return <NotFound />
      }

    return children;
};

export default ProtectedRoutes;