import AsyncStorage from "@react-native-async-storage/async-storage";

export const setIfNotExist = async (key, value) => {
    try {
        const itemExists = await AsyncStorage.getItem(key);
        if (!itemExists) {
            await AsyncStorage.setItem(key, value);
        }
    } catch (e) {
        console.warn(e.message);
    }
};

export const getLocalToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token;
    } catch (e) {
        console.warn(e.message);
        return null;
    }
};

export const removeUserConent = async () => {
    try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("user");
        console.log("User removed from storage!");
    } catch (e) {
        console.warn(e.message);
    }
};
