import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CloseConfirmIcon from "../components/CloseConfirmIcon";
import { BlurView } from 'expo-blur';

function NewChallengeModal({ isModalVisible, hideModal }) {
  function closeModal() {
    hideModal();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
        <BlurView intensity={50} style={styles.modalBackground} />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <CloseConfirmIcon iconName={'close'} onPress={closeModal} />
            <Text style={styles.headerText}>New Challenge</Text>
            <CloseConfirmIcon iconName={'checkmark'} />
          </View>
        </View>
    </Modal>
  );
}

export default NewChallengeModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    height: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
