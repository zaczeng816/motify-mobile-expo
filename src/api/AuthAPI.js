import appConfig from "../../config/appConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {
    const dto = {
        email: email,
        password: password,
    };
    const response = await axios.post(
        appConfig.API_URL + "/api/auth/login",
        dto
    );

    console.log(response.status + " " + response.data);
    if (response.status !== 200) {
        return null;
    }
    const loginResponse = response.data;
    try {
        const token = JSON.stringify(loginResponse.token);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(loginResponse.user));
        return token;
    } catch (e) {
        return null;
    }
};

export const signup = async (username, email, password) => {
    const dto = {
        username: username,
        email: email,
        password: password,
    };
    const response = await axios.post(
        appConfig.API_URL + "/api/auth/signup",
        dto
    );
    if (response.status !== 200) {
        return null;
    }
    const loginResponse = response.data;
    try {
        const token = JSON.stringify(loginResponse.token);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(loginResponse.user));
        return token;
    } catch (e) {
        return null;
    }
};

export const testAuth = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(
        appConfig.API_URL + "/api/user/testAuth",
        config
    );
    return response.status === 200;
};
