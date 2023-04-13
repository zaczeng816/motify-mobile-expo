import React from "react";
import { View, Text, StyleSheet} from "react-native";
import DiscussionButton from "./buttons/DiscussionButton";

function ChallengeDetail({challenge, showDiscussion}){
    const exampleChallenge = {
        title: 'Morning Jog',
        startDate: new Date('2023-04-01'),
        endDate: new Date('2023-04-30'),
        description: 'Jog for 30 minutes every morning before 8 am.',
        bestStreak: 10,
        currentStreak: 5,
    };

    const {
        title,
        startDate,
        endDate,
        description,
        bestStreak,
        currentStreak,
      } = exampleChallenge;

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
            <View style={styles.dateContainer}>
                <Text style={styles.date}>
                    Start Date: {formatDate(startDate)}
                </Text>
                <Text style={styles.date}>
                    End Date: {formatDate(endDate)}
                </Text>
            </View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.streakContainer}>
                <Text style={styles.streak}>
                    Best Streak: {bestStreak}
                </Text>
                <Text style={styles.streak}>
                    Current Streak: {currentStreak}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                {challenge.private === false && <DiscussionButton challenge={challenge} onPress={showDiscussion}/>}
            </View>
        </View>
      );
    };

export default ChallengeDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        flex: 1,
        margin: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    date: {
        fontSize: 16,
        color: 'grey',
    },
    description: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 15,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    streakContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    streak: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'orange',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    }
});