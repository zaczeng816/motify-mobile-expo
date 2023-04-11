import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CloseConfirmIcon({iconName, onPress}) {
  const backgroundColor = iconName === 'close'? '#cccccc':'#40bf45';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default CloseConfirmIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 5
  },
});