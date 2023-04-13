import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;
const marginTop = screenHeight * 0.06;

function IconButton({ onPress, iconName}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name={iconName} size={35} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

export default IconButton;