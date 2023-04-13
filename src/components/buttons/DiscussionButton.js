import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import Icons from "../../constants/Icons";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.8;

function DiscussionButton({challenge, onPress}){

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, {width: buttonWidth}]}>
                <View style={styles.iconContainer}>
                    <Image source={Icons.discussion} style={styles.icon}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.dicussionText}>Discussion</Text>
                    <Text style={styles.participantsText}>{challenge.participantsNum} people joined</Text>
                </View>
            </View>
        </TouchableOpacity>
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
        padding: 10
    },
    icon: {
        height: 50,
        width: 50
    },
    textContainer: {
        padding: 10
    },
    dicussionText: {
        color: 'white',
        fontWeight: 'bold',
    },  
    participantsText: {
        color: 'white',
        fontStyle: 'italic'
    }
})