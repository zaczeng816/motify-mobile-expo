import React, { useState, useEffect, useContext } from "react";
import {
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
} from "react-native";
import LoginInput from "../components/LoginInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../api/AuthAPI";
import { StatusContext } from "../contexts/StatusContext";
import { AuthContext } from "../contexts/AuthContext";
import appConfig from "../../config/appConfig";

const windowWidth = Dimensions.get("window").width;

function SignUpScreen() {
    const { showLoading, showMessage } = useContext(StatusContext);
    const { setAuth, saveAuth } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        if (appConfig.AUTH_SCREEN_TEST) {
            setUsername("neal");
            setEmail("neal@nyu.edu");
            setPassword("1234myPassword");
            setConfirmPassword("1234myPassword");
        }
    }, []);

    const handleSignUp = async () => {
        if (
            username.length === 0 ||
            email.length === 0 ||
            password.length === 0
        ) {
            setError("Please fill out all fields");
            return;
        } else if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        } else if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        try {
            showLoading("Signing up...");
            const signUpResponse = await signup(username, email, password);
            await saveAuth(loginResponse.token);
            setAuth(signUpResponse.token);
            console.log("Register Success!");
            showMessage("Welcome!");
        } catch (e) {
            showMessage("Sign up failed");
            setError(e.message);
        }
    };

    function goBack() {
        navigation.goBack();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableOpacity onPress={goBack} style={{ zIndex: 1 }}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={40}
                        color="#A9A9A9"
                        style={styles.backArrow}
                    />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text style={styles.registerText}>Create Account</Text>
                    <LoginInput
                        title="Username"
                        iconName="person-outline"
                        onChangeText={setUsername}
                        value={username}
                        isPassword={false}
                    />
                    <LoginInput
                        title="Email"
                        iconName="mail-outline"
                        onChangeText={setEmail}
                        value={email}
                        isPassword={false}
                    />
                    <LoginInput
                        title="Password"
                        iconName="key-outline"
                        onChangeText={setPassword}
                        value={password}
                        isPassword={true}
                    />
                    <LoginInput
                        title="Confirm password"
                        iconName="shield-checkmark-outline"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        isPassword={true}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                handleSignUp();
                            } catch (e) {
                                console.log("handleSignup Error: " + e.message);
                            }
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    registerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 40,
        marginTop: 30,
    },
    input: {
        height: 40,
        fontSize: 15,
        margin: 8,
        width: 0.8 * windowWidth,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        marginTop: 50,
        borderRadius: 50,
        backgroundColor: "orange",
        width: 300,
        height: 60,
        alignContent: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 6,
    },
    backArrow: {
        position: "absolute",
        left: 20,
        top: 70,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
    },
    error: {
        fontStyle: "italic",
        color: "red",
        marginTop: 10,
    },
});
