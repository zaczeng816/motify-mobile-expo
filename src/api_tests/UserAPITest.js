import React, { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import {
    getOneById,
    getListByIds,
    getAllByUsername,
    getByEmail,
    setProfileImage,
} from "../api/UserAPI";

const TestAPIComponent = () => {
    const { token } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (token && user) {
            const testAPIs = async () => {
                const testId = user.id;
                const testIdList = [user.id];
                const testUsername = user.username;
                const testEmail = user.email;
                const testImageUri = "path/to/image.jpg";

                try {
                    const oneById = await getOneById(token, testId);
                    console.log("getOneById result:", oneById);

                    const listByIds = await getListByIds(token, testIdList);
                    console.log("getListByIds result:", listByIds);

                    const allByUsername = await getAllByUsername(
                        token,
                        testUsername
                    );
                    console.log("getAllByUsername result:", allByUsername);

                    const byEmail = await getByEmail(token, testEmail);
                    console.log("getByEmail result:", byEmail);

                    /*const setImgResult = await setProfileImage(
                        token,
                        testImageUri
                    );
                    console.log("setProfileImage result:", setImgResult);
                    */
                } catch (e) {
                    console.log("Error testing APIs:", e.message);
                }
            };

            testAPIs();
        }
    }, [user]);

    return null;
};

export default TestAPIComponent;
