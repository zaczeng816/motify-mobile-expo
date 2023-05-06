import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../../config/appConfig";

export const getAllPublic = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            appConfig.API_URL + `/api/discussion/getAllPublic`,
            config
        );
        if (response.status !== 200) {
            throw new Error(`Request failed, status: ${response.status}`);
        }
        return response.data;
    } catch (e) {
        console.log(`getAllPublic: ${e.message}`);
        return null;
    }
};
