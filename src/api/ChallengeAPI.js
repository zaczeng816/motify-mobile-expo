import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../../config/appConfig";

export const getAllPublicChallenges = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/challenge/getAllPublic`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getAllPublicChallenges: ${e.message}`);
        return [];
    }
};

export const getChallengeById = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/challenge/getById/${id}`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getChallengeById: ${e.message}`);
        return null;
    }
};

export const getPublicChallengePage = async (token, page, size) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/challenge/getPublicPage/${page}/${size}`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getPublicChallengePage: ${e.message}`);
        return null;
    }
};

export const getAllPrivateChallenges = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/challenge/getAllPrivate`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getAllPrivateChallenges: ${e.message}`);
        return [];
    }
};

export const getAllPublicChallengesByOwner = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/challenge/getAllPublicByOwner/${id}`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getAllPublicChallengesByOwner: ${e.message}`);
        return null;
    }
};

export const createChallenge = async (token, challengeDTO) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post(
            appConfig.API_URL + `/api/challenge/create`,
            challengeDTO,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`createChallenge: ${e.message}`);
        return null;
    }
};

export const updateChallenge = async (token, challengeDTO) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.put(
            appConfig.API_URL + `/api/challenge/update`,
            challengeDTO,
            config
        );
        if (response.status === 200) {
            return true;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`updateChallenge: ${e.message}`);
        return false;
    }
};

export const deleteChallenge = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.delete(
            appConfig.API_URL + `/api/challenge/delete/${id}`,
            config
        );
        if (response.status === 200) {
            return true;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`deleteChallenge: ${e.message}`);
        return false;
    }
};
