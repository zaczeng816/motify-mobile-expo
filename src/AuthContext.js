import React, { useEffect, useState } from "react";
import {
    getLocalToken,
    removeLocalUserConent,
} from "./utils/AsyncStorageUtils";
import { testAuth } from "./api/AuthAPI";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkStoredToken = async () => {
            try {
                const token = await getLocalToken();
                if (token) {
                    if (await testAuth(token)) {
                        setIsAuthenticated(true);
                        setToken(token);
                    } else {
                        await removeLocalUserConent();
                        clearAuth();
                    }
                }
            } catch (e) {
                console.log(e.message);
                clearAuth();
            }
        };

        checkStoredToken();
    }, []);

    const setAuth = (newToken) => {
        setToken(newToken);
        setIsAuthenticated(true);
        console.log("Context: logged in");
    };

    const clearAuth = () => {
        setIsAuthenticated(false);
        setToken(null);
        console.log("Context: logged out");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                isAuthenticated,
                setIsAuthenticated,
                setAuth,
                clearAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
