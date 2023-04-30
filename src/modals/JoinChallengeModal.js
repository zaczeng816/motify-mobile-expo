import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions,} from 'react-native';

function JoinChallengeModal({isModalVisible, hideModal, onSubmit}){

    const confirmHandler = () => {
        onSubmit();
        hideModal();
    };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
            <View style={styles.textContainer}>
                <Text style={styles.modalTextTitle}>
                    Join Challenge
                </Text>
                <Text style={styles.modalText}>
                    Do you want to join this challenge?
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={confirmHandler}>
                    <Text style={styles.buttonText}>Yes I'm ready!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={hideModal}>
                    <Text style={[styles.buttonText, {color: '#4a4a4a'}]}>Maybe next time</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 10,
    padding: 20,
  },
  modalTextTitle:{
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333'
  },
  modalText:{
    marginTop: 5,
    fontSize: 16,
    color: '#a9a9a9',
    textAlign: 'center',
  },
  textContainer:{
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  button: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '95%',
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cancelButton:{
    backgroundColor: '#f5f5f5'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default JoinChallengeModal;