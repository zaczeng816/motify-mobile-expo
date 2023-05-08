import React, {useContext, useEffect, useState} from "react";
import { Text, View, StatusBar, Modal, Alert, Dimensions, StyleSheet, Image} from "react-native";
import GoalDetail from "../components/GoalDetail";
import HabitDetail from "../components/HabitDetail";
import IconButton from "../components/buttons/IconButton";
import Icons from "../constants/Icons";
import ChallengeDetail from "../components/ChallengeDetail";
import ModifyChallengeModal from "./ModifyChallengeModal";
import DiscussionButton from "../components/buttons/DiscussionButton";
import JoinChallengeButton from "../components/buttons/JoinChallengeButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    getOneSelfParticipation,
    getParticipantsByPublicChallengeId,
    quitPublicChallenge
} from "../api/ParticipationAPI";
import {AuthContext} from "../contexts/AuthContext";
import {deleteChallenge} from "../api/ChallengeAPI";
import {UserContext} from "../contexts/UserContext";

const screenHeight = Dimensions.get('window').height;
const topHeight = screenHeight * 0.5;
const topColor = 'orange';
const titleMarginTop = screenHeight * 0.15;

function DisplayChallengeModal({isModalVisible, hideModal, challenge}){
    console.log("CHALLENGE: ",challenge)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    // const {user} = useContext(UserContext);
    // const isOwner = challenge.ownerId === user.id;

    const [hasJoinedChallenge, setHasJoinedChallenge] = useState(true);
    const [participantsNum, setParticipantsNum] = useState(0);
    const [isOwner, setIsOwner] = useState(false)
    const {token} = useContext(AuthContext);
    // console.log("Token is: ", token)

    function getFontSize() {
        const length = challenge.name.length;
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
                    deleteChallenge(token, challenge.id).then(hideModal());
                },
                style: 'destructive',
              },
            ],
          );
    }

    function handleQuit(){
        Alert.alert(
            'Confirm Quit',
            'Do you want to quit this challenge?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Quit',
                    onPress: () => {
                        quitPublicChallenge(token, challenge.id).then((hideModal()));
                    },
                    style: 'destructive',
                },
            ],
        );
    }

    function hideEditModal(){
        setIsEditModalVisible(false);
    }

    async function getParticipantsNum() {
        const res = await getParticipantsByPublicChallengeId(token, challenge.id);
        return res.data.length;
    }

    async function getSelfParticipation() {
        const res = await getOneSelfParticipation(token, challenge.id);
        if (res == null){
            return null
        }
        return res
    }

    useEffect(() => {

        getParticipantsNum().then(n => {
            getSelfParticipation().then(p => {
                setParticipantsNum(n);
                setHasJoinedChallenge(p !== null)
                setIsOwner(p.ownerId === challenge.ownerId);
            })

        })
    }, [challenge])

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
                    {isOwner &&
                        <View style={styles.rightButtonsContainer}>
                            <View style={styles.editButtonContainer}>
                                <IconButton onPress={showSetting}
                                            iconName={'create-outline'}/>
                            </View>
                            <IconButton onPress={handleDelete} iconName={'trash-outline'} />
                        </View>
                    }
                    {!isOwner &&
                        <View style={styles.rightButtonsContainer}>
                            <IconButton onPress={handleQuit} iconName={'trash-outline'} />
                        </View>
                    }
                    <ModifyChallengeModal isModalVisible={isEditModalVisible}
                                        hideModal={hideEditModal}
                                        isNew={false}
                                        challenge={challenge}/>
                    <View style={styles.topDetail}>
                        <View style={styles.topHeader}>
                            <Text style={[styles.title, {fontSize: getFontSize()}, {marginTop: titleMarginTop}]}>
                                        {challenge.name}</Text>
                            {!challenge.frequency && <GoalDetail challenge={challenge}/>}
                            {challenge.frequency && <HabitDetail challenge={challenge}/>}
                        </View>
                        <View style={styles.iconContainer}>
                            <Image source={Icons[challenge.category]} style={styles.icon} />
                            {challenge.isPrivate === false && (
                                <View style={styles.participants}>
                                    <Ionicons name="people" size={25} color='white' />
                                        <Text style={styles.participantsText}>
                                            {participantsNum}
                                        </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.detailContainer}>
                        <ChallengeDetail challenge={challenge}
                                        hasJoinedChallenge={hasJoinedChallenge}/>
                        </View>
                    <View style={styles.discussionButtonContainer}>
                        {!hasJoinedChallenge && <JoinChallengeButton/>}
                        {hasJoinedChallenge && <DiscussionButton challenge={challenge}
                                                                 isPrivate={challenge.isPrivate}
                                                                participantsNum={participantsNum}/>}
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
        marginRight: 10,
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 90,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 10,
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
    participants:{
        flexDirection: 'row',
        marginBottom: -10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    participantsText: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: 'white'
    },
});
