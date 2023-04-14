import React from "react";
import { View, Text, StyleSheet} from "react-native";
import DiscussionButton from "./buttons/DiscussionButton";

function ChallengeDetail({challenge}){

    const {
        title,
        startDate,
        endDate,
        description,
        bestStreak,
        currentStreak,
        category
      } = challenge;

    // function getDescription(){
    //     if (challenge.description !== null){
    //         return challenge.description;
    //     }
    //     return 'This is a description of the challenge.';
    // }

    function formatDate(date){
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    };
    

    return (
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <Text style={styles.sectionText}>{category}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Start Date</Text>
            <Text style={styles.sectionText}>{formatDate(startDate)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>End Date</Text>
            <Text style={styles.sectionText}>{formatDate(endDate)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{description}</Text>
          </View>
          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Streak</Text>
            <Text style={styles.sectionText}>{currentStreak}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Streak</Text>
            <Text style={styles.sectionText}>{bestStreak}</Text>
          </View> */}
        </View>
      );
    };

export default ChallengeDetail;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         flex: 1,
//         margin: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 15,
//     },
//     dateContainer: {
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         marginBottom: 15,
//     },
//     date: {
//         fontSize: 16,
//         color: 'grey',
//     },
//     description: {
//         fontSize: 18,
//         textAlign: 'justify',
//         marginBottom: 15,
//     },
//     descriptionTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     streakContainer: {
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//     },
//     streak: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'orange',
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 50,
//         alignSelf: 'center'
//     }
// });

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
        color: 'grey',
        fontSize: 16,
        lineHeight: 22,
    },
  });