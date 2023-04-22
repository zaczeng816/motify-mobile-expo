import React, { useState } from "react";
import {View, FlatList, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import ChallengeComponent from "./ChallengeComponent";
import DisplayChallengeModal from "../modals/DisplayChallengeModal";

function DisplayChallenges({challenges}){

  if (challenges.length === 0)
    return;

  const [isChallengeModalVisible, setIsChallengeModalVisible] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);

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

    return (
      <View style={styles.screen}>
        <FlatList data={challenges}
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