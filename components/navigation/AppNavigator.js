import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Control" component={ControlScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
