import AsyncStorage from "@react-native-async-storage/async-storage";
import , { AxiosResponse } from "axios";
import appConfig from "../../appConfig";

export const getAllSelfPublicParticipation = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/getAllSelfPublicParticipation`,
            config
        );
        if (response.status === 200) {
            await AsyncStorage.setItem(
                "public_participation",
                JSON.stringify(response.data)
            );
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getAllSelfPublicParticipation: ${e.message}`);
        return null;
    }
};

export const getAllSelfPrivateParticipation = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/getAllSelfPrivateParticipation`,
            config
        );
        if (response.status === 200) {
            await AsyncStorage.setItem(
                "private_participation",
                JSON.stringify(response.data)
            );
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getAllSelfPrivateParticipation: ${e.message}`);
        return null;
    }
};

export const getOneSelfParticipation = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/getOneSelfParticipation/${id}`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(`getOneSelfParticipation: ${e.message}`);
        return null;
    }
};

export const getJoinedPublicChallengesByUserId = async (token, userId) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/getOneSelfParticipation/${userId}`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getJoinedPublicChallengesByUserId: ${e.message}`);
        return null;
    }
};

export const getParticipantsByPublicChallengeId = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL +
                `/api/participation/getParticipantsByPublicChallengeId/${id}`,
            config
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed, status: ${response.status}`);
        }
    } catch (e) {
        console.log(`getParticipantsByPublicChallengeId: ${e.message}`);
        return null;
    }
};

export const getSelfChallengesByDate = async (token, date) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/getSelfChallengesByDate/${date}`,
            config
        );
        if (response.status !== 200) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        return response.data;
    } catch (e) {
        console.log(`getSelfChallengesByDate: ${e.message}`);
        return null;
    }
};

export const checkIn = async (token, request) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post(
            API_URL + `/api/participation/checkin`,
            request,
            config
        );
        if (response.status !== 200) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        return response.data;
    } catch (e) {
        console.log(`checkIn: ${e.message}`);
        return null;
    }
};

export const unCheckIn = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/uncheckin/${id}`,
            config
        );
        if (response.status !== 200) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        return response.data;
    } catch (e) {
        console.log(`checkIn: ${e.message}`);
        return null;
    }
};

export const joinPublicChallenge = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/joinPublic/${id}`,
            config
        );
        if (response.status !== 200) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        return true;
    } catch (e) {
        console.log(`joinPublicChallenge: ${e.message}`);
        return false;
    }
};

export const quitPublicChallenge = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
            API_URL + `/api/participation/quitPublic/${id}`,
            config
        );
        if (response.status !== 200) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        return true;
    } catch (e) {
        console.log(`quitPublicChallenge: ${e.message}`);
        return false;
    }
};
