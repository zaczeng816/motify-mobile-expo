import React, {useState} from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, StatusBar, Modal, Animated, Dimensions, StyleSheet, Image} from "react-native";
import GoalDetail from "../components/GoalDetail";
import HabitDetail from "../components/HabitDetail";
import IconButton from "../components/buttons/IconButton";
import Icons from "../constants/Icons";
import HabitProgress from "../components/HabitProgress";
import ChallengeDetail from "../components/ChallengeDetail";
import NewChallengeModal from "./NewChallengeModal";
import EditChallengeModal from "./EditChallengeModal";
import DiscussionModal from "./DiscussionModal";

const screenHeight = Dimensions.get('window').height;
const topHeight = screenHeight * 0.5;
const topColor = 'orange';
const titleMarginTop = screenHeight * 0.15;

function DisplayChallenges({isModalVisible, hideModal, challenge}){
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDiscussionModalVisible, setIsDiscussionModalVisible] = useState(false);

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

    function showSetting(){
        setIsEditModalVisible(true)
    }

    function hideEditModal(){
        setIsEditModalVisible(false);
    }

    function hideDiscussionModal(){
        setIsDiscussionModalVisible(false);
    }

    function showDiscussion(){
        setIsDiscussionModalVisible(true);
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
                    <View style={styles.backButtonContainer}>
                        <IconButton onPress={goBack} iconName={'chevron-back-outline'}/>
                    </View>
                    <View style={styles.editButtonContainer}>
                        <IconButton onPress={showSetting} iconName={'create-outline'}/>
                    </View>
                    <DiscussionModal challenge={challenge}
                                    isModalVisible={isDiscussionModalVisible}
                                    hideModal={hideDiscussionModal}/>
                    <EditChallengeModal challenge={challenge}
                                        isModalVisible={isEditModalVisible}
                                        hideModal={hideEditModal}/>
                    <View style={styles.topDetail}>
                        <View style={styles.topHeader}>
                            <Text style={[styles.title, {fontSize: getFontSize()}, {marginTop: titleMarginTop}]}>
                                        {challenge.title}</Text>
                            {challenge.type === 'goal' && <GoalDetail challenge={challenge}/>}
                            {challenge.type === 'habit' && <HabitDetail challenge={challenge}/>}
                        </View>
                        <View style={styles.iconContainer}>
                            <Image source={Icons[challenge.category]} style={styles.icon} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <ChallengeDetail challenge={challenge} 
                                    showDiscussion={showDiscussion}/>
                </View>
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
        marginTop: 90,
    },
    icon: {
        width: 100,
        height: 100,
    },
    backButtonContainer: {
        position: "absolute",
        top: 40,
        left: 0,
        padding: 20,
        zIndex: 1
      },
    editButtonContainer: {
        position: 'absolute',
        top: 40,
        right: 0,
        padding: 20,
        zIndex: 1
    }
});