import React, { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
    getById,
    getPublicPage,
    getAllPrivate,
    getAllPublicByOwner,
    createChallenge,
    updateChallenge,
    deleteChallenge,
} from "../api/ChallengeAPI";

const ChallengeAPITest = () => {
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            const testAPIs = async () => {
                const testId = "someId";
                const testUserId = "someUserId";
                const testPage = 1;
                const testSize = 10;
                const testChallengeDTO = {
                    /* challengeDTO data */
                };

                try {
                    console.log("1. Starting getById");
                    const challengeById = await getById(token, testId);
                    console.log("getById result:", challengeById);

                    console.log("2. Starting getPublicPage");
                    const publicPage = await getPublicPage(
                        token,
                        testPage,
                        testSize
                    );
                    console.log("getPublicPage result:", publicPage);

                    console.log("3. Starting getAllPrivate");
                    const allPrivate = await getAllPrivate(token);
                    console.log("getAllPrivate result:", allPrivate);

                    console.log("4. Starting getAllPublicByOwner");
                    const allPublicByOwner = await getAllPublicByOwner(
                        token,
                        testUserId
                    );
                    console.log(
                        "getAllPublicByOwner result:",
                        allPublicByOwner
                    );

                    console.log("5. Starting createChallenge");
                    const createdChallenge = await createChallenge(
                        token,
                        testChallengeDTO
                    );
                    console.log("createChallenge result:", createdChallenge);

                    console.log("6. Starting updateChallenge");
                    const updatedChallenge = await updateChallenge(
                        token,
                        testChallengeDTO
                    );
                    console.log("updateChallenge result:", updatedChallenge);

                    console.log("7. Starting deleteChallenge");
                    const deletedChallenge = await deleteChallenge(
                        token,
                        testId
                    );
                    console.log("deleteChallenge result:", deletedChallenge);
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
