import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';


function HabitDetail({challenge}){
    function displayTime(){
        const durationString = challenge.workload.duration;
        const duration = moment.duration(durationString);
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

    function displayAmount(){
        const unit = challenge.workload.amount > 1? challenge.workload.unit + 's': challenge.workload.unit;
        return challenge.workload.amount + ' ' + unit;
    }

    const frequencyText = (challenge.workload.type === 'time'?
                    displayTime(): displayAmount()) + ' every ' + challenge.frequency.toLowerCase();
    return (
        <View style={styles.container}>
            <Text style={styles.frequencyText}>{frequencyText}</Text>
        </View>
    )
}

export default HabitDetail;

const styles = StyleSheet.create({
    streak: {
        color: 'white',
        fontSize: 12,
        paddingTop: 5,
        marginRight: 20,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'flex-start',
        //borderWidth: 2,
        marginBottom: 30,
        marginLeft: 30,
        alignItems: 'flex-start'
    },
    frequencyText: {
        color: 'white',
        fontSize: 12,
        paddingTop: 5,
        fontWeight: 'bold'
    }
})
