import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

function AddButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'orange',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddButton;
