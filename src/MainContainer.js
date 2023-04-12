import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import TodayScreen from './screens/TodayScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChallengesScreen from './screens/ChallengesScreen';

const todayName = 'Today';
const challengesName = 'Challenges'
const discoverName = 'Discover';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

const challenges = [
    {
        title: 'Reading',
        category: 'reading',
        completed: true,
        type: 'habit',
        amountType: 'duration',
        frequency: 'week',
        duration: new Date(0, 0, 0, 0, 30),
        endDate: new Date(2023, 4, 20, 0, 0),
        streak: 5,
        private: true
    },
    {
        title: 'Running',
        category: 'exercise',
        completed: false,
        type: 'habit',
        amountType: 'times',
        frequency: 'day',
        amount: 5,
        unit: 'mile',
        endDate: new Date(2023, 4, 25, 0, 0),
        streak: 10,
        private: true
    },
    {
        title: 'Meditation',
        category: 'meditation',
        completed: true,
        type: 'goal',
        amountType: 'duration',
        duration: new Date(0, 0, 0, 2, 0),
        accomplished: new Date(0, 0, 0, 0, 5),
        endDate: null,
        private: false,
        participantsNum: 52
    },
    {
        title: 'Wake up early',
        category: 'sleeping',
        completed: false,
        type: 'habit',
        frequency: 'day',
        amountType: 'times',
        amount: 1,
        unit: 'time',
        endDate: null,
        streak: 1,
        private: false,
        participantsNum: 2
    },
    {
        title: 'Professional',
        category: 'professional',
        completed: true,
        type: 'goal',
        amountType: 'duration',
        duration: new Date(0, 0, 0, 10, 0),
        accomplished: new Date(0, 0, 0, 4, 0),
        endDate: new Date(2024, 6, 2, 0, 0),
        private: true
    },
    {
        title: 'Networking',
        category: 'social',
        completed: false,
        type: 'goal',
        amountType: 'times',
        amount: 3,
        unit: 'time',
        accomplished: 3,
        endDate: null,
        private: true
      },
    {
        title: 'Save money',
        category: 'finance',
        completed: false,
        type: 'goal',
        amountType: 'times',
        amount: 100,
        unit: 'dollar',
        accomplished: 62,
        endDate: null,
        private: false,
        participantsNum: 231
    }
  ];

export default function MainContainer({navigation}){
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={todayName}
            screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'orange',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: 70},
                    tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if(routeName === todayName){
                        iconName = focused ? 'home': 'home-outline';
                    }
                    else if (routeName === challengesName){
                        iconName = focused? 'list' : 'list-outline';
                    }
                    else if (routeName === discoverName){
                    iconName = focused ? 'search': 'search-outline';
                    }
                    else if(routeName === settingsName){
                        iconName = focused ? 'settings': 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                }
            })}
            >
            <Tab.Screen name={todayName} 
                        component={TodayScreen}
                        options={{headerShown: false}}
                        initialParams={{challenges: challenges}}/> 
            <Tab.Screen name={challengesName} 
                        component={ChallengesScreen}
                        initialParams={{challenges: challenges}}/>
            <Tab.Screen name={discoverName} component={DiscoverScreen}/>
            <Tab.Screen name={settingsName} component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
