import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { login } from "../services/auth";

const windowWidth = Dimensions.get("window").width;

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (username, password) => {
        const response = await login(username, password);
        if (response !== "success") {
            setError("Invalid username or password");
            console.log("Passwords do not match");
        } else {
            console.log("Logged in!");
            setError("");
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.loginText}>Motify</Text>
            <TextInput
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
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
                onPress={async () => await handleLogin(username, password)}
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
