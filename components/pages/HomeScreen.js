import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';

const HomeScreen = () => {
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.747274222966!2d121.1485674781354!3d14.677561123294078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397bbfc5993bfa1%3A0x8c02786f2a23ccc7!2sAdventure%20Farm!5e0!3m2!1sen!2sph!4v1704433119485!5m2!1sen!2sph"
              style={{ border: "0", width: "100%", height: '300px' }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Soil Nutrient Mapping App</Text>
            <Text style={styles.textDescription}>
              A mobile application that can map the nutrients (pH level, moisture content,
              and NPK values) using the soil robot collector
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonLabel}>Connect</Text>
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
    marginTop: 40,
    marginBottom: 40,
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
    top: 100,
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
    width: '100%',
    height: 55,
  },
  homeRectangleTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
    bottom: 5,
  },
});

export default HomeScreen;
