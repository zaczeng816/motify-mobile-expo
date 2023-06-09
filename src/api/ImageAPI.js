import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../../config/appConfig";

export const getImageByPath = async (path) => {
    try {
        const config = {
            headers: {Authorization: `Bearer ${await AsyncStorage.getItem("token")}`}
        }
        const response = await axios.get(appConfig.API_URL + `/api/challenge/getByPath/${path}`, config)
        if (response.status !== 200) { return null }
        return response.data
    }catch(e) {
        return null
    }
}
