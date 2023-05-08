import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../../config/appConfig";

export const getPageByChallengeId = async (token, id, page, size) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            appConfig.API_URL +
                `/api/discussion/getPageByChallengeId/${id}/${page}/${size}`,
            config
        );
        if (response.status !== 200) {
            console.log(
                "getPageByChallengeId request failed, status: ",
                response.status
            );
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("getPageByChallengeId error: ", e.message);
        return null;
    }
};

export const getAllByChallengeId = async (token, id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/discussion/getAllByChallengeId/${id}`,
            config
        );
        if (response.status !== 200) {
            console.log(
                "getAllByChallengeId request failed, status: ",
                response.status
            );
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("getAllByChallengeId error: ", e.message);
        return null;
    }
};

export const sendPost = async (token, request) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            appConfig.API_URL + `/api/discussion/post`,
            request,
            config
        );
        if (response.status !== 200) {
            console.log("post request failed, status: ", response.status);
            return null;
        }
        return response.data;
    } catch (e) {
        console.log("post error: ", e.message);
        return null;
    }
};

export const deletePost = async (token, id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.delete(
            appConfig.API_URL + `/api/discussion/deletePost/${id}`,
            config
        );
        if (response.status !== 200) {
            console.log("deletePost request failed, status: ", response.status);
            return false;
        }
        return true;
    } catch (e) {
        console.log("deletePost error: ", e.message);
        return null;
    }
};
