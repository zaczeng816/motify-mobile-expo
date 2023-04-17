// NewChallengeModal.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';

const NewChallengeModalTest = ({ isModalVisible, hideModal }) => {
  const [isOpen, setIsOpen] = useState(isModalVisible);
  const modalHeight = Dimensions.get('window').height * 0.9;
  const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isModalVisible) {
      setIsOpen(true);
      Animated.timing(translateY, {
        toValue: Dimensions.get('window').height - modalHeight,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: Dimensions.get('window').height,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  if (!isOpen) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
        <View style={styles.headerContainer}>
          <ScreenHeader title="Add new challenge" leftIcon="close-sharp" onLeftIconPress={hideModal} />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'orange',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
    borderWidth:2,
  },
  headerContainer: {
    borderWidth: 2,
    flex: 1
  }
});

export default NewChallengeModalTest;
