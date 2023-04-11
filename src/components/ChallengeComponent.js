import Icons from "../constants/Icons";
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeComponent from "./SwipeComponent";
import GoalProgress from "./ChallengeProgress/GoalProgress";
import HabitProgress from "./ChallengeProgress/HabitProgress";

function ChallengeComponent({challenge, onClick}) {
    const {title, category} = challenge;
    const [completed, setCompleted] = useState(false);

    const onSwipeComplete = () => {
      setCompleted(true);
    };

    const renderRightActions = (progress, dragX) => {
      return <SwipeComponent dragX={dragX} 
                            onSwipeComplete={onSwipeComplete}/>
    };

    const endDate = challenge.endDate === null? 
    '': 'Ends: ' + challenge.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    function onClickHandler(){
      onClick(challenge);
    }

    return (
      <TouchableOpacity onPress={onClickHandler}>
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <Image source={Icons[category]} style={styles.icon} />
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.titleWrapper} >
                <Text style={styles.title}>{title}</Text>
              </View>
              {challenge.type === 'habit' && 
                  <View style={styles.streakContainer}>
                    <Text style={styles.streak}>Streak: {challenge.streak} 🌟</Text>
                  </View>}
              {challenge.type === 'goal' && 
                  <View style={styles.progressBarContainer}>
                    <GoalProgress challenge={challenge}/>
                  </View>}
            </View>
            {challenge.type === 'habit' && 
                <HabitProgress challenge={challenge}/>}
          </View>
        </Swipeable>
      </TouchableOpacity>
    );
}

export default ChallengeComponent;

const styles = StyleSheet.create({
  container: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  iconContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#b3b3b3',
    fontWeight: 'bold',
    marginTop: 10
  },
  progressBarContainer: {
    alignItems: 'flex-start',
    marginBottom: 5
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  titleWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  streak: {
    color: '#666666',
    fontSize: 8,
    paddingTop: 5,
  },
  streakContainer: {
    flex: 1,
    marginTop: -20,
    alignItems: 'flex-start',
    marginBottom: 20
  }
});
