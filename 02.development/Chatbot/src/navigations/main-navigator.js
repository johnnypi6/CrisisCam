import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigator from './home-navigator';
import SettingsScreen from 'scenes/settings';
import LearnScreen from 'scenes/learn';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={ HomeNavigator } />
                <Drawer.Screen name="Settings" component={ SettingsScreen } />
                <Drawer.Screen name="Learn" component={ LearnScreen } />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
