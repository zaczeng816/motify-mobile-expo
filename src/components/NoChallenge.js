import React from "react";
import {Text, View, StyleSheet,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function NoChallenge(){
    return (
        <View style={styles.container}>
            {/* <Icon name="emoticon-sad-outline" size={100} color="#999" /> */}
            <Text style={styles.text}>No Challenges</Text>
        </View>
        );
}

export default NoChallenge;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
      },
  });