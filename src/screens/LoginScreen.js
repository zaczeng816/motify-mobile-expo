import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { login } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSelf} from "../api/user";

const windowWidth = Dimensions.get("window").width;

function LoginScreen(setAuthTrue) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (email, password) => {
        const response = await login(email, password);
        if (response.status !== 200) {
            setError("Invalid email or password");
        } else {
            const token = response.data.token
            await AsyncStorage.setItem("token", token)
            let status = 0;
            let userInfo = {}
            while (status !== 200){
                const userRes = await getSelf(token)
                status = userRes.status;
                userInfo = status.data
            }
            await AsyncStorage.setItem("userInfo", userInfo)
            setAuthTrue()
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.loginText}>Motify</Text>
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
                onPress={async () => await handleLogin(email, password)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    loginText: { fontSize: 30, textAlign: "center", marginBottom: 20 },
    input: {
        height: 40,
        fontSize: 15,
        margin: 8,
        width: 0.8 * windowWidth,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        height: 40,
        margin: 10,
        width: 250,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    error: {
        fontStyle: "italic",
        color: "red",
        marginBottom: 10,
    },
});
