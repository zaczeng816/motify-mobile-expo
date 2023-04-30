import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import Icons from "../../constants/Icons";
import JoinChallengeModal from "../../modals/JoinChallengeModal";

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.8;

function JoinChallengeButton(){
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

    function hideJoinModal(){
        setIsJoinModalVisible(false);
    }

    function showJoinModal(){
        setIsJoinModalVisible(true);
    }

    function ButtonText(){
        return (
            <View style={styles.textContainer}>
                <Text style={styles.checkInText}>Join Challenge</Text>
            </View>
        );
    }

    function joinChallengeHandler(){
        console.log('User joins challenge');
    }

    return (
        <View>
            <TouchableOpacity onPress={showJoinModal}>
                <View style={[styles.container, {width: buttonWidth}]}>
                    <View style={styles.iconContainer}>
                        <Image source={Icons.join} style={styles.icon}/>
                    </View>
                    <ButtonText />
                </View>
            </TouchableOpacity>
            <JoinChallengeModal isModalVisible={isJoinModalVisible}
                                hideModal={hideJoinModal}
                                onSubmit={joinChallengeHandler} />
        </View>
    )
}

export default JoinChallengeButton;

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