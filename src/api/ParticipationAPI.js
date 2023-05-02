import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../../config/appConfig";


export const getAllSelfPublicParticipation = async () => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/getAllSelfPublicParticipation`, config)
        if (response.status !== 200) { return null }
        await AsyncStorage.setItem("public_participation", JSON.stringify(response.data))
        return response.data
    }catch(e) {
        return null
    }
}


export const getAllSelfPrivateParticipation = async () => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/getAllSelfPrivateParticipation`, config)
        if (response.status !== 200) { return null }
        await AsyncStorage.setItem("private_participation", JSON.stringify(response.data))
        return response.data
    }catch(e) {
        return null
    }
}


export const getOneSelfParticipation = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/getOneSelfParticipation/${id}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const getJoinedPublicChallengesByUserId = async (userId) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/getOneSelfParticipation/${userId}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const getParticipantsByPublicChallengeId = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/getParticipantsByPublicChallengeId/${id}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const getSelfChallengesByDate = async (date) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/getSelfChallengesByDate/${date}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}


export const checkIn = async (request) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.post(appConfig.API_URL + `/api/participation/checkin`, request, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}

export const joinPublicChallenge = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/joinPublic/${id}`, config)
        return response.status === 200;
    }catch(e) {
        return false
    }
}

export const quitPublicChallenge = async (id) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/participation/quitPublic/${id}`, config)
        return response.status === 200;
    }catch(e) {
        return false
    }
}

