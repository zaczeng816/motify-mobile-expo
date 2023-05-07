import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    Switch,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import UploadImage from "../components/UploadImage";
import Icons from "../constants/Icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import { StatusContext } from "../contexts/StatusContext";
import { removeLocalUserConent } from "../utils/AsyncStorageUtils";

function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const { showMessage } = useContext(StatusContext);
    const { clearAuth } = useContext(AuthContext);
    const logOutColor = "orange";
    const versionNumber = "Version 1.0.0";
    const supportEmail = "motify@gmail.com";
    const switchBackgroundColor = "#cccccc";

    useEffect(() => {
        const getUser = async () => {
            return await AsyncStorage.getItem("user");
        };
        getUser()
            .then((u) => {
                const user = JSON.parse(u);
                setEmail(user.email);
                setUsername(user.username);
            })
            .catch((e) => console.log("getUser: " + e.message));
    }, [username, email, notificationsEnabled]);

    // const handleNameChange = async () =>{
    //     let user = JSON.parse(await AsyncStorage.getItem("user"))
    //     user.username = username
    //
    // }

    function SettingItem({ label, value }) {
        return (
            <View style={styles.settingItemContainer}>
                <Text style={styles.settingItemLabel}>{label}</Text>
                <Text style={styles.settingItemValue}>{value}</Text>
            </View>
        );
    }

    function SettingSwitch({ label, isEnabled, toggleSwitch }) {
        return (
            <View style={styles.settingSwitchContainer}>
                <Text style={styles.settingSwitchLabel}>{label}</Text>
                <Switch
                    trackColor={{
                        false: switchBackgroundColor,
                        true: "orange",
                    }}
                    ios_backgroundColor={switchBackgroundColor}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        );
    }

    const handleLogout = async () => {
        await removeLocalUserConent()
            .catch()
            .finally(() => {
                clearAuth();
                showMessage("Logged out");
            });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <UploadImage />
                {isEditingName ? (
                    <TextInput
                        style={styles.profileNameInput}
                        value={username}
                        onChangeText={setUsername}
                        onSubmitEditing={() => {
                            //await handleNameChange()
                            setIsEditingName(false);
                        }}
                        autoFocus={true}
                        blurOnSubmit={true}
                    />
                ) : (
                    <View style={styles.profileNameContainer}>
                        <Text style={styles.profileName}>{username}</Text>
                        <View style={styles.penIcon}>
                            <TouchableOpacity
                                onPress={() => setIsEditingName(true)}
                            >
                                {/* <Image source={Icons.pencil} style={styles.pencil}/> */}
                                <FontAwesome
                                    name="pencil"
                                    size={20}
                                    color="grey"
                                    style={styles.pencil}
                                />
                                {/* <Ionicons name='pencil' size={20} style={styles.pencil} color=''/> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <SettingItem label="Email" value={email} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <SettingSwitch
                    label="Enable Notifications"
                    isEnabled={notificationsEnabled}
                    toggleSwitch={() =>
                        setNotificationsEnabled(!notificationsEnabled)
                    }
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General</Text>
                <SettingItem label="About" value={versionNumber} />
                <SettingItem label="Contact us" value={supportEmail} />
            </View>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: logOutColor }]}
                onPress={handleLogout}
            >
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    section: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    settingItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    settingItemLabel: {
        fontSize: 14,
    },
    settingItemValue: {
        fontSize: 14,
        color: "#888",
    },
    settingSwitchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    settingSwitchLabel: {
        fontSize: 14,
    },
    button: {
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    profileNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
    penIcon: {
        marginLeft: 10,
        marginTop: 10,
    },
    profileNameInput: {
        paddingTop: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderColor: "black",
    },
    pencil: {
        width: 20,
        height: 20,
        position: "absolute",
        right: -20,
        top: -10,
    },
});
