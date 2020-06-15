import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigator from './home-navigator';
import SettingsScreen from 'scenes/settings';
import LearnScreen from 'scenes/learn';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
                drawerPosition="right"
                drawerStyle={{
                    width: 200
                }}
                drawerContentOptions = {{
                    itemStyle: {
                        height: Platform.OS === 'android' ? 40 : 48,
                        justifyContent: "center",
                        backgroundColor: "#E2EDFC",
                    },
                    labelStyle: {
                        fontSize: 20
                    },
                    backgroundColor: "#E2EDFC",
                }}>
                <Drawer.Screen name="Home" component={ HomeNavigator } />
                <Drawer.Screen name="Settings" component={ SettingsScreen } />
                <Drawer.Screen name="Learn" component={ LearnScreen } />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
