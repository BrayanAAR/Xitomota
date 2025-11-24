import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rolUsuario');

    // 1. Si no hay token, al login
    if (!token) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    // 2. Si hay roles requeridos y el usuario no lo tiene, al inicio
    if (allowedRoles && !allowedRoles.includes(rol)) {
        return <Navigate to="/" replace />;
    }

    // 3. Todo bien, muestra el contenido
    return <Outlet />;
};

export default ProtectedRoute;