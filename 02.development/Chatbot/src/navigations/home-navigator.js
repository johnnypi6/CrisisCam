import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from 'scenes/home';
import ChatScreen from 'scenes/home/chat';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Landing" 
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={ LandingScreen } />
            <Stack.Screen name="Chat" component = { ChatScreen } />
        </Stack.Navigator>
    )
}
