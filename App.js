import React, {useEffect, useState} from 'react';
import MainContainer from './src/MainContainer';
import AuthContainer from './src/AuthContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {testAuth, login} from "./src/api/auth";
import {getSelf} from "./src/api/user";
import {setIfNotExist} from "./src/utils/AsyncStorageUtils";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const initUserInfo = {id: "", username: "", email: "", profileImagePath: ""}
        const init = async () => {
            try {
                await AsyncStorage.clear()
                console.log("Initializing app.")
                await setIfNotExist("notification", "true");
                await setIfNotExist("challenges", JSON.stringify([]));
                await setIfNotExist("userInfo", JSON.stringify(initUserInfo))
                const token = await AsyncStorage.getItem("token")
                if (token != null) {
                    const res = await testAuth(token)
                    if (res.status === 200) {
                        await AsyncStorage.setItem("userInfo", JSON.stringify(await getSelf(token)))
                        setIsAuthenticated(true)
                    }else{
                        const userInfo = await AsyncStorage.getItem("userInfo")
                        const password = await AsyncStorage.getItem("password")
                        if (userInfo && password && (userInfo.email !== "")){
                            const login_res = await login(userInfo.email, password)
                            if (login_res.status === 200){
                                const login_token = login_res.data.token
                                const user = await getSelf(login_token)
                                await AsyncStorage.setItem("userInfo", JSON.stringify(user))
                                setIsAuthenticated(true)
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        };
        init().then()
    }, [setIsAuthenticated]);

    if (!isAuthenticated){
        return <AuthContainer setAuthTrue = {(val)=>{setIsAuthenticated(val)}} />;
    }
    else{
        return <MainContainer />;
    }
}

export default App;
