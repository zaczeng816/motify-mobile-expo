import React from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import { Calendar } from 'react-native-calendars';

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
    const {type, isOngoing, startDate, endDate, isCompleted} = challenge;
    let durationText;
    if (type === 'goal' && isCompleted){
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
        type,
        startDate,
        endDate,
        description,
        bestStreak,
        currentStreak,
        category
      } = challenge;

    const challengeCategory = category.substring(0,1).toUpperCase() + category.substring(1);
    const challengeType = type.substring(0,1).toUpperCase() + type.substring(1);

    return (
        <ScrollView style={styles.container}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Check-In History</Text>
            <Calendar
              markedDates={highlightedDates}
              style={styles.calendar}
              theme={{arrowColor: 'orange'}}
            />
          </View>
        </ScrollView>
      );
    };

export default ChallengeDetail;

const styles = StyleSheet.create({
    container: {
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