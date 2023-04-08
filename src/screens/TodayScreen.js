import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, FlatList} from 'react-native';
import CalendarComponent from '../components/CalenderComponent';
import ChallengeComponent from '../components/ChallengeComponent';

function TodayScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    const challenges = [
        {
          title: 'Reading',
          category: 'reading'
        },
        {
          title: 'Exercise',
          category: 'exercise'
        },
        {
          title: 'Meditation',
          category: 'meditation'
        },
        {
            title: 'Wake up early',
            category: 'sleeping'
        },
        {
            title: 'Professional',
            category: 'professional'
        },
        {
            title: 'Networking',
            category: 'social'
          },
      ];

    function handleDayPress(day){
        setSelectedDate(day);
    }

    function renderItem({item}){
        return <ChallengeComponent data={item}/>
    }

    return (
        <View style={styles.screen}>
            <CalendarComponent handleDayPress={handleDayPress}
                            selectedDate={selectedDate}/>
            <View style={styles.flatListView}>
                <FlatList data={challenges}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.challengeContentContainer}>
                </FlatList>
            </View>
        </View>
    );
}

export default TodayScreen;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    challengeContentContainer: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
        //flex: 1,
        margin: 20
    },
    flatListView: {
        flex: 1
    }
  });
