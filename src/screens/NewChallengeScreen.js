import React, {useEffect} from "react";
import { View, Text , StyleSheet} from "react-native";
import CloseConfirmIcon from "../components/CloseConfirmIcon";
import { useNavigation } from '@react-navigation/native';

function NewChallengeScreen(){
    const navigation = useNavigation();
    function closeScreen(){
        navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <CloseConfirmIcon iconName={'close'} onPress={closeScreen}/>
                <Text style={styles.headerText}>New Challenge</Text>
            <CloseConfirmIcon iconName={'checkmark'}/>
        </View>
    )
}

export default NewChallengeScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 80,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'top',
        fontSize: 20,
        fontWeight: 'bold'
    }
})