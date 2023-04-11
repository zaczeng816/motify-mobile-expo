import Icons from "../constants/Icons";
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeComponent from "./SwipeComponent";
import ChallengeProgress from "./ChallengeProgress/ChallengeProgress";
import GoalProgress from "./ChallengeProgress/GoalProgress";
import HabitProgress from "./ChallengeProgress/HabitProgress";

function ChallengeComponent({challenge}) {
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

    return (
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.container}>
            {/* <View style={styles.contentContainer}> */}
              <View style={styles.iconContainer}>
                <Image source={Icons[category]} style={styles.icon} />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                {/* <Text style={styles.dateText}>{endDate}</Text> */}
              </View>
              {/* <View>
                <ChallengeProgress style={styles.progressContainer}
                                  challenge={challenge}/>
              </View> */}
              {challenge.type === 'habit' && 
                <HabitProgress challenge={challenge}/>}
            {/* </View> */}
            {challenge.type === 'goal' && <GoalProgress challenge={challenge} />}
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
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    //marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center'
  },
  // date: {
  //   position: 'absolute',
  //   bottom: 10,
  //   right: 10
  // },
  dateText: {
    fontSize: 6,
    color: '#b3b3b3',
    fontWeight: 'bold',
    marginTop: 10
  }
});


// const styles = StyleSheet.create({
//   container: {
//     height: 120,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#F8F8F8',
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   contentContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginRight: 20
//   },
//   iconContainer: {
//     backgroundColor: '#FFF',
//     padding: 10,
//     borderRadius: 10,
//     marginRight: 20,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dateText: {
//     fontSize: 12,
//     color: '#b3b3b3',
//     fontWeight: 'bold',
//     marginTop: 10
//   },
//   progressBarContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   }
// });
