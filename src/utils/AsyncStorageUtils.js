import AsyncStorage from "@react-native-async-storage/async-storage";

export const setIfNotExist =  async (key, value) => {
  const itemExists = await AsyncStorage.getItem(key)
  if (!itemExists) {
    await AsyncStorage.setItem(key, value)
  }
}

export const getToken = async () => {

}
