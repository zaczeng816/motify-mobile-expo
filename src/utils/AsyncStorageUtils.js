import AsyncStorage from "@react-native-async-storage/async-storage";

export const setIfNotExist = async (key, value) => {
    try {
        const itemExists = await AsyncStorage.getItem(key);
        if (!itemExists) {
            await AsyncStorage.setItem(key, value);
        }
    } catch (e) {
        console.log("setIfNotExist: " + e.message);
    }
};

export const getLocalToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (e) {
        console.log("getLocalToken: " + e.message);
    }
};

export const removeLocalUserContent = async () => {
    try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("user");
        console.log("removeLocalUserConent: User removed from storage!");
    } catch (e) {
        console.log("removeLocalUserConent Error: " + e.message);
    }
};
