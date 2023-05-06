import React, { useContext, useEffect, useState } from "react";
import MainContainer from "./src/MainContainer";
import AuthContainer from "./src/AuthContainer";
import * as SplashScreen from "expo-splash-screen";

import { AuthContext, AuthProvider } from "./src/AuthContext";
import { UserProvider } from "./src/UserContext";

import appConfig from "./config/appConfig";
import UserAPITest from "./src/UserAPITest";

function App() {
    const { isAuthenticated } = useContext(AuthContext);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const hideDefaultSplashScreen = async () => {
            await SplashScreen.preventAutoHideAsync();
        };
        hideDefaultSplashScreen().finally();
    }, []);

    useEffect(() => {
        if (!showSplash) {
            SplashScreen.hideAsync();
        }
    }, [showSplash]);

    useEffect(() => {
        setTimeout(() => {
            setShowSplash(false);
        }, 500);
    }, []);
    /*
    useEffect(() => {
        const initUserInfo = {
            id: "",
            username: "",
            email: "",
            profileImagePath: "",
        };
        const init = async () => {
            try {
                await setIfNotExist("notification", JSON.stringify(true));
                // await setIfNotExist("public_challenges", JSON.stringify([]));
                await setIfNotExist("user", JSON.stringify(initUserInfo));
                const token = await AsyncStorage.getItem("token");
                if (token != null) {
                    const ok = await testAuth(token);
                    if (ok) {
                        const user = await getSelf(token);
                        if (user) {
                            await AsyncStorage.setItem(
                                "user",
                                JSON.stringify(user)
                            );
                        }
                        setIsAuthenticated(true);
                    } else {
                        const userInfo = await AsyncStorage.getItem("user");
                        const password = await AsyncStorage.getItem("password");
                        if (userInfo && password && userInfo.email !== "") {
                            const login_ok = await login(
                                userInfo.email,
                                password
                            );
                            if (login_ok) {
                                setIsAuthenticated(true);
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        init().then();
    }, [setIsAuthenticated]);
    */

    if (appConfig.TEST_APIs) {
        return isAuthenticated ? (
            <UserProvider>
                <UserAPITest />
                <MainContainer />
            </UserProvider>
        ) : (
            <AuthContainer />
        );
    } else {
        return isAuthenticated ? (
            <UserProvider>
                <MainContainer />
            </UserProvider>
        ) : (
            <AuthContainer />
        );
    }
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
