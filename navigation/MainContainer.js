import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import SettingsScreen from './screens/SettingsScreen';

const homeName = 'Home';
const discoverName = 'Discover';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer({navigation}){
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                    tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if(routeName === homeName){
                        iconName = focused ? 'home': 'home-outline';
                    }else if (routeName === discoverName){
                    iconName = focused ? 'list': 'list-outline';
                    }else if(routeName === settingsName){
                        iconName = focused ? 'settings': 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                }
            })}
            tabBarOptions={{
                activeTintColor: 'orange',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10},
                style: {padding: 10, height: 70}
            }}
            >
            <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={discoverName} component={DiscoverScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}
