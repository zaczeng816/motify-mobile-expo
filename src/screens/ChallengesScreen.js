import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchComponent from "../components/SwitchComponent";
import { useNavigation, useRoute, useParams } from "@react-navigation/native";
import DisplayChallenges from "../components/DisplayChallenges";
import DisplayChallengeModal from "../modals/DisplayChallengeModal";
import NoChallenge from "../components/NoChallenge";
import appConfig from "../../config/appConfig";

function ChallengesScreen() {
    // ---------- Dummy Data ---------- //
    const { challenges } = useRoute().params;
    const currentChallenges = challenges.filter((challenge) => {
        return challenge.private === (currentOption === "private");
    });
    // ---------- Dummy Data ---------- //

    const options = [
        { label: "Private", value: "private" },
        { label: "Public", value: "public" },
    ];
    const [currentOption, setCurrentOption] = useState("private");
    const [isDisplayModalVisible, setIsDisplayModalVisible] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);

    function onClickChallengeHandler(challenge) {
        setCurrentChallenge(challenge);
        setIsDisplayModalVisible(true);
    }

    function hideDisplayModal() {
        setIsDisplayModalVisible(false);
    }

    function switchHandler(value) {
        setCurrentOption(value);
    }

    return (
        <View style={styles.challengesContainer}>
            <SwitchComponent options={options} switchHandler={switchHandler} />
            {currentChallenges.length === 0 && <NoChallenge />}
            <DisplayChallenges
                challenges={currentChallenges}
                onClick={onClickChallengeHandler}
            />
            {currentChallenge && (
                <DisplayChallengeModal
                    isModalVisible={isDisplayModalVisible}
                    hideModal={hideDisplayModal}
                    challenge={currentChallenge}
                />
            )}
        </View>
    );
}

export default ChallengesScreen;

const styles = StyleSheet.create({
    challengesContainer: {
        flex: 1,
        margin: 20,
    },
});
