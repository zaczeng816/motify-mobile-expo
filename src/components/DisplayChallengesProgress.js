import Icons from "../constants/Icons";
import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import GoalProgress from "./GoalProgress";
import HabitProgress from "./HabitProgress";
import { SwipeListView } from 'react-native-swipe-list-view';
import DisplayChallengeModal from "../modals/DisplayChallengeModal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EnterAmountModal from "../modals/EnterAmountModal";
import NoChallenge from "./NoChallenge";

const HiddenButtonContent = ({isHabit, completed}) => {
  if (isHabit){
      if (completed){
        return <Text style={styles.undoText}>Undo</Text>;
      }
      return <Ionicons name='checkmark' size={50} color='white'/>
  }
  return <Ionicons name='add' size={50} color='white'/>
}

function DisplayChallengesProgress({challenges}) {
    if (challenges.length === 0){
      return <NoChallenge />
    }

    const [isChallengeModalVisible, setIsChallengeModalVisible] = useState(false);
    const [challengesList, setChallengesList] = useState(sortChallenges(challenges));
    const [currentChallenge, setCurrentChallenge] = useState(challengesList[0]);
    const [isEnterAmountModalVisible, setIsEnterAmountModalVisible] = useState(false);


    useEffect(() => {
      setChallengesList(sortChallenges(challenges));
    },[challenges])

    function sortChallenges(challenges) {
      return challenges.sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) {
          return 1;
        }
        if (!a.isCompleted && b.isCompleted) {
          return -1;
        }
        return 0;
      });
    }

    function onPressHiddenButton(challenge, rowMap, data){
      rowMap[data.item.title].closeRow();
      if (challenge.type === 'habit'){
        setTimeout(() => {
          setChallengesList((prevState) => {
            const updatedChallenges = prevState.map((item) => {
              if (item.title === challenge.title){
                return {...item, isCompleted: !item.isCompleted};
              }
              return item;
            });
            return sortChallenges(updatedChallenges);
          });
        }, 200);
      }
      else if (challenge.type === 'goal'){
          openAmountModal();
          setCurrentChallenge(data.item);
      }
    }

    const renderHiddenItem = (data, rowMap) => {
      const challenge = data.item;
      const isHabit = challenge.type === 'habit';
      const completed = challenge.isCompleted;
      const buttonColor = (isHabit && completed)? '#ff3b30': 'green';

      return(
            <View style={styles.hiddenItem}>
              <TouchableOpacity
                style={[styles.hiddenButton, {backgroundColor: buttonColor}]}
                onPress={() => onPressHiddenButton(challenge, rowMap, data)}
              >
              <HiddenButtonContent isHabit={isHabit} completed={completed}/>
              </TouchableOpacity>
            </View>
      )
    };

    const renderItem = ({item}) => {
      const challenge = item;
      const {title, category} = challenge;
      const crossedOut = challenge.isCompleted && challenge.type === 'habit';

      return(
        <View style={styles.container}>
          <TouchableOpacity onPress={() => onClickHandler(challenge)}>
          <View style={[styles.challengeContainer,
              crossedOut? styles.completedChallenge : null]}>
                <View style={styles.iconContainer}>
                  <Image source={Icons[category]} style={styles.icon} />
                </View>
                <View style={styles.detailContainer}>
                  <View style={styles.titleWrapper} >
                    <Text style={[styles.title, crossedOut? styles.crossedOut: null]}>
                      {title}
                    </Text>
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

    function openAmountModal(){
      setIsEnterAmountModalVisible(true);
    }

    function closeAmountModal(){
      setIsEnterAmountModalVisible(false);
    };

    return (
      <View style={{flex: 1}}>
        <SwipeListView
          data={challengesList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.listContainer}
        />
        <DisplayChallengeModal challenge={currentChallenge}
                        isModalVisible={isChallengeModalVisible}
                        hideModal={closeChallengeModal}/>
        <EnterAmountModal challenge={currentChallenge}
                        isModalVisible={isEnterAmountModalVisible}
                        hideModal={closeAmountModal}/>
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
    marginTop: 5,
    height: 110,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    padding: 5,
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderRadius: 20,
    height: '100%',
  },
  // hiddenButtons:{
  //   flexDirection: 'row',
  //   alignContent: 'flex-end',
  //   justifyContent: 'flex-end'
  // },
  undoText: {
    color: '#ffffff',
  },
  completedChallenge: {
    opacity: 0.7
  },
  crossedOut: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'grey',
    color: 'grey'
  },
});
