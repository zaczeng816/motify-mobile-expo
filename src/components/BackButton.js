import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;
const marginTop = screenHeight * 0.06;

function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {marginTop}]}>
      <Ionicons name="chevron-back" size={35} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginTop: 50,
    marginLeft: 20,
  },
});

export default BackButton;