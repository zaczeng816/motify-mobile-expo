import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressCircle from "react-native-progress-circle";
//import ProgressBar from 'react-native-progress/Bar';
import * as Progress from "react-native-progress";

function GoalProgress({ challenge, color }) {
    const [percent, setPercent] = useState(0);
    const [progressText, setProgressText] = useState("");

    useEffect(() => {
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

        if (challenge.amountType === "duration") {
            setPercent(
                getMinute(challenge.accomplished) /
                    getMinute(challenge.duration)
            );
            setProgressText(
                displayTime(challenge.accomplished) +
                    " / " +
                    displayTime(challenge.duration)
            );
        } else if (challenge.amountType === "times") {
            const unitText =
                challenge.amount > 1 ? challenge.unit + "s" : challenge.unit;
            setPercent(challenge.accomplished / challenge.amount);
            setProgressText(
                challenge.accomplished +
                    " / " +
                    challenge.amount +
                    " " +
                    unitText
            );
        }
    }, []);

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
