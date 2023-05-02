import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SwitchComponent from '../components/SwitchComponent';
import {useRoute } from '@react-navigation/native';
import DisplayChallenges from '../components/DisplayChallenges';
import SearchComponent from '../components/SearchComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAllPublic} from "../api/ChallengeAPI";

function DiscoverScreen() {
    const options = [{label: 'Habit', value: 'habit'}, {label: 'Goal', value: 'goal'}];
    const [option, setOption] = useState('habit');
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const {challenges} = useRoute().params;

    useEffect(() => {
        const getChallenges = async () =>{
            const challengeList = await getAllPublic()
            return JSON.parse(challengeList)
        }
        const processChallenges = (challengeList) => {
            const filtered = challengeList.filter(challenge => {
                if (challenge.frequency && option === "habit"){ return true }
                if (!challenge.frequency && option === "goal"){ return true }
                return false
            });
            setFilteredChallenges(filtered);
        }
        getChallenges().then(c => {processChallenges(c)})
    }, [challenges, option]);


    function switchHandler(value){
        setOption(value);
    }


    return (
        <View style={styles.container}>
            <SwitchComponent options={options} switchHandler={switchHandler}/>
            <View style={styles.challengesContainer}>
                <SearchComponent challenges={filteredChallenges}/>
            </View>
        </View>
    );
}

export default DiscoverScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        // alignItems: 'stretch',
        //backgroundColor: '#d9d9d9'
    },
    challengesContainer: {
        flex: 1,
    },

})
