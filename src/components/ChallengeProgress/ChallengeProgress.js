import React from "react";
import {View} from 'react-native';
import HabitProgress from "./HabitProgress";
import GoalProgress from "./GoalProgress";

function ChallengeProgress({challenge}){

    return (
        <View>
            {challenge.type === 'habit' && <HabitProgress challenge={challenge}/>}
            {challenge.type === 'goal' && <GoalProgress challenge={challenge}/>}
        </View>
    );
}

export default ChallengeProgress;