import Icons from "../constants/Icons";
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwipeComponent from "./SwipeComponent";

function ChallengeComponent({challenge, showCompleted}) {
    const {title, category} = challenge;
    const [completed, setCompleted] = useState(false);

    const onSwipeComplete = () => {
      setCompleted(true);
    };

    const renderRightActions = (progress, dragX) => {
      return <SwipeComponent dragX={dragX} 
                            onSwipeComplete={onSwipeComplete}
                            showCompleted={showCompleted}/>
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <Image source={Icons[category]} style={styles.icon} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </Swipeable>
    );
}

export default ChallengeComponent;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginVertical: 5,
  },
  iconContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // progressContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // progressBar: {
  //   height: 10,
  //   backgroundColor: '#007AFF',
  //   marginRight: 5,
  //   borderRadius: 5,
  // },
  // progressText: {
  //   fontSize: 14,
  //   fontWeight: 'bold',
  // },
});


