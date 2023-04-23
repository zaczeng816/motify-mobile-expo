import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import TodayScreen from "./screens/TodayScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChallengesScreen from "./screens/ChallengesScreen";

const todayName = "Today";
const challengesName = "Challenges";
const discoverName = "Discover";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();


const challenges = [
    {
        title: "Reading",
        category: "reading",
        isPrivate: true,
        completed: false,
        type: "habit",
        frequency: "week",
        isTimeBased: false,
        duration: new Date(0, 0, 0, 0, 30),
        amount: 100,
        unit: 'pages',
        description: "I want to read more books",
        isOngoing: false,
        startDate: new Date(2023, 4, 20, 0, 0),
        endDate: new Date(2023, 8, 12, 0, 0),
        amountType: "duration",
        streak: 5,
        private: true,
        isCompleted: true,
    },
    {
        title: "Running",
        category: "exercise",
        type: "habit",
        amountType: "times",
        frequency: "day",
        amount: 5,
        unit: "mile",
        endDate: new Date(2023, 4, 25, 0, 0),
        streak: 10,
        private: true,
        description: "I want to run around the river",
        isCompleted: false,
        isTimeBased: false,
    },
    {
        title: "Meditation",
        category: "meditation",
        type: "goal",
        amountType: "duration",
        duration: new Date(0, 0, 0, 2, 0),
        accomplished: new Date(0, 0, 0, 0, 5),
        endDate: null,
        private: false,
        participantsNum: 52,
        description: "I think meditation is good for me",
        isCompleted: false,
        isTimeBased: true,
    },
    {
        title: "Wake up early",
        category: "sleeping",
        type: "habit",
        frequency: "day",
        amountType: "times",
        amount: 1,
        unit: "time",
        endDate: null,
        streak: 1,
        private: false,
        participantsNum: 2,
        description: "I would like to wake up at 7am everyday",
        isCompleted: false,
        isTimeBased: false,
    },
    {
        title: "Professional",
        category: "professional",
        type: "goal",
        amountType: "duration",
        duration: new Date(0, 0, 0, 10, 0),
        accomplished: new Date(0, 0, 0, 4, 0),
        endDate: new Date(2024, 6, 2, 0, 0),
        private: true,
        description: "I want to finish all my work",
        isCompleted: true,
        isTimeBased: true,
    },
    {
        title: "Networking",
        category: "social",
        type: "goal",
        amountType: "times",
        amount: 3,
        unit: "time",
        accomplished: 3,
        endDate: null,
        private: true,
        description: "I plan to attend social events three times",
        isCompleted: false,
        isTimeBased: false,
    },
    {
        title: "Save money",
        category: "finance",
        type: "goal",
        amountType: "times",
        amount: 100,
        unit: "dollar",
        accomplished: 62,
        endDate: null,
        private: false,
        participantsNum: 231,
        description: "I would like to save money for travelling",
        isCompleted: false,
        isTimeBased: false,
    },
];

export default function MainContainer({ navigation }) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={todayName}
                screenOptions={mainScreenOptions} // See below
            >
                <Tab.Screen
                    name={todayName}
                    component={TodayScreen}
                    options={{ headerShown: false }}
                    initialParams={{ challenges: challenges }}
                />
                <Tab.Screen
                    name={challengesName}
                    component={ChallengesScreen}
                    initialParams={{ challenges: challenges }}
                />
                <Tab.Screen
                    name={discoverName}
                    component={DiscoverScreen}
                    initialParams={{ challenges: challenges }}
                />
                <Tab.Screen name={settingsName} component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// This is the function that is passed to the screenOptions prop of the Tab.Navigator
const mainScreenOptions = ({ route }) => ({
    tabBarActiveTintColor: "orange",
    inactiveTintColor: "grey",
    labelStyle: { paddingBottom: 10, fontSize: 10 },
    style: { padding: 10, height: 70 },
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let routeName = route.name;

        if (routeName === todayName) {
            iconName = focused ? "home" : "home-outline";
        } else if (routeName === challengesName) {
            iconName = focused ? "list" : "list-outline";
        } else if (routeName === discoverName) {
            iconName = focused ? "search" : "search-outline";
        } else if (routeName === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
});
