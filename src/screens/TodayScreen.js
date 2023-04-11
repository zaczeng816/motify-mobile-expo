import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import CalendarComponent from '../components/CalenderComponent';
import DisplayChallenges from '../components/DisplayChallenges';
import SwitchComponent from '../components/SwitchComponent';


function TodayScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedOption, setSelectedOption] = useState('habit');
    const options = [{label: 'Habit', value: 'habit'}, {label: 'Goal', value: 'goal'}];

    const challenges = [
        {
            title: 'Reading',
            category: 'reading',
            completed: true,
            type: 'habit',
            amountType: 'duration',
            frequency: 'week',
            duration: new Date(0, 0, 0, 0, 30),
            endDate: new Date(2023, 4, 20, 0, 0)
        },
        {
            title: 'Running',
            category: 'exercise',
            completed: false,
            type: 'habit',
            amountType: 'times',
            frequency: 'day',
            amount: 5,
            unit: 'mile',
            endDate: new Date(2023, 4, 25, 0, 0)
        },
        {
            title: 'Meditation',
            category: 'meditation',
            completed: true,
            type: 'goal',
            amountType: 'duration',
            duration: new Date(0, 0, 0, 2, 0),
            accomplished: new Date(0, 0, 0, 0, 5),
            endDate: null
        },
        {
            title: 'Wake up early',
            category: 'sleeping',
            completed: false,
            type: 'habit',
            frequency: 'day',
            amountType: 'times',
            amount: 1,
            unit: 'time',
            endDate: null
        },
        {
            title: 'Professional',
            category: 'professional',
            completed: true,
            type: 'goal',
            amountType: 'duration',
            duration: new Date(0, 0, 0, 10, 0),
            accomplished: new Date(0, 0, 0, 4, 0),
            endDate: new Date(2024, 6, 2, 0, 0)
        },
        {
            title: 'Networking',
            category: 'social',
            completed: false,
            type: 'goal',
            amountType: 'times',
            amount: 3,
            unit: 'time',
            accomplished: 3,
            endDate: null
          },
        {
            title: 'Save money',
            category: 'finance',
            completed: false,
            type: 'goal',
            amountType: 'times',
            amount: 100,
            unit: 'dollar',
            accomplished: 62,
            endDate: null
        }
      ];

    function handleDayPress(day){
        setSelectedDate(day);
    }

    const showChallenges = challenges.filter(challenge => selectedOption === 'habit' ? challenge.type === 'habit': challenge.type === 'goal');

    function switchHandler(value){
        setSelectedOption(value);
    }

    return (
        <View style={styles.screen}>
            <CalendarComponent handleDayPress={handleDayPress}
                            selectedDate={selectedDate}/>
            <View style={styles.challengesContainer} >
                <SwitchComponent options={options} 
                                switchHandler={switchHandler}/>
                <DisplayChallenges challenges={showChallenges}/>
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
