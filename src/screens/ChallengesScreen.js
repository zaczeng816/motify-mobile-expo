import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchComponent from "../components/SwitchComponent";
import { useNavigation, useRoute, useParams } from "@react-navigation/native";
import DisplayChallenges from "../components/DisplayChallenges";
import DisplayChallengeModal from "../modals/DisplayChallengeModal";
import NoChallenge from "../components/NoChallenge";
import appConfig from "../../config/appConfig";
import { getOneSelfParticipation } from "../api/ParticipationAPI";
import {
    getAllPrivateChallenges,
    getAllPublicChallenges,
} from "../api/ChallengeAPI";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { StatusContext } from "../contexts/StatusContext";

function ChallengesScreen() {
    // ---------- Dummy Data ---------- //
    // const { challenges } = useRoute().params;
    const isFocused = useNavigation().isFocused();
    const options = [
        { label: "Private", value: "private" },
        { label: "Public", value: "public" },
    ];
    const [publicChallenges, setPublicChallenges] = useState([]);
    const [privateChallenges, setPrivateChallenges] = useState([]);
    const [currentOption, setCurrentOption] = useState("private");
    const [isDisplayModalVisible, setIsDisplayModalVisible] = useState(false);
    const { showLoading, showMessage } = useContext(StatusContext);
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [currentChallenge, setCurrentChallenge] = useState(privateChallenges[0]);
    const { token } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getChallenges = async () => {
            try {
                const allPrivate = await getAllPrivateChallenges(token);
                const allPublic = await getAllPublicChallenges(token);
                setPrivateChallenges(allPrivate);
                setPublicChallenges(allPublic);
            //     if (
            //         Array.isArray(allChallenges) &&
            //         allChallenges.length > 0
            //     ) {
            //         setChallenges(allChallenges);
            //         showMessage("Challenges loaded");
            //     } else {
            //         showMessage("No Challenges Found");
            //     }
            // } catch (e) {
            //     showMessage("Error Getting Challenges");
            }
            catch (e) {
                console.log('Failed to fetch challenges');
            }
        };

        getChallenges().then();
    }, [isFocused]);

    useEffect(() => {
        setCurrentChallenges(currentOption === 'private'? privateChallenges: publicChallenges);
    }, [isFocused, currentOption, publicChallenges, privateChallenges])


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
