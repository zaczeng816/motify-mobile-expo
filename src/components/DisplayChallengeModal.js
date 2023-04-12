import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, StatusBar, Modal, Animated, Dimensions, StyleSheet, useState, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GoalDetail from "./GoalDetail";
import HabitDetail from "./HabitDetail";
import BackButton from "./BackButton";
import Icons from "../constants/Icons";
import HabitProgress from "./HabitProgress";

const screenHeight = Dimensions.get('window').height;
const topHeight = screenHeight * 0.5;
const topColor = 'orange';

function DisplayChallenges({isModalVisible, hideModal, challenge}){
    function getFontSize() {
        const length = challenge.title.length;
        if (length <= 10) {
          return 26;
        } else if (length > 10 && length <= 20) {
          return 20;
        } else {
          return 16;
        }
    }

    function goBack(){
        hideModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
            >
            <View style={styles.container}>
                <StatusBar backgroundColor={topColor} />
                <View style={[styles.top, {backgroundColor: topColor}]}>
                    <View style={styles.topDetail}>
                        <View style={styles.topHeader}>
                            <BackButton onPress={goBack} style={styles.backButton} />
                            <Text style={[styles.title, {fontSize: getFontSize()}]}>{challenge.title}</Text>
                            {challenge.type === 'goal' && <GoalDetail challenge={challenge}/>}
                            {challenge.type === 'habit' && <HabitDetail challenge={challenge}/>}
                        </View>
                        <View style={styles.iconContainer}>
                            <Image source={Icons[challenge.category]} style={styles.icon} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}></View>
            </View>
        </Modal>
    )
}

export default DisplayChallenges;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    bottom: {
      flex: 0.7,
      //backgroundColor: '#808080',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 30,
        //borderWidth: 2,
        //marginBottom: 20
    },
    topHeader: {
        //borderWidth: 2,
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'flex-start',
    },
    backButton: {
        flex: 1,
    },
    topDetail: {
        flexDirection: 'row',
        flex: 4
    },
    iconContainer: {
        //borderWidth: 2,
        //marginLeft: 20,
        marginRight: 10,
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    icon: {
        width: 100,
        height: 100,
    },
});