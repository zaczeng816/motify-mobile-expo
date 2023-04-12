import React from "react";
import { Text, View, StyleSheet} from "react-native";
import * as Progress from 'react-native-progress';
import GoalProgress from "./GoalProgress";

function GoalDetail({challenge}){
    return (
        <View style={styles.progressContainer}>
            <GoalProgress challenge={challenge} color='white'/>
        </View>
    )
}

export default GoalDetail;

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight: 'bold'
    },
    progressContainer: {
        flex: 1,
        //marginTop: 30,
        justifyContent: 'flex-end',
        //borderWidth: 2,
        marginBottom: 30,
        marginLeft: 10,
        alignSelf: 'stretch'
    }
})