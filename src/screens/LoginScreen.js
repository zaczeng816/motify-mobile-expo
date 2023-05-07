import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Image,
    Button,
    View,
    Text,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import LoginInput from "../components/LoginInput";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { login } from "../api/AuthAPI";
import { StatusContext } from "../contexts/StatusContext";
import { AuthContext } from "../contexts/AuthContext";
import appConfig from "../../config/appConfig";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const loginTextHeight = screenHeight * 0.3;
const inputHeight = screenHeight * 0.3;

function LoginScreen() {
    const { showLoading, showMessage } = useContext(StatusContext);
    const { setAuth, saveAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        if (appConfig.AUTH_SCREEN_TEST) {
            setEmail("yb2062@nyu.edu");
            setPassword("1234myPassword");
        }
    }, []);

    const handleLogin = async () => {
        if (email.length === 0 || password.length === 0) {
            setError("Please fill out all fields");
            return;
        }
        try {
            showLoading("Logging in...")
            const loginResponse = await login(email, password);
            await saveAuth(loginResponse.token);
            setError("");
            setAuth(loginResponse.token);
            showMessage("Login Successful!");
        } catch (e) {
            showMessage("Login failed");
            setError(e.message);
        }
    };

    const toSignUp = () => {
        navigation.navigate("SignUp");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View
                    style={[styles.titleContainer, { height: loginTextHeight }]}
                >
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.loginText}>
                        Please sign in to continue.
                    </Text>
                </View>
                <View style={[styles.inputFields, { height: inputHeight }]}>
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
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity
                    onPress={async () => {
                        try {
                            handleLogin();
                        } catch (e) {
                            console.log("handleLogin Error: " + e.message);
                        }
                    }}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View
                    style={[styles.bottomTextContainer, { width: screenWidth }]}
                >
                    <Text style={styles.noAccountText}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={toSignUp}>
                        <Text style={styles.signUpText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
    },
    titleContainer: {
        justifyContent: "flex-end",
        marginBottom: -20,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 15,
    },
    loginText: {
        color: "#A9A9A9",
        fontWeight: "bold",
    },
    inputFields: {
        justifyContent: "flex-end",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
    },
    buttonContainer: {
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
    bottomTextContainer: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 60,
    },
    noAccountText: {
        color: "#A9A9A9",
        marginRight: 10,
        fontWeight: "bold",
    },
    signUpText: {
        color: "orange",
        fontWeight: "bold",
    },
    error: {
        fontStyle: "italic",
        color: "red",
        marginBottom: 10,
    },
});

export default LoginScreen;
