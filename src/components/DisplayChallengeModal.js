import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, Modal, Animated, Dimensions, StyleSheet, useState} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackButton from "./BackButton";

function DisplayChallenges({isModalVisible, hideModal, challenge}){

    function goBack(){
        hideModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
            >
            <View>
                <BackButton onPress={goBack}/>
                <Text>{challenge.title}</Text>
                <Text>{challenge.category}</Text>
            </View>
        </Modal>
    )
}

export default DisplayChallenges;

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    closeButton: {
      fontSize: 16,
      color: 'blue',
    },
  });