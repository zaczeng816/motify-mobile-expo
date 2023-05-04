import axios from "axios";
import appConfig from "../../config/appConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSelf = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/user/getSelf`,
            config
        );
        if (response.status !== 200) {
            return null;
        }
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

export const getOneById = async (id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/user/getOneById/${id}`,
            config
        );
        if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (e) {
        return null;
    }
};

export const getListByIds = async (idList) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        };
        const response = await axios.post(
            appConfig.API_URL + `/api/user/getListByIds`,
            idList,
            config
        );
        if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (e) {
        return null;
    }
};

export const getAllByUsername = async (username) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/user/getAllByUsername/${username}`,
            config
        );
        if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (e) {
        return null;
    }
};

export const getByEmail = async (email) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/user/getByEmail/${email}`,
            config
        );
        if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (e) {
        return null;
    }
};

export const setProfileImage = async (imageUri) => {
    try {
        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
        });
        const response = await axios.post(
            appConfig.API_URL + `/api/user/uploadUserProfileImage`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization:
                        "Bearer " + (await AsyncStorage.getItem("token")),
                },
            }
        );
        return response.status === 200;
    } catch (e) {
        return false;
    }
};
