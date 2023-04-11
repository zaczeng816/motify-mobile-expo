import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions, Button} from 'react-native';
import CalendarComponent from '../components/CalenderComponent';
import DisplayChallenges from '../components/DisplayChallenges';
import SwitchComponent from '../components/SwitchComponent';
import AddButton from '../components/AddButton';


function TodayScreen() {
    const navigation = useNavigation();
    const screenHeight = Dimensions.get('window').height;
    const paddingTop = 0.08 * screenHeight;
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedOption, setSelectedOption] = useState('habit');
    const options = [{label: 'Habit', value: 'habit'}, {label: 'Goal', value: 'goal'}];

    function onAddHandler(){
        navigation.navigate('Create Challenge');
    }
    function onClickChallengeHandler(challenge){
        navigation.navigate('Display Challenge', {challenge: challenge});
    }
    const challenges = [
        {
            title: 'Reading',
            category: 'reading',
            completed: true,
            type: 'habit',
            amountType: 'duration',
            frequency: 'week',
            duration: new Date(0, 0, 0, 0, 30),
            endDate: new Date(2023, 4, 20, 0, 0),
            streak: 5
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
            endDate: new Date(2023, 4, 25, 0, 0),
            streak: 10
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
            endDate: null,
            streak: 1
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

    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();
    
    function setMonth(month){
        setCurrentMonth(month);
    }

    function setYear(year){
        setCurrentYear(year);
    }

    function switchHandler(value){
        setSelectedOption(value);
    }

    return (
        <View style={styles.screen}>
            <View style={[styles.header, {paddingTop}]}>
                <View>
                    <Text style={styles.todayText}>Today</Text>
                    <Text style={styles.dateText}>{currentMonth} {currentYear}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AddButton onPress={onAddHandler}/>
                </View>
            </View>
            <CalendarComponent handleDayPress={handleDayPress}
                            selectedDate={selectedDate}
                            setMonth={setMonth}
                            setYear={setYear}/>
            <View style={styles.challengesContainer} >
                <SwitchComponent options={options} 
                                switchHandler={switchHandler}/>
                <DisplayChallenges challenges={showChallenges}
                                onClick={onClickChallengeHandler}/>
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
    header: {
        //backgroundColor: '#FFF',
        paddingLeft: 30,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    todayText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        //fontFamily: 'Times New Roman'
    },
    dateText: {
        paddingTop: 10,
        fontSize: 15,
        color: '#b6b7b6',
        fontWeight: 'bold',
        fontFamily: 'Arial'
    },
    buttonContainer: {
        paddingRight: 30,
        alignContent: 'center',
        justifyContent: 'center'
    }
  });
