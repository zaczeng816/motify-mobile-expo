import React, { useContext } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { StatusContext } from "./contexts/StatusContext";

const StatusIndicator = () => {
    const { isLoading, appStatus, setAppStatus } = useContext(StatusContext);

    const onClose = () => {
        setAppStatus("idle");
    };
    if (appStatus === "idle" || !appStatus) {
        return null;
    } else if (isLoading) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.statusBlock}>
                    <Text style={styles.statusText}>{appStatus}</Text>
                    <ActivityIndicator size="small" color="orange" />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.statusBlock} onPress={onClose}>
                    <Text style={styles.statusText}>{appStatus}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default StatusIndicator;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    statusBlock: {
        width: 200,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        borderRadius: 10,
        opacity: 0.5,
    },
    statusText: {
        color: "#fff",
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
        paddingHorizontal: 10,
        flexWrap: "wrap",
        fontWeight: "bold",
    },
});
