import appConfig from "../../config/appConfig";
import axios from "axios";

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
