import axios from "axios";
import appConfig from "../../appConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSelf = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(API_URL + `/api/user/getSelf`, config);
        if (response.status !== 200) {
            throw new Error("request failed, status: " + "${response.status}");
        }
        return response.data;
    } catch (e) {
        new Error("getSelf error: " + e.message);
        return null;
    }
};

export const getOneById = async (token, id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
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

export const getListByIds = async (token, idList) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            API_URL + `/api/user/getListByIds`,
            idList,
            config
        );
        if (response.status !== 200) {
            console.log(
                "getListByIds request failed, status: ",
                response.status
            );
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("getListByIds error: ", e.message);
        return null;
    }
};

export const getAllByUsername = async (token, username) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            API_URL + `/api/user/getAllByUsername/${username}`,
            config
        );
        if (response.status !== 200) {
            console.log(
                "getAllByUsername request failed, status: ",
                response.status
            );
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("getAllByUsername error: ", e.message);
        return null;
    }
};

export const getByEmail = async (token, email) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
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

export const setProfileImage = async (token, imageUri) => {
    try {
        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
        });
        const response = await axios.post(
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
