import appConfig from "../../config/appConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSelf} from "./user";

export const login = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    return axios.post(appConfig.API_URL + "/api/auth/login", body)
};

export const signup = async (username, email, password) => {
    const body = {
        username: username,
        email: email,
        password: password,
        role: null
    }
    return axios.post(appConfig.API_URL + "/api/auth/signup", body)
};


export const testAuth = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get(appConfig.API_URL + "/api/user/testAuth", config)
};


const handleSignUp = async (username, email, password) => {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
        setError("Please fill out all fields");
        return;
    } else if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
    } else if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    let response
    try {
        response = await signup(username, email, password);
        if (response.status === 200) {
            await AsyncStorage.setItem("token", response.data.token)
            await AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user))
            setError("")
            setAuthTrue()
        }
    }catch(e){
        setError("Email already exists!");
    }
};


const handleLogin = async (email, password) => {
    const response = await login(email, password);
    if (response.status !== 200) {
        setError("Invalid email or password");
    } else {
        const token = response.data.token
        await AsyncStorage.setItem("token", token)
        let status = 0;
        let userInfo = {}
        while (status !== 200){
            const userRes = await getSelf(token)
            status = userRes.status;
            userInfo = status.data
        }
        await AsyncStorage.setItem("userInfo", userInfo)
        setAuthTrue()
    }
};
