import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { Calendar } from 'react-native-calendars';
import {AuthContext} from "../contexts/AuthContext";
import {getOneSelfParticipation} from "../api/ParticipationAPI";
import {useIsFocused} from "@react-navigation/native";

const highlightedDates = {
  '2023-05-01': { selected: true, selectedColor: 'orange'},
  '2023-05-15': { selected: true, selectedColor: 'orange'},
  '2023-04-23': { selected: true, selectedColor: 'orange'},
  '2023-04-24': { selected: true, selectedColor: 'orange'},
  '2023-04-25': { selected: true, selectedColor: 'orange'},
};

function formatDate(date){
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

function Duration({challenge}){
    const {frequency, isOngoing, startDate, endDate, isActive} = challenge;
    let durationText;
    if (!frequency && isActive){
        durationText = 'Completed';
    }
    else if (isOngoing){
        durationText = formatDate(startDate) + ' - Present';
    }
    else{
        durationText = formatDate(startDate) + ' - ' + formatDate(endDate);
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Duration</Text>
            <Text style={styles.sectionText}>{durationText}</Text>
        </View>
    )
}


function ChallengeDetail({challenge}){

    const {
        frequency,
        startDate,
        endDate,
        description,
        streak,
        category
      } = challenge;

    const challengeCategory = category.substring(0,1).toUpperCase() + category.substring(1).toLowerCase();
    const challengeType = frequency? 'Habit' : 'Goal';
    const [hasJoinedChallenge, setHasJoinedChallenge] = useState(false)
    const [checkInDates, setCheckInDates] = useState([])
    const { token } = useContext(AuthContext);
    const isFocus = useIsFocused();

    useEffect(() => {
        const callApi = async () => {
            return await getOneSelfParticipation(token, challenge.id);
        }
        callApi().then(res => {
            if (res){
                let markedDates = {}
                for (const date in res.completedDates){
                    markedDates[date.slice(0,10)] = { selected: true, selectedColor: 'orange'}
                }
                setHasJoinedChallenge(true);
                setCheckInDates(markedDates);
            }
        })

    }, [isFocus]);

    return (
      <View style={styles.outerContainer}>
        <ScrollView style={styles.container}>
        {/* <View style={styles.container}> */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Type</Text>
            <Text style={styles.sectionText}>{challengeType}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <Text style={styles.sectionText}>{challengeCategory}</Text>
          </View>
          <Duration challenge={challenge} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{description}</Text>
          </View>
          {hasJoinedChallenge &&
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Check-In History</Text>
              <Calendar
                markedDates={checkInDates}
                style={styles.calendar}
                theme={{arrowColor: 'orange'}}
              />
            </View>
          }
        </ScrollView>
      </View>
      );
    };

export default ChallengeDetail;

const styles = StyleSheet.create({
    outerContainer:{
      backgroundColor: 'orange',
      // borderWidth: 2,
      margin: -1,
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: 10,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 20,
      paddingHorizontal: 30,
      height: '60%',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'orange',
      marginBottom: 5,
    },
    sectionText: {
        color: 'rgb(60, 60, 60)',
        fontSize: 16,
        lineHeight: 22,
    },
    calendar: {
      marginTop: 20,
      marginBottom: 50,
      borderColor: 'orange',
    },
  });
