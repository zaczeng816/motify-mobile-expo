import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SwitchComponent from '../components/SwitchComponent';
import {useRoute } from '@react-navigation/native';
import DisplayChallenges from '../components/DisplayChallenges';
import SearchComponent from '../components/SearchComponent';



function DiscoverScreen() {
    const options = [{label: 'Habit', value: 'habit'}, {label: 'Goal', value: 'goal'}];
    const [option, setOption] = useState('habit');
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const {challenges} = useRoute().params;

    function switchHandler(value){
        setOption(value);
    }

    useEffect(() => {
        const filtered = challenges.filter(challenge => challenge.type === option);
        setFilteredChallenges(filtered);
      }, [challenges, option]);

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
        alignItems: 'stretch',
        //backgroundColor: '#d9d9d9'
    },
    challengesContainer: {
        flex: 1,
    },
    
})
