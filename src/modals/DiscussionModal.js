import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native';
import IconButton from "../components/buttons/IconButton";

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
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <IconButton iconName={'chevron-back'} onPress={goBack} />
                </View>
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>Discussion</Text>
                </View>

            </View>
        </Modal>
    )
}

export default DiscussionModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonContainer: {
        position: "absolute",
        top: 30,
        left: 0,
        padding: 20,
        zIndex: 1
    },
    title: {
        fontSize: 30,
        color: 'white'
    },
    titleContainer: {
        marginTop: 50
    }
})  