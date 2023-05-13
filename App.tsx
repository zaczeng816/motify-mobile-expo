import React, { useContext, useEffect, useState } from "react";
import MainContainer from "./src/MainContainer";
import AuthContainer from "./src/AuthContainer";
import * as SplashScreen from "expo-splash-screen";

import { StatusProvider } from "./src/contexts/StatusContext";
import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";
import StatusIndicator from "./src/StatusIndicator";

import appConfig from "./appConfig";
import UserAPITest from "./src/api_tests/UserAPITest";
import DiscussionAPITest from "./src/api_tests/DiscussionAPITest";

function App() {
    const { isAuthenticated } = useContext(AuthContext);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const hideDefaultSplashScreen = async () => {
            await SplashScreen.preventAutoHideAsync();
        };
        hideDefaultSplashScreen()
            .catch((error) =>
                console.log("Error in hideDefaultSplashScreen:", error)
            )
            .finally();
    }, []);

    useEffect(() => {
        if (!showSplash) {
            SplashScreen.hideAsync().catch((error) =>
                console.log("Error in SplashScreen.hideAsync:", error)
            );
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
    }, []);
    */

    // if (TEST_APIs) {
    //     return (
    //         <>
    //             {isAuthenticated ? (
    //                 <UserProvider>
    //                     <DiscussionAPITest />
    //                     <MainContainer />
    //                 </UserProvider>
    //             ) : (
    //                 <AuthContainer />
    //             )}
    //             <StatusIndicator />
    //         </>
    //     );
    // } else {
    //console.log(isAuthenticated)
    return (
        <>
            {isAuthenticated ? (
                <UserProvider>
                    <MainContainer />
                </UserProvider>
            ) : (
                <AuthContainer />
            )}
            <StatusIndicator />
        </>
    );
    // }
}

export default () => (
    <StatusProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StatusProvider>
);
