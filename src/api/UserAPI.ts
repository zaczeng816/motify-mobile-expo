import { API_URL } from "../../appConfig";
import { User } from "../types";
import axios, { AxiosResponse } from "axios";

export const getSelf = async (token: string): Promise<User> => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response: AxiosResponse<User> = await axios.get(
            API_URL + `/api/user/getSelf`,
            config
        );
        if (response.status !== 200) {
            throw new Error(
                "request failed with status: " + "${response.status}"
            );
        }
        return response.data;
    } catch (e) {
        new Error("getSelf: " + e.message);
    }
};

export const getOneById = async (
    token: string,
    id: string
): Promise<User | null> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response: AxiosResponse<User | null> = await axios.get(
            API_URL + `/api/user/getOneById/${id}`,
            config
        );
        if (response.status !== 200) {
            console.log("getOneById request failed, status: ", response.status);
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("getOneById error: ", e.message);
        return null;
    }
};

export const getListByIds = async (
    token: string,
    idList: string[]
): Promise<User[]> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            idList,
        };
        const response: AxiosResponse<User[]> = await axios.get(
            API_URL + `/api/user/getListByIds`,
            config
        );
        if (response.status !== 200) {
            throw new Error("request failed with status: " + response.status);
        }
        return response.data;
    } catch (e) {
        throw new Error("getListByIds: ", e.message);
    }
};

export const getAllByUsername = async (
    token: string,
    username: string
): Promise<User[]> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response: AxiosResponse<User[]> = await axios.get(
            API_URL + `/api/user/getAllByUsername/${username}`,
            config
        );
        if (response.status !== 200) {
            console.log(
                "getAllByUsername request failed, status: ",
                response.status
            );
        }
        return response.data;
    } catch (e) {
        throw new Error("getAllByUserName: " + e.message);
    }
};

export const getByEmail = async (
    token: string,
    email: string
): Promise<User | null> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response: AxiosResponse<User | null> = await axios.get(
            API_URL + `/api/user/getByEmail/${email}`,
            config
        );
        if (response.status !== 200) {
            console.log("getByEmail request failed, status: ", response.status);
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("getByEmail error: ", e.message);
        return null;
    }
};

/*
export const setProfileImage = async (
    token: string,
    imageUri: string
): Promise<boolean> => {
    try {
        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
        });
        const response: AxiosResponse<> = await axios.post(
            API_URL + `/api/user/uploadUserProfileImage`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.status === 200;
    } catch (e) {
        return false;
    }
};
*/
