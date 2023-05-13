import AsyncStorage from "@react-native-async-storage/async-storage";
import , { AxiosResponse } from "axios";
import { API_URL } from "../../{ API_URL }";

export const getImageByPath = async (path) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        };
        const response = await axios.get(
            API_URL + `/api/challenge/getByPath/${path}`,
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
