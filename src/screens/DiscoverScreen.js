import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import SwitchComponent from "../components/SwitchComponent";
import { useIsFocused } from "@react-navigation/native";
import DisplayChallenges from "../components/DisplayChallenges";
import SearchComponent from "../components/SearchComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPublicChallenges } from "../api/ChallengeAPI";
import appConfig from "../../appConfig";
import { showLoading, showMessage } from "../contexts/StatusContext";
import { StatusContext } from "../contexts/StatusContext";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

function DiscoverScreen() {
    const { isFocused } = useIsFocused();
    const { token } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const { showLoading, showMessage, hideLoading } = useContext(StatusContext);
    const [filteredChallenges, setFilteredChallenges] = useState([]);

    const options = [
        { label: "Habit", value: "habit" },
        { label: "Goal", value: "goal" },
    ];
    const [option, setOption] = useState("habit");

    useEffect(() => {
        const getChallenges = async () => {
            showLoading("Loading challenges...");
            return await getAllPublicChallenges(token);
        };
        const processChallenges = (challengeList) => {
            const filtered = challengeList.filter((challenge) => {
                if (challenge.frequency && option === "habit") {
                    return true;
                }
                if (!challenge.frequency && option === "goal") {
                    return true;
                }
                return false;
            });
            setFilteredChallenges(filtered);
        };
        getChallenges()
            .then((c) => {
                processChallenges(c);
                hideLoading();
            })
            .catch((e) => {
                showMessage("Error Getting Challenges");
                console.log("getChallenges: " + e.message);
            });
    }, [option, isFocused]);

    function switchHandler(value) {
        setOption(value);
    }

    return (
        <View style={styles.container}>
            <SwitchComponent options={options} switchHandler={switchHandler} />
            <View style={styles.challengesContainer}>
                <SearchComponent challenges={filteredChallenges} />
            </View>
        </View>
    );
}

export default DiscoverScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        // alignItems: 'stretch',
        //backgroundColor: '#d9d9d9'
    },
    challengesContainer: {
        flex: 1,
    },
});
