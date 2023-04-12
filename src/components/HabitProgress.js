import React from "react";
import {Text, View, StyleSheet} from "react-native";

function HabitProgress({challenge}){
    function displayTime(date){
        const hours = date.getHours();
        const minutes = date.getMinutes();
        if (hours == 0){
            return minutes + ' min';
        }
        return hours + ':' + minutes.toString().padStart(2, '0') + ' hr';
    }
    const unit = challenge.amount + ' ' + (challenge.amount > 1? challenge.unit + 's': challenge.unit);

    const taskText = challenge.amountType === 'duration'? 
                    displayTime(challenge.duration) : unit;

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