import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import Icons from "../constants/Icons";

function NoResult(){
    return (
        <View style={styles.container}>
            <Image source={Icons.search} style={styles.icon}/>
            <Text style={styles.text}>No results found</Text>
        </View>
    )
}

export default NoResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 80
    },
    icon: {
        height: 80,
        width: 80,
        marginBottom: 40
    },
    text: {
        fontSize: 20,
        color: '#808080'
    }
})