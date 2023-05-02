import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../../config/appConfig";


export const getPageByChallengeId = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/discussion/getPageByChallengeId/${id}/${page}/${size}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const getAllByChallengeId = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/discussion/getAllByChallengeId/${id}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const post = async (request) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.post(appConfig.API_URL + `/api/discussion/post`, request, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const deletePost = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.delete(appConfig.API_URL + `/api/discussion/deletePost/${id}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}
