import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import Icons from "../../constants/Icons";
import DiscussionModal from "../../modals/DiscussionModal";

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.8;

function DiscussionButton({challenge, isPrivate}){

    const imageSrc = isPrivate? Icons.pen :Icons.discussion;
    const [isDiscussionModalVisible, setIsDiscussionModalVisible] = useState(false);

    function hideDiscussionModal(){
        setIsDiscussionModalVisible(false);
    }

    function showDiscussionModal(){
        setIsDiscussionModalVisible(true);
    }

    function ButtonText(){
        if (isPrivate){
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.checkInText}>Check-in log</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.discussionText}>Discussion</Text>
                    <Text style={styles.participantsText}>{challenge.participantsNum} people joined</Text>
                </View>
            );
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={showDiscussionModal}>
                <View style={[styles.container, {width: buttonWidth}]}>
                    <View style={styles.iconContainer}>
                        <Image source={imageSrc} style={styles.icon}/>
                    </View>
                    <ButtonText />
                </View>
            </TouchableOpacity>
            <DiscussionModal challenge={challenge}
                isModalVisible={isDiscussionModalVisible}
                hideModal={hideDiscussionModal}/>
        </View>
    )
}

export default DiscussionButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        borderRadius: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 1,
    },
    iconContainer: {
        padding: 10,
        marginLeft: 10
    },
    icon: {
        height: 50,
        width: 50
    },
    textContainer: {
        justifyContent: 'center',
        padding: 10
    },
    discussionText: {
        color: 'white',
        fontWeight: 'bold',
    },  
    checkInText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },  
    participantsText: {
        color: 'white',
        fontStyle: 'italic'
    }
})