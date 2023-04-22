import Icons from "../constants/Icons";
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PanResponder, TouchableHighlight, Image, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeComponent from "./SwipeComponent";
import GoalProgress from "./GoalProgress";
import HabitProgress from "./HabitProgress";
import { SwipeListView } from 'react-native-swipe-list-view';
import DisplayChallengeModal from "../modals/DisplayChallengeModal";

function DisplayChallengesProgress({challenges}) {
    const [completed, setCompleted] = useState(false);
    const [isChallengeModalVisible, setIsChallengeModalVisible] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);

    const onSwipeComplete = () => {
      setCompleted(true);
    };

    const renderHiddenItem = (data, rowMap) => (
      <View style={styles.hiddenItem}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => console.log('Delete', data.item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({item}) => {
      const challenge = item;
      const {title, category} = challenge;

      return(
        <View style={styles.container}>
          <TouchableOpacity onPress={() => onClickHandler(challenge)}>
            <View style={styles.challengeContainer}>
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
                        <GoalProgress challenge={challenge} color='default'/>
                      </View>}
                </View>
                {challenge.type === 'habit' && 
                    <HabitProgress challenge={challenge}/>}
              </View>
          </TouchableOpacity>
        </View>
      )
    }

    function onClickHandler(challenge){
        setCurrentChallenge(challenge);
        setIsChallengeModalVisible(true);
    }

    function closeChallengeModal(){
      setIsChallengeModalVisible(false);
    }

    return (
      <View style={{flex: 1}}>
        <SwipeListView
          data={challenges}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.listContainer}
        />
        <DisplayChallengeModal challenge={currentChallenge}
                        isModalVisible={isChallengeModalVisible}
                        hideModal={closeChallengeModal}/>
      </View>
    );
}

export default DisplayChallengesProgress;

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  container:{
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginVertical: 5,
  },
  challengeContainer: {
    height: 110,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',

    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  iconContainer: {
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
  },
  hiddenItem: {
    height: 100,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    padding: 5,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderRadius: 20,
    height: '100%',
  },
  deleteText: {
    color: '#ffffff',
  },
});
