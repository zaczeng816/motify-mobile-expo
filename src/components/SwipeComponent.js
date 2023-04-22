import React from "react";
import { StyleSheet , Animated, TouchableOpacity, Text} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

function SwipeComponent({dragX, onSwipeComplete, buttonType}){
    const opacity = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
      });

    const color = buttonType === 'undo'? 'red': 'green';
    const iconName = buttonType === 'complete'? 'checkmark-sharp' :
                    (buttonType === 'undo'? 'arrow-undo-outline' : 'add');

    return (
        <Animated.View style={[styles.rightAction, { opacity}, {backgroundColor: color}]}>
            <TouchableOpacity onPress={onSwipeComplete} style={styles.actionButton}>
                {/* <Text style={styles.actionText}>Complete</Text> */}
                <Ionicons name={iconName} size={50} color='white'/>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default SwipeComponent;

const styles = StyleSheet.create({
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    rightAction: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 20,
      borderRadius: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      paddingHorizontal: 30,
      height: 100,
    },
})