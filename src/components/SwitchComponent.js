import React from "react";
import { StyleSheet } from "react-native";
import SwitchSelector from 'react-native-switch-selector';

function SwitchComponent({options, switchHandler}){

    function handlePress(value){
        switchHandler(value);
    }

    return (
        <SwitchSelector options={options}
            initial={0}
            onPress={handlePress}
            buttonColor='orange'
            style={styles.switchContainer}/>
    )
}

export default SwitchComponent;

const styles = StyleSheet.create({
    switchContainer: {
        marginBottom: 10
    }
})