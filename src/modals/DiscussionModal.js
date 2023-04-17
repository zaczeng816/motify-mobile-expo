import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native';
import IconButton from "../components/buttons/IconButton";
import ScreenHeader from "../components/ScreenHeader";
import DiscussionComponent from "../components/DiscussionComponent";

const screenHeight = Dimensions.get('window').height;
const headerHeight = screenHeight * 0.15;

function DiscussionModal({challenge, isModalVisible, hideModal}){

    function goBack(){
        hideModal();
    }

    return (
        <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={hideModal}
        >
            <ScreenHeader title='Discussion'
                        leftIcon='chevron-back'
                        onLeftIconPress={goBack}
                        />
            <DiscussionComponent />
        </Modal>
    )
}

export default DiscussionModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'orange',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    backButtonContainer: {
        borderWidth: 2
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    titleContainer: {
        marginBottom: 30
    },
    headerContainer: {
        backgroundColor: 'orange',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    }
})  