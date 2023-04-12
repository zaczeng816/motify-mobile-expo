import React from "react";
import {View, Text, StyleSheet} from 'react-native';

function HabitDetail({challenge}){
    function displayTime(){
        const hours = challenge.duration.getHours();
        const minutes = challenge.duration.getMinutes();
        if (hours == 0){
            return minutes + ' min';
        }
        return hours + ':' + minutes.toString().padStart(2, '0') + ' hr';
    }

    function displayAmount(){
        const unit = challenge.amount > 1? challenge.unit + 's': challenge.unit;
        return challenge.amount + ' ' + unit;
    }

    const frequencyText = (challenge.amountType === 'duration'? 
                    displayTime(): displayAmount()) + ' every ' + challenge.frequency;
    return (
        <View style={styles.container}> 
            <Text style={styles.frequencyText}>{frequencyText}</Text>
            {/* <Text style={styles.streak}>Streak: {challenge.streak} 🌟</Text> */}
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