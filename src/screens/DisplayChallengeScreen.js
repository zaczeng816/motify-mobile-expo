import React from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

function DisplayChallenges(){
    const route = useRoute();
    const {challenge} = route.params;

    return (
        <View>
            <Text>{challenge.title}</Text>
            <Text>{challenge.category}</Text>
        </View>
    )
}

export default DisplayChallenges;