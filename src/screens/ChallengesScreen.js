import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import SwitchComponent from '../components/SwitchComponent';
import { useNavigation, useRoute, useParams } from '@react-navigation/native';
import DisplayChallenges from '../components/DisplayChallenges';
import DisplayChallengeModal from '../components/DisplayChallengeModal';


function ChallengesScreen() {
    const { challenges } = useRoute().params;

    const options = [{label: 'Private', value: 'private'}, {label: 'Public', value: 'public'}];
    const [currentOption, setCurrentOption] = useState('private');
    const [isDisplayModalVisible, setIsDisplayModalVisible] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);

    function onClickChallengeHandler(challenge){
        setCurrentChallenge(challenge);
        setIsDisplayModalVisible(true);
    }

    function hideDisplayModal(){
        setIsDisplayModalVisible(false);
    }

    function switchHandler(value){
        setCurrentOption(value);
    }

    const currentChallenges = challenges.filter((challenge) => {
        return challenge.private === (currentOption === 'private')
    });


    return (
        <View style={styles.challengesContainer}>
            <SwitchComponent options={options} 
                            switchHandler={switchHandler}/>
            <DisplayChallenges challenges={currentChallenges} onClick={onClickChallengeHandler}/>
            <DisplayChallengeModal isModalVisible={isDisplayModalVisible}
                                hideModal={hideDisplayModal}
                                challenge={currentChallenge}/>
        </View>
    );
}

export default ChallengesScreen;

const styles = StyleSheet.create({
    challengesContainer: {
        flex: 1,
        margin: 20
    },
})
