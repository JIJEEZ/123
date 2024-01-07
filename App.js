import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import the new screens
import HomeScreen from './components/pages/HomeScreen';
import MapScreen from './components/pages/MapScreen';
import ControlScreen from './components/pages/ControlScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFCA64"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: '#FFCA64' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={'white'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={'white'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Control"
        component={ControlScreen}
        options={{
          tabBarLabel: 'Control',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={'white'} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
