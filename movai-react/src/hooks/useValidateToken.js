import { useEffect } from 'react';
import { useAuth } from './../auth/AuthContext';

const useValidateToken = () => {
    const { token, logout } = useAuth();

    useEffect(() => {
        const validateTokenClient = (token) => {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = decodedToken.exp * 1000;

                if (expirationTime < Date.now()) {
                    throw new Error('Your session has expired. Please log in again.');
                }
                return true;
            } catch (error) {
                console.error('Token validation error:', error);
                alert(error.message);
                return false;
            }
        };

        const validateTokenServer = async (token) => {
            try {
                const response = await fetch('https://rosander.no/akkuratda/backend/wp-json/jwt-auth/v1/token/validate/', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                if (!response.ok) {
                    throw new Error('Token server validation failed.');
                }
                return true;
            } catch (error) {
                console.error('Server validation error:', error);
                alert(error.message);
                return false;
            }
        };

        if (token && validateTokenClient(token)) {
            validateTokenServer(token).catch(logout);
        }
    }, [token, logout]);
};

export default useValidateToken;
