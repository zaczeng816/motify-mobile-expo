import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getSelf } from "./api/UserAPI"; // This is a sample function to fetch user data from the API
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        setLoading(true);
        getSelf(token)
            .then((userData) => {
                if (userData) {
                    setUser(userData);
                    console.log(
                        "fetchUserData sucess! email: ",
                        userData.email
                    );
                } else {
                    throw new Error("Cannot get user data");
                }
            })
            .catch((e) => {
                console.log("fetchUserData: ", e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            fetchUserData().catch();
        }, 500);
        return () => clearTimeout(timer);
    }, [token]);

    useEffect(() => {
        const saveUserData = async () => {
            if (user) {
                try {
                    await AsyncStorage.setItem("user", JSON.stringify(user));
                    console.log("saveUserData success! Email:", user.email);
                } catch (e) {
                    console.log("saveUserData: ", e.message);
                }
            }
        };

        saveUserData();
    }, [user]);

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
