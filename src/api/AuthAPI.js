import appConfig from "../../config/appConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {
    const dto = {
        email: email.toLowerCase(),
        password: password,
    };
    try {
        console.log(
            "Sending Login request to " + appConfig.API_URL + "/api/auth/login"
        );
        const response = await axios.post(
            appConfig.API_URL + "/api/auth/login",
            dto,
            { timeout: 5000 }
        );
        if (response.status !== 200) {
            console.log("Login response status: " + response.status);
            throw new Error(
                "Login failed, please check you email and password. Status: " +
                    response.status
            );
        }
        return response.data;
    } catch (e) {
        if (e.code === "ECONNABORTED") {
            throw new Error("Request timed out");
        } else {
            throw new Error(e.message);
        }
    }
};

export const signup = async (username, email, password) => {
    const dto = {
        username: username,
        email: email.toLowerCase(),
        password: password,
    };
    try {
        console.log(
            "Sending Signup request to " + appConfig.API_URL + "/api/auth/login"
        );
        const response = await axios.post(
            appConfig.API_URL + "/api/auth/signup",
            dto,
            {
                timeout: 5000, // Set a timeout of 5000 milliseconds (5 seconds)
            }
        );
        if (response.status !== 200) {
            console.log("Signup response status: " + response.status);
            throw new Error(`Error in Signup. Status code: ${response.status}`);
        }
        return response.data;
    } catch (e) {
        if (e.code === "ECONNABORTED") {
            throw new Error("Request timed out");
        } else {
            throw new Error(e.message);
        }
    }
};

export const testAuth = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const response = await axios.get(
            appConfig.API_URL + "/api/user/testAuth",
            config
        );
        return response.status === 200;
    } catch (e) {
        console.log("testAuth: " + e.message);
        return false;
    }
};
