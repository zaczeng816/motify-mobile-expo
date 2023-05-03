import React, { useEffect, useState } from "react";
import { getToken, setIfNotExist } from "./utils/AsyncStorageUtils";
import { set } from "lodash";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkStoredToken = async () => {
            const token = await getToken();
            if (testAuth(token)) {
                setIsAuthenticated(true);
                setToken(token);
            } else {
                setIfNotExist("token", null);
            }
        };
        checkStoredToken();
    }, []);

    const setAuth = (newToken) => {
        setToken(newToken);
        setIsAuthenticated(true);
        console.log("Context: logged in");
    };

    const logout = () => {
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
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
