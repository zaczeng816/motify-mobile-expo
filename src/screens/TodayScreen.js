import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import CalendarComponent from '../components/CalenderComponent';
import DisplayChallenges from '../components/DisplayChallenges';
import SwitchComponent from '../components/SwitchComponent';


function TodayScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [showCompleted, setShowCompleted] = useState(false);
    const options = [{label: 'To do', value: 'uncompleted'}, {label: 'Completed', value: 'completed'}];

    const challenges = [
        {
            title: 'Reading',
            category: 'reading',
            completed: true,
            type: 'habit',
            frequency: 'week',
            duration: new Date(0, 0, 0, 1, 30)
        },
        {
            title: 'Exercise',
            category: 'exercise',
            completed: false,
            type: 'habit',
            frequency: 'day',

        },
        {
            title: 'Meditation',
            category: 'meditation',
            completed: true,
            type: 'goal'
        },
        {
            title: 'Wake up early',
            category: 'sleeping',
            completed: false,
            type: 'goal'
        },
        {
            title: 'Professional',
            category: 'professional',
            completed: true,
            type: 'goal'
        },
        {
            title: 'Networking',
            category: 'social',
            completed: false,
            type: 'goal'
          },
      ];

    function handleDayPress(day){
        setSelectedDate(day);
    }

    const showChallenges = challenges.filter(challenge => showCompleted ? challenge.completed : !challenge.completed);


    function switchHandler(){
        setShowCompleted(!showCompleted);
    }

    return (
        <View style={styles.screen}>
            <CalendarComponent handleDayPress={handleDayPress}
                            selectedDate={selectedDate}/>
            <View style={styles.challengesContainer} >
                <SwitchComponent options={options} 
                                switchHandler={switchHandler}/>
                <DisplayChallenges challenges={showChallenges}
                                showCompleted={showCompleted}/>
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
        margin: 20
    },
    displayContainer: {
        // flex: 1,
        // backgroundColor: 'red',
        // height: 400
    },

  });
