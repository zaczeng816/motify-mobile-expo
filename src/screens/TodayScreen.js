import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import CalendarComponent from "../components/CalenderComponent";
import DisplayChallenges from "../components/DisplayChallenges";
import DisplayChallengesProgress from "../components/DisplayChallengesProgress";
import SwitchComponent from "../components/SwitchComponent";
import AddChallengeButton from "../components/buttons/AddChallengeButton";
import { useNavigation, useRoute, useParams } from "@react-navigation/native";
import appConfig from "../../config/appConfig";
import {getAllPrivateChallenges, getAllPublicChallenges} from "../api/ChallengeAPI";
import {AuthContext} from "../contexts/AuthContext";

function TodayScreen() {
    const [challenges, setChallenges] = useState([])
    const {token} = useContext(AuthContext)

    useEffect(() => {
        const getChallenges = async () => {
            return getAllChallengesB
        }
        getChallenges().then(cList => {
            setChallenges(cList);
        })

    }, [challenges])
    // ---------- Dummy Data ---------- //
    // const { challenges } = useRoute().params;
    const showChallenges = challenges.filter((challenge) =>
        selectedOption === "habit"
            ? challenge.type === "habit"
            : challenge.type === "goal"
    );
    // ---------- Dummy Data ---------- //

    const screenHeight = Dimensions.get("window").height;
    const paddingTop = 0.08 * screenHeight;
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [selectedOption, setSelectedOption] = useState("habit");
    const options = [
        { label: "Habit", value: "habit" },
        { label: "Goal", value: "goal" },
    ];

    function handleDayPress(day) {
        setSelectedDate(day);
    }

    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();

    function setMonth(month) {
        setCurrentMonth(month);
    }

    function setYear(year) {
        setCurrentYear(year);
    }

    function switchHandler(value) {
        setSelectedOption(value);
    }

    return (
        <View style={styles.screen}>
            <View style={[styles.header, { paddingTop }]}>
                <View>
                    <Text style={styles.todayText}>Today</Text>
                    <Text style={styles.dateText}>
                        {currentMonth} {currentYear}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AddChallengeButton />
                </View>
            </View>
            <CalendarComponent
                handleDayPress={handleDayPress}
                selectedDate={selectedDate}
                setMonth={setMonth}
                setYear={setYear}
            />
            <View style={styles.challengesContainer}>
                <SwitchComponent
                    options={options}
                    switchHandler={switchHandler}
                />
                <DisplayChallengesProgress challenges={showChallenges} />
            </View>
        </View>
    );
}

export default TodayScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    challengesContainer: {
        flex: 1,
        margin: 20,
    },
    header: {
        //backgroundColor: '#FFF',
        paddingLeft: 30,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    todayText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000",
    },
    dateText: {
        paddingTop: 10,
        fontSize: 15,
        color: "#b6b7b6",
        fontWeight: "bold",
        fontFamily: "Arial",
    },
    buttonContainer: {
        paddingRight: 30,
        alignContent: "center",
        justifyContent: "center",
    },
});
