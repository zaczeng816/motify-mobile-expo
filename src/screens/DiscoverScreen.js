import React, {useContext, useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import SwitchComponent from "../components/SwitchComponent";
import { useRoute } from "@react-navigation/native";
import DisplayChallenges from "../components/DisplayChallenges";
import SearchComponent from "../components/SearchComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPublicChallenges } from "../api/ChallengeAPI";
import appConfig from "../../config/appConfig";
import {AuthContext} from "../contexts/AuthContext";

function DiscoverScreen() {
    // ---------- Dummy Data ---------- //
    // const { challenges } = useRoute().params;
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const { token } = useContext(AuthContext)
    // ---------- Dummy Data ---------- //

    const options = [
        { label: "Habit", value: "habit" },
        { label: "Goal", value: "goal" },
    ];
    const [option, setOption] = useState("habit");

    useEffect(() => {
        const getChallenges = async () => {
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
            })
            .catch((e) => {
                console.log("getChallenges: " + e.message);
            });
    }, [option]);

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
