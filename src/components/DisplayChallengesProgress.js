import Icons from "../constants/Icons";
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import GoalProgress from "./GoalProgress";
import HabitProgress from "./HabitProgress";
import { SwipeListView } from 'react-native-swipe-list-view';
import DisplayChallengeModal from "../modals/DisplayChallengeModal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EnterAmountModal from "../modals/EnterAmountModal";
import NoChallenge from "./NoChallenge";
import {checkIn, getOneSelfParticipation, unCheckIn} from "../api/ParticipationAPI";
import {AuthContext} from "../contexts/AuthContext";
import {useIsFocused} from "@react-navigation/native";

const HiddenButtonContent = ({isHabit, completed}) => {
  if (isHabit){
      if (completed){
        return <Text style={styles.undoText}>Undo</Text>;
      }
      return <Ionicons name='checkmark' size={50} color='white'/>
  }
  return <Ionicons name='add' size={50} color='white'/>
}

function DisplayChallengesProgress({challenge_pairs}) {
    if (challenge_pairs.length === 0){
      return <NoChallenge />
    }

    const [isChallengeModalVisible, setIsChallengeModalVisible] = useState(false);
    const [challengesPairList, setChallengesPairList] = useState(sortChallenges(challenge_pairs));
    const [currentChallenge, setCurrentChallenge] = useState(challengesPairList[0].first);
    const [isEnterAmountModalVisible, setIsEnterAmountModalVisible] = useState(false);
    const {token} = useContext(AuthContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getParticipation = async () => {
            for (let i=0; i<challenge_pairs.length; i++) {
                const challenge = challenge_pairs[i].first
                const participation = await getOneSelfParticipation(token, challenge.id);

                const {isActive, isQuantity, progress, durationProgress, completedDates, streak} = participation;

                challenge.isActive = isActive;
                challenge.isQuantity = isQuantity;
                challenge.progress = progress;
                challenge.durationProgress = durationProgress;
                challenge.completedDates = completedDates;
                challenge.streak = streak;
                challenge_pairs[i].first = challenge;
            }
        }
        getParticipation().then(() => {
            setChallengesPairList(sortChallenges(challenge_pairs));
        })

    }, [isFocused, challenge_pairs])

    function sortChallenges(challengePairs) {
      return challengePairs.sort((a, b) => {
        if (!a.first.isActive && b.first.isActive) {
          return 1;
        }
        if (a.first.isActive && !b.first.isActive) {
          return -1;
        }
        return 0;
      });
    }

    function onPressHiddenButton(challengePair, rowMap, data){
        const challenge = challengePair.first;
        const isCompleted = !challengePair.second;
      rowMap[challenge.name].closeRow();
      if (challenge.frequency){ //is habit
          const checkInToggler = async () => {
              if (isCompleted){
                  await unCheckIn(token, challenge.id);
              }
              else{
                  const body = {
                      challengeId: challenge.id,
                      amount: null,
                      duration: null
                  }
                  await checkIn(token, body);
              }
          }
          checkInToggler().then(() => {
              setTimeout(() => {
                  setChallengesPairList((prevState) => {
                      const updatedChallenges = prevState.map((item) => {
                          //     if (item.name === challenge.name){
                          //       return {...item, isCompleted: !item.isCompleted};
                          //     }
                          //     return item;
                          //   });
                          //   return sortChallenges(updatedChallenges);
                          // });
                          return item.second = !item.second;
                      })
                      return sortChallenges(updatedChallenges);
                  })
              }, 200);
          })
      }
      else{ //is goal
          openAmountModal();
          setCurrentChallenge(data.item);
      }
    }

    const renderHiddenItem = (data, rowMap) => {
      const challenge = data.item.first;
      const isHabit = challenge.frequency !== null;
      const completed = data.item.second;
      const buttonColor = (isHabit && completed)? '#ff3b30': 'green';

      return(
            <View style={styles.hiddenItem}>
              <TouchableOpacity
                style={[styles.hiddenButton, {backgroundColor: buttonColor}]}
                onPress={() => onPressHiddenButton(data.item, rowMap, data)}
              >
              <HiddenButtonContent isHabit={isHabit} completed={completed}/>
              </TouchableOpacity>
            </View>
      )
    };

    const renderItem = ({item}) => {
      const challenge = item.first;
      const crossedOut = item.second;
      const {name, category, streak} = challenge;
      const isHabit = challenge.frequency !== null;
      const titleLength = challenge.name.length;
      const fontSize = titleLength > 23? 12: (titleLength > 15 ? 14: 16);

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
                    <Text style={[styles.title, {fontSize: fontSize},crossedOut? styles.crossedOut: null]}>
                      {name}
                    </Text>
                  </View>
                  {isHabit &&
                      <View style={styles.streakContainer}>
                        <Text style={styles.streak}>Streak: {streak} 🌟</Text>
                      </View>}
                  {!isHabit &&
                      <View style={styles.progressBarContainer}>
                        <GoalProgress challenge={challenge} color='default'/>
                      </View>}
                </View>
                {isHabit &&
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
    }

    async function submitAmountHandler(inputValue){
        const isTimeBased = currentChallenge.workload.type === 'time';
        const addedAmount = isTimeBased? null : inputValue;
        const addedDuration = isTimeBased? inputValue : null;

        const body = {
            challengeId: currentChallenge.id,
            amount: addedAmount,
            duration: addedDuration,
        }
        await checkIn(token, body);
    }

    return (
      <View style={{flex: 1}}>
        <SwipeListView
          data={challengesPairList}
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
                        hideModal={closeAmountModal}
                        onSubmit={submitAmountHandler}/>
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
    textAlign: 'left',
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
