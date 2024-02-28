import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = (WrappedComponent, allowedRoles) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const userType = localStorage.getItem('userType');

            if (!userType || !allowedRoles.includes(userType)) {
                navigate('/login');
            } else {
                setIsLoading(false);
            }
        }, [navigate, allowedRoles]);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default Auth;

