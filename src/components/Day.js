import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";

function Day({date, selected, onPress, dayWidth}){
    const day = new Date(date);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[day.getDay()];
    const dayNumber = day.getDate();
  
    const containerStyle = [
      styles.dayContainer,
      { width: dayWidth, height: dayWidth},
      selected ? styles.selectedDayContainer : null,
      date === new Date().toISOString().split('T')[0]? styles.todayContainer: null
    ];

    const textStyle = selected ? styles.selectedDayText : styles.dayText;
  
    return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Text style={textStyle}>{dayName}</Text>
        <Text style={textStyle}>{dayNumber}</Text>
      </TouchableOpacity>
    );
};

export default Day;

const styles = StyleSheet.create({
    todayContainer: {
      borderRadius: 60,
      borderColor: 'orange',
      borderWidth: 2,
      // paddingVertical: 5,
      // paddingHorizontal: 10
    },
    dayContainer: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDayContainer: {
        backgroundColor: 'orange',
        borderRadius: 50,
        // paddingVertical: 5,
        // paddingHorizontal: 10,
    },
    dayText: {
      fontSize: 12,
    },
    selectedDayText: {
      fontSize: 12,
      color: 'white',
    },
  });