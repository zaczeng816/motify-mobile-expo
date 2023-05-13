import { API_URL } from "../../appConfig";
import { User } from "../types";
import axios, { AxiosResponse } from "axios";

interface AuthResponse {
    token: string;
    user: User;
}

export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const dto = {
        email: email.toLowerCase(),
        password: password,
    };
    try {
        console.log("Sending Login request to " + API_URL + "/api/auth/login");

        const response: AxiosResponse<AuthResponse> = await axios.post(
            API_URL + "/api/auth/login",
            dto,
            {
                timeout: 5000,
            }
        );
        console.log("HERE");
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

export const signup = async (
    username: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    const dto = {
        username: username,
        email: email.toLowerCase(),
        password: password,
    };
    try {
        console.log("Sending Signup request to " + API_URL + "/api/auth/login");
        const response: AxiosResponse<AuthResponse> = await axios.post(
            API_URL + "/api/auth/signup",
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

export const testAuth = async (token: string): Promise<boolean> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const response: AxiosResponse<User> = await axios.get(
            API_URL + "/api/user/testAuth",
            config
        );
        return response.status === 200;
    } catch (e) {
        console.log("testAuth: " + e.message);
        return false;
    }
};
