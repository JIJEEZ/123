import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [robotConnected, setRobotConnected] = useState(false); // Added state for robot connection status

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const toggleConnection = () => {
    // Toggles the connection status when the button is pressed
    setRobotConnected(!robotConnected);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.fixedContentContainer}>
          <View style={styles.homeRectangleContainer}>
            <View style={styles.homeRectangle}>
              <Text style={styles.homeRectangleTitle}>Home</Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              showsMyLocationButton={true}
              showsUserLocation={true}
              style={styles.map}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Soil Nutrient Mapping App</Text>
            <Text style={styles.textDescription}>
              A mobile application that can map the nutrients (pH level, moisture content,
              and NPK values) using the soil robot collector
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={toggleConnection}>
              <Text style={styles.addButtonLabel}>
                {robotConnected ? 'Connected' : 'Connect'} {/* Button text changes based on connection status */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB9790',
  },
  fixedContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  textContainer: {
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#795548',
    width: 106,
    height: 33,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjust this value as needed
  },
  addButtonLabel: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  homeRectangleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  homeRectangle: {
    backgroundColor: '#795548',
    padding: 20,
    borderRadius: 20,
    width: Dimensions.get('window').width - 10, // Adjust padding/margin as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeRectangleTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
