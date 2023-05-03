import React, { useContext, useState } from "react";
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
import { AuthContext } from "../AuthContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const loginTextHeight = screenHeight * 0.3;
const inputHeight = screenHeight * 0.3;

function LoginScreen({ route }) {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("yb2062@nyu.edu");
    const [password, setPassword] = useState("1234myPassword");
    const [error, setError] = useState("");

    const navigation = useNavigation();

    const handleLogin = async () => {
        console.log("handleLogin");

        if (email.length === 0 || password.length === 0) {
            setError("Please fill out all fields");
            return;
        }
        const token = await login(email, password);
        if (token) {
            console.log("Logged in");
            setError("");
            setAuth(token);
        } else {
            setError("Encountered Error in Login");
            console.log("Login Failed");
        }
    };

    function toSignUp() {
        navigation.navigate("SignUp");
    }

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
                    onPress={handleLogin}
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
