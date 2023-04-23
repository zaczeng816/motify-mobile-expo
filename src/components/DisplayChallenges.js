import React, { useEffect, useState } from "react";
import {View, FlatList, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import ChallengeComponent from "./ChallengeComponent";
import DisplayChallengeModal from "../modals/DisplayChallengeModal";
import NoChallenge from "./NoChallenge";

function DisplayChallenges({challenges}){

  if (challenges.length === 0)
    return;

  const [isChallengeModalVisible, setIsChallengeModalVisible] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
  const [challengesList, setChallengesList] = useState(sortChallenges(challenges));

  useEffect(() => {
    setChallengesList(sortChallenges(challenges));
  }, [challenges])

  function onClick(challenge){
      setCurrentChallenge(challenge)
      setIsChallengeModalVisible(true);
  }

  function closeChallengeModal(){
      setIsChallengeModalVisible(false);
  }

  function renderItem({item}){
    return <ChallengeComponent challenge={item} onClick={onClick}/>
  }

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

    return (
      <View style={styles.screen}>
        <FlatList data={challengesList}
                renderItem={renderItem}
                style={styles.flatListContainer}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.challengeContentContainer} />
        <DisplayChallengeModal challenge={currentChallenge}
                              isModalVisible={isChallengeModalVisible}
                              hideModal={closeChallengeModal}/>
      </View>
    )
}

export default DisplayChallenges;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  challengeContentContainer: {
    flexGrow: 1,
  },
});