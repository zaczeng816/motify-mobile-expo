import React, {useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressCircle from "react-native-progress-circle";
//import ProgressBar from 'react-native-progress/Bar';
import * as Progress from "react-native-progress";
import {getOneSelfParticipation} from "../api/ParticipationAPI";
import {AuthContext} from "../contexts/AuthContext";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";

function GoalProgress({ challenge, color }) {
    const [percent, setPercent] = useState(0);
    const [progressText, setProgressText] = useState("");
    const [completedAmount, setCompletedAmount] = useState(0)
    const [completedDuration, setCompletedDuration] = useState(new Date(0,0,0,0,0,0))
    const {token} = useContext(AuthContext)
    const isFocused = useIsFocused()

    function getMinute(date) {
        return date.getHours() * 60 + date.getMinutes();
    }

    function displayTime(date) {
        let duration = getMinute(date);
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        let res = hours === 0 ? "" : hours + "h ";
        res += minutes === 0 ? "" : minutes + "m";
        if (res === "") return "0m";
        return res;
    }

    useEffect(() => {
        getOneSelfParticipation(token, challenge.id).then(res => {
            if (challenge.workload.type === 'quantity'){
                setCompletedAmount(res.progress)
            }
            else{
                const duration = moment.duration(res.durationProgress);
                const hour = duration.hours();
                const minute = duration.minutes()
                const date = new Date();
                date.setHours(hour);
                date.setMinutes(minute);
                setCompletedDuration(date);
                console.log(completedDuration);
            }

            displayTime(completedDuration);
            if (challenge.workload.type === 'time') {
                setPercent(
                    getMinute(completedDuration) /
                    getMinute(challenge.workload.duration)
                );
                setProgressText(
                    displayTime(completedDuration) +
                    " / " +
                    displayTime(challenge.workload.duration)
                );
            } else{
                const unitText =
                    challenge.workload.amount > 1 ? challenge.workload.unit + "s" : challenge.workload.unit;
                setPercent(completedAmount / challenge.workload.amount);
                setProgressText(
                    completedAmount +
                    " / " +
                    challenge.workload.amount +
                    " " +
                    unitText
                );
            }
         });
     }, [challenge]);

    const defaultColor =
        percent < 0.1 ? "red" : percent < 0.5 ? "#fcc000" : "#0ca40e";
    var barColor = color === "default" ? defaultColor : color;
    const textColor = color === "default" ? "#808080" : "white";
    const unfilledColor = color === "default" ? "#D3D3D3" : "#d9d9d9";

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <Progress.Bar
                    progress={percent}
                    color={barColor}
                    unfilledColor={unfilledColor}
                    borderWidth={0}
                />
                <Text style={[styles.progressText, { color: textColor }]}>
                    {progressText}
                </Text>
            </View>
        </View>
    );
}

export default GoalProgress;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        //alignItems: 'flex-end',
        alignItems: "center",
        //marginTop: 20,
        //justifyContent: 'right'
    },
    progressText: {
        fontSize: 10,
        //fontWeight: 'bold',
        marginVertical: 5,
    },
    progressBarContainer: {
        width: "80%",
    },
});
