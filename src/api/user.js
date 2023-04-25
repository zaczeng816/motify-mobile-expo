import axios from "axios";
import appConfig from "../../config/appConfig";


export const getSelf = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get(appConfig.API_URL + "/api/user/getSelf", config)
};
