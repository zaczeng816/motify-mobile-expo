import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './buttons/IconButton';

const screenHeight = Dimensions.get('window').height;
const height = screenHeight * 0.12;

function ScreenHeader({ title, leftIcon, onLeftIconPress, rightIcon, onRightIconPress }) {
  return (
    <View style={[styles.container, {height}]}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onLeftIconPress} style={styles.sideIcon}>
                <Ionicons name={leftIcon} size={35} color="white" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onRightIconPress} style={styles.sideIcon}>
                <Ionicons name={rightIcon} size={35} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'orange',
        justifyContent: 'flex-end'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    sideIcon: {
        minWidth: 50,
    },
});

export default ScreenHeader;
