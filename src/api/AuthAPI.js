import appConfig from "../../config/appConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {   // -> Bool
    const dto = {
        email: email,
        password: password
    }
    const res = await axios.post(appConfig.API_URL + "/api/auth/login", dto)
    if (res.status !== 200){
        return false
    }
    const loginResponse = res.data
    try{
        await AsyncStorage.setItem("token", JSON.stringify(loginResponse.token))
        await AsyncStorage.setItem("user", JSON.stringify(loginResponse.user))
    }catch (e){
        return false
    }
    return true
};

export const signup = async (username, email, password) => {
    const dto = {
        username: username,
        email: email,
        password: password
    }
    const res = await axios.post(appConfig.API_URL + "/api/auth/signup", dto)
    if (res.status !== 200){
        return false
    }
    const loginResponse = res.data
    try{
        await AsyncStorage.setItem("token", JSON.stringify(loginResponse.token))
        await AsyncStorage.setItem("user", JSON.stringify(loginResponse.user))
    }catch (e){
        return false
    }
    return true

};


export const testAuth = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const res = await axios.get(appConfig.API_URL + "/api/user/testAuth", config)
    return res.status === 200
};
