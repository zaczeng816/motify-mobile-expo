import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import Icons from "../constants/Icons";
//import { ColorMatrix } from 'react-native-color-matrix-image-filters';


function ChallengeComponent({challenge, onClick}){
    const {title, category, type} = challenge;
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric'};
    const endDateText = challenge.endDate === null? 'Ongoing': 'To ' + challenge.endDate.toLocaleDateString('en-US', dateOptions);
    function onClickHandler(){
        onClick(challenge);
    }
    return (
        <TouchableOpacity onPress={onClickHandler}>
            <View style={styles.container}>
                <View style={styles.categoryIconContainer}>
                    <Image source={Icons[category]} style={styles.categoryIcon} />
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.titleWrapper} >
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.endDateText}>{endDateText}</Text>
                </View>
                {/* <Image source={Icons[challenge.type]} style={styles.icon}/> */}
            </View>
        </TouchableOpacity>
    )
}

export default ChallengeComponent; 

const styles = StyleSheet.create({
    container: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
      },
    categoryIconContainer: {
        //backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        marginRight: 30,
    },
    categoryIcon: {
        width: 60,
        height: 60,
    },
    icon: {
        width: 30,
        height: 30,
        bottom: 30,
        right: 20,
        position: 'absolute'
    },
    title: {
        //borderWidth: 2,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    detailContainer: {
        flex: 1,
        //flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        //alignSelf: 'stretch',
    },
    titleWrapper: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: -10,
        marginTop: -10
      },
    endDateText: {
        fontSize: 10,
        color: '#999999',
        fontWeight: 'bold',
        //borderWidth: 2,
        marginTop: -20,
        marginBottom: 20
    },
})