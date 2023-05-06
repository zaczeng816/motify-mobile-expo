import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getAllPublic } from "./api/ChallengeAPI";
import {
    getAllSelfPublicParticipation,
    getAllSelfPrivateParticipation,
    getOneSelfParticipation,
    getJoinedPublicChallengesByUserId,
    getParticipantsByPublicChallengeId,
    getSelfChallengesByDate,
    checkIn,
    joinPublicChallenge,
    quitPublicChallenge,
} from "./api/ParticipationAPI";
import { isReturnStatement } from "typescript";

const ChallengeAPITest = () => {
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            const testAPIs = async () => {
                const testId = "someId";
                const testUserId = "someUserId";
                const testDate = "2023-05-04";

                try {
                    console.log("1. Starting getAllPublic");
                    const allPublicChallenges = await getAllPublic(token);
                    console.log("getAllPublic result:", allPublicChallenges);

                    console.log("2. Starting getAllSelfPublicParticipation");
                    const allSelfPublicParticipation =
                        await getAllSelfPublicParticipation();
                    console.log(
                        "getAllSelfPublicParticipation result:",
                        allSelfPublicParticipation
                    );

                    console.log("3. Starting getAllSelfPrivateParticipation");
                    const allSelfPrivateParticipation =
                        await getAllSelfPrivateParticipation();
                    console.log(
                        "getAllSelfPrivateParticipation result:",
                        allSelfPrivateParticipation
                    );

                    console.log("4. Starting getOneSelfParticipation");
                    const oneSelfParticipation = await getOneSelfParticipation(
                        testId
                    );
                    console.log(
                        "getOneSelfParticipation result:",
                        oneSelfParticipation
                    );

                    console.log(
                        "5. Starting getJoinedPublicChallengesByUserId"
                    );
                    const joinedPublicChallengesByUserId =
                        await getJoinedPublicChallengesByUserId(testUserId);
                    console.log(
                        "getJoinedPublicChallengesByUserId result:",
                        joinedPublicChallengesByUserId
                    );

                    console.log(
                        "6. Starting getParticipantsByPublicChallengeId"
                    );
                    const participantsByPublicChallengeId =
                        await getParticipantsByPublicChallengeId(testId);
                    console.log(
                        "getParticipantsByPublicChallengeId result:",
                        participantsByPublicChallengeId
                    );

                    console.log("7. Starting getSelfChallengesByDate");
                    const selfChallengesByDate = await getSelfChallengesByDate(
                        testDate
                    );
                    console.log(
                        "getSelfChallengesByDate result:",
                        selfChallengesByDate
                    );

                    console.log("8. Starting checkIn");
                    const checkInResult = await checkIn({
                        /* request data */
                    });
                    console.log("checkIn result:", checkInResult);

                    console.log("9. Starting joinPublicChallenge");
                    const joinPublicChallengeResult = await joinPublicChallenge(
                        testId
                    );
                    console.log(
                        "joinPublicChallenge result:",
                        joinPublicChallengeResult
                    );

                    console.log("10. Starting quitPublicChallenge");
                    const quitPublicChallengeResult = await quitPublicChallenge(
                        testId
                    );
                    console.log(
                        "quitPublicChallenge result:",
                        quitPublicChallengeResult
                    );
                } catch (e) {
                    console.log("Error testing APIs:", e.message);
                }
            };

            testAPIs();
        }
    }, [token]);

    return null;
};

export default ChallengeAPITest;
