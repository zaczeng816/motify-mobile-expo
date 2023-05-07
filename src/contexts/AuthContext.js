import React, { useEffect, useState, useContext } from "react";
import {
    getLocalToken,
    removeLocalUserConent,
    setIfNotExist,
} from "../utils/AsyncStorageUtils";
import { testAuth } from "../api/AuthAPI";
import { StatusContext } from "./StatusContext";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const { showLoading, hideLoading, showMessage } = useContext(StatusContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkStoredToken = async () => {
            try {
                showLoading("Loading...");
                const token = await getLocalToken();
                console.log("checkStoredToken: " + token);
                if (token != null) {
                    if (await testAuth(token)) {
                        setAuth(token);
                        showMessage("Welcome back!");
                    } else {
                        await removeLocalUserConent();
                        clearAuth();
                    }
                }
            } catch (e) {
                console.log("checkStoredToken: " + e.message);
                clearAuth();
            } finally {
                hideLoading();
            }
        };

        checkStoredToken();
    }, []);

    const setAuth = (newToken) => {
        setToken(newToken);
        setIsAuthenticated(true);
        console.log("AuthContext: logged in with token ", newToken);
    };

    const saveAuth = async (newToken) => {
        try {
            await setIfNotExist("token", newToken);
        } catch (e) {
            console.log("saveAuth: " + e.message);
        }
    };

    const clearAuth = () => {
        setIsAuthenticated(false);
        setToken(null);
        console.log("AuthContext: logged out");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                isAuthenticated,
                setIsAuthenticated,
                setAuth,
                saveAuth,
                clearAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
