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
            <Tab.Screen name={todayName} component={TodayScreen}/>
            <Tab.Screen name={challengesName} component={ChallengesScreen}/>
            <Tab.Screen name={discoverName} component={DiscoverScreen}/>
            <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}
