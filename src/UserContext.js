import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getSelf } from "./api/UserAPI"; // This is a sample function to fetch user data from the API

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [token]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const userData = await getSelf(token);
            setUser(userData);
        } catch (e) {
            console.log("fetchUserData: ", e.message);
        } finally {
            setLoading(false);
        }
    };

    const clearUserData = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{ user, setUser, loading, fetchUserData, clearUserData }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };