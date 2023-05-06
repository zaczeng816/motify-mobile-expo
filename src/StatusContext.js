import React, { createContext, useState } from "react";

const StatusContext = createContext();

const StatusProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState("idle");
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = (message = "Loading...") => {
        setAppStatus(message);
        setIsLoading(true);
    };

    const hideLoading = () => {
        setIsLoading(false);
        setAppStatus("idle");
    };

    const showMessage = (message, duration = 1000) => {
        setAppStatus(message);
        setTimeout(() => setAppStatus("idle"), duration);
    };

    return (
        <StatusContext.Provider
            value={{
                appStatus,
                setAppStatus,
                showLoading,
                hideLoading,
                showMessage,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
};

export { StatusProvider, StatusContext };
