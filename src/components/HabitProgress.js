import React from "react";
import {Text, View, StyleSheet} from "react-native";
import moment from 'moment';

function HabitProgress({challenge}){
    function displayTime(dateString){
        const duration = moment.duration(dateString);
        const hours = duration.hours();
        const minutes = duration.minutes();

        if (hours === 0 && minutes === 0) {
            return '0 min';
        } else if (hours === 0) {
            return minutes + ' min';
        } else if (minutes === 0) {
            return hours + ' hr';
        } else {
            return hours + ' hr ' + minutes + ' min';
        }
    }

    let showAmount = '';
    let showDuration = '';
    if (challenge.workload.type === 'time'){
        showDuration = displayTime(challenge.workload.duration);
    }
    else {
        const amount = challenge.workload.amount;
        const unit = challenge.workload.unit.toLowerCase();
        showAmount = amount + ' ' + (amount > 1 ? unit + 's' : unit);
    }


    const taskText = challenge.workload.type === 'time'?
                    showDuration : showAmount;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{taskText}</Text>
        </View>
    )
}

export default HabitProgress;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center'
        // marginBottom: 5,
        // marginTop: 10
      },
    text: {
        color: '#666666',
        fontSize: 12,
        fontWeight: 'bold'
    },
    streak: {
        color: '#666666',
        fontSize: 8,
        paddingTop: 5
    }
})
