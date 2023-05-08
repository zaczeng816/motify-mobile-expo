import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import CalendarComponent from "../components/CalenderComponent";
import DisplayChallenges from "../components/DisplayChallenges";
import DisplayChallengesProgress from "../components/DisplayChallengesProgress";
import SwitchComponent from "../components/SwitchComponent";
import AddChallengeButton from "../components/buttons/AddChallengeButton";
import {AuthContext} from "../contexts/AuthContext";
import {getSelfChallengesByDate} from "../api/ParticipationAPI";
import {useIsFocused} from "@react-navigation/native";

function TodayScreen() {
    const [challengesPair, setChallengesPair] = useState([])
    const {token} = useContext(AuthContext)
    const screenHeight = Dimensions.get("window").height;
    const paddingTop = 0.08 * screenHeight;
    const isFocused = useIsFocused();
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString()
    );
    const [selectedOption, setSelectedOption] = useState("habit");
    const options = [
        {label: "Habit", value: "habit"},
        {label: "Goal", value: "goal"},
    ];

    useEffect(() => {
        const getChallengePairs = async () => {
            let myDate = selectedDate.slice(0, 10) + "T00:00:00.000Z";
            if (selectedDate.slice(0, 10) === new Date().toISOString().slice(0, 10)) {
                myDate = new Date().toISOString();
            }
            return await getSelfChallengesByDate(token, myDate);
        };
        getChallengePairs().then(pairList => {setChallengesPair(pairList)});

    }, [isFocused]);

    // ---------- Dummy Data ---------- //
    // const { challenges } = useRoute().params;
    const showChallengesPair = challengesPair.filter((pair) =>
        selectedOption === "habit"
            ? pair.first.frequency !== null
            : pair.second.frequency === null
    );
    // ---------- Dummy Data ---------- //

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
                <DisplayChallengesProgress challenges={showChallengesPair} />
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
