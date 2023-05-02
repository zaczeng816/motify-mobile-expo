import React, { useEffect, useState } from "react";
import MainContainer from "./src/MainContainer";
import AuthContainer from "./src/AuthContainer";
import * as SplashScreen from "expo-splash-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIfNotExist } from "./src/utils/AsyncStorageUtils";
import { testAuth, login } from "./src/api/AuthAPI";
import { getSelf } from "./src/api/UserAPI";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hideDefaultSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    hideDefaultSplashScreen();
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

  useEffect(() => {
    const initUserInfo = { id: "", username: "", email: "", profileImagePath: "" };
    const init = async () => {
      try {
        await setIfNotExist("notification", JSON.stringify(true));
        // await setIfNotExist("public_challenges", JSON.stringify([]));
        await setIfNotExist("user", JSON.stringify(initUserInfo));
        const token = await AsyncStorage.getItem("token");
        if (token != null) {
          const ok = await testAuth(token);
          if (ok) {
            const user = await getSelf(token)
            if (user) {
              await AsyncStorage.setItem("user", JSON.stringify(user));
            }
            setIsAuthenticated(true);
          } else {
            const userInfo = await AsyncStorage.getItem("user");
            const password = await AsyncStorage.getItem("password");
            if (userInfo && password && userInfo.email !== "") {
              const login_ok = await login(userInfo.email, password);
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

  if (!isAuthenticated) {
    return <AuthContainer setAuth={() => {
      setIsAuthenticated(true)
    }} />;
  } else {
    return <MainContainer />;
  }
}

export default App;
