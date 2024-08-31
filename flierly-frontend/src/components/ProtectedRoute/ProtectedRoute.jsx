import { useAuth } from '@/modules/auth/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredPermission }) => {
    const { allowedAccess, isLoggedIn } = useAuth();

    const callback = {
        pathname: window.location.pathname,
        search: window.location.search,
        url: window.location.href
    };

    if (!isLoggedIn || !allowedAccess.includes(requiredPermission)) {
        return <Navigate to={`/unauthorized?callback=${encodeURIComponent(JSON.stringify(callback))}`} />;
    }

    return element;
};

export default ProtectedRoute;
