import appConfig from "../../config/appConfig";

export function isAuthenticated() {
    return appConfig.AUTH_TOKEN !== "";
}

export const login = async (username, password) => {
    return "success";
};

export const register = async (username, password) => {
    return "success";
};
