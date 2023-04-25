import axios from "axios";
import appConfig from "../../config/appConfig";


export const getById = async (id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    await axios.get(appConfig.API_URL + `/api/challenge/getByID/${id}`, config)
}
