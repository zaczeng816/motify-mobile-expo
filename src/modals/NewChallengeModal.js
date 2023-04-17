import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native';
import ScreenHeader from "../components/ScreenHeader";

function NewChallengeModal({isModalVisible, hideModal}){
    return (
        <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={hideModal}
        >
            <ScreenHeader title='Add new challenge'
                        leftIcon='close-sharp'
                        onLeftIconPress={hideModal}
                        />
        </Modal>
    )
}

export default NewChallengeModal;