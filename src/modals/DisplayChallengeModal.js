import React, {useState} from "react";
import { Text, View, StatusBar, Modal, Alert, Dimensions, StyleSheet, Image} from "react-native";
import GoalDetail from "../components/GoalDetail";
import HabitDetail from "../components/HabitDetail";
import IconButton from "../components/buttons/IconButton";
import Icons from "../constants/Icons";
import ChallengeDetail from "../components/ChallengeDetail";
import ModifyChallengeModal from "./ModifyChallengeModal";
import DiscussionButton from "../components/buttons/DiscussionButton";

const screenHeight = Dimensions.get('window').height;
const topHeight = screenHeight * 0.5;
const topColor = 'orange';
const titleMarginTop = screenHeight * 0.15;

function DisplayChallengeModal({isModalVisible, hideModal, challenge}){
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
    
    function handleDelete(){
        Alert.alert(
            'Confirm Delete',
            'Do you want to delete this challenge?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => {
                  // delete the challenge here
                },
                style: 'destructive',
              },
            ],
          );
    }

    function hideEditModal(){
        setIsEditModalVisible(false);
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
                    <View style={styles.rightButtonsContainer}>
                        <View style={styles.editButtonContainer}>
                            <IconButton onPress={showSetting} 
                                        iconName={'create-outline'}/>
                        </View>
                        <IconButton onPress={handleDelete} iconName={'trash-outline'} />
                    </View>
                    <ModifyChallengeModal isModalVisible={isEditModalVisible}
                                        hideModal={hideEditModal}
                                        isNew={false}
                                        challenge={challenge}/>
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
                    <View style={styles.detailContainer}>
                        <ChallengeDetail challenge={challenge}/>
                        </View>
                    <View style={styles.discussionButtonContainer}>
                        <DiscussionButton challenge={challenge} isPrivate={challenge.private}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DisplayChallengeModal;


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
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 30,
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
    rightButtonsContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent: 'space-between',
        position: 'absolute',
        top: 40,
        right: 0,
        padding: 20,
        zIndex: 1
    },
    editButtonContainer:{
        marginRight: 15,
    },
    bottom: {
        flex: 0.7,
        flexDirection: 'column',
        alignItems: 'stretch',
        //backgroundColor: '#808080',
    },
    discussionButtonContainer: {
        //flex: 1,
        alignItems: 'center',
        //borderWidth: 2
        marginBottom: 40
    },
    detailContainer: {
        flex: 3,
    },
});