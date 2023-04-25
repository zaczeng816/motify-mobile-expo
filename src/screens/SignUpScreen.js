import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import {login, signup} from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSelf} from "../api/user";

const windowWidth = Dimensions.get("window").width;

function SignUpScreen({setAuthTrue}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (username, email, password) => {
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            setError("Please fill out all fields");
            return;
        } else if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        } else if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        let response
        try {
            response = await signup(username, email, password);
            if (response.status === 200) {
                await AsyncStorage.setItem("token", response.data.token)
                await AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user))
                setError("")
                setAuthTrue()
            }
        }catch(e){
            setError("Email already exists!");
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.registerText}>Motify</Text>
            <TextInput
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
                onPress={async () => await handleSignUp(username, email, password)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    registerText: { fontSize: 30, textAlign: "center", marginBottom: 20 },
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
