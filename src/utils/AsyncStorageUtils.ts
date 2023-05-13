import AsyncStorage from "@react-native-async-storage/async-storage";

export const setIfNotExist = async (
    key: string,
    value: string
): Promise<undefined> => {
    try {
        const itemExists: string | null = await AsyncStorage.getItem(key);
        if (!itemExists) {
            await AsyncStorage.setItem(key, value);
        }
    } catch (e) {
        console.log("setIfNotExist: " + e.message);
    }
};

export const getLocalToken = async (): Promise<string | null> => {
    try {
        const token: string | null = await AsyncStorage.getItem("token");
        return token;
    } catch (e) {
        throw new Error("getLocalToken: " + e.message);
    }
};

export const removeLocalUserContent = async (): Promise<undefined> => {
    try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("user");
        console.log("removeLocalUserConent: User removed from storage!");
    } catch (e) {
        throw new Error("removeLocalUserConent Error: " + e.message);
    }
};
