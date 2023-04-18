import React from "react";
import { Modal, Text, View, TouchableOpacity, Animated, StyleSheet } from "react-native";

function PickerModal ({scrollModalVisible, hideScrollModal, renderScrollContent, confirmSelection}){
    return (
            <Modal
            transparent={true}
            visible={scrollModalVisible}
            onRequestClose={hideScrollModal}
            >
                <View style={styles.modalBackground}>
                    <TouchableOpacity
                    style={{ flex: 1}}
                    activeOpacity={1}
                    onPress={hideScrollModal}
                        />
                    <View style={styles.scrollModal}>
                        <Animated.View style={[styles.animatedView]}>
                            <View style={styles.scrollerButtonContainer}>
                                <TouchableOpacity onPress={hideScrollModal}>
                                    <Text style={styles.cancelButton}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={confirmSelection} >
                                    <Text style={styles.confirmButton}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {renderScrollContent()}
                        </Animated.View>
                    </View>
                </View>
            </Modal>
    );
  };

export default PickerModal;

const styles = StyleSheet.create({
    scrollModal: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        // paddingBottom: 300,
        backgroundColor: "#fff", 
    },
    cancelButton: {
        color: '#808080',
    },
    confirmButton: {
        color: '#333333',
        fontWeight: 'bold',
    },
    scrollerButtonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    modalBackground: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        flex: 1,
      },
})