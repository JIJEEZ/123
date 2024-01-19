import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const ControlScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleControlCommand = (command) => {
    // Implement logic to send control commands to the robot based on the button pressed
    console.log(`Sending command: ${command}`);
    // Example: You can send commands to a server or directly control a connected robot.
  };

  const handleSoilCollection = () => {
    // Implement logic to command the robot to collect soil and analyze it
    console.log('Collecting soil and analyzing...');
    // Example: You can send a specific command to the robot for soil collection and analysis.
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.fixedContentContainer}>
          <View style={styles.controlContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={() => handleControlCommand('forward')}>
              <Text style={styles.controlButtonText}>Forward</Text>
            </TouchableOpacity>
            <View style={styles.horizontalControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleControlCommand('left')}>
                <Text style={styles.controlButtonText}>Left</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleControlCommand('right')}>
                <Text style={styles.controlButtonText}>Right</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.controlButton} onPress={() => handleControlCommand('backward')}>
              <Text style={styles.controlButtonText}>Backward</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.analysisButton} onPress={handleSoilCollection}>
              <Text style={styles.controlButtonText}>Collect & Analyze</Text>
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
  controlContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginVertical: 50,
    marginHorizontal: 50,
  },
  analysisButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ControlScreen;
