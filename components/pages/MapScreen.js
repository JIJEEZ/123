import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; // Import FontAwesome
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [soilProperties, setSoilProperties] = useState({
    nitrogen: 0,
    phosphorous: 0,
    potassium: 0,
    acidity: 0,
    moisture: 0,
  });

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

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const randomSoilProperties = generateRandomSoilProperties();
    setMarkers((prevMarkers) => [...prevMarkers, { ...coordinate, soilProperties: randomSoilProperties }]);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const renderIcon = (name) => {
    switch (name) {
      case 'Nitrogen':
        return <MaterialCommunityIcons name="alpha-n-box" color={'green'} size={24} />
      case 'Phosphorous':
        return <MaterialCommunityIcons name="alpha-p-box" color={'green'} size={24} />
      case 'Potassium':
        return <MaterialCommunityIcons name="alpha-k-box" color={'green'} size={24} />
      case 'Acidity':
        return <MaterialCommunityIcons name="thermometer" color={'red'} size={24} />
      case 'Moisture':
        return <FontAwesome name="tint" size={24} color="blue" />
      default:
        return null;
    }
  };

  const generateRandomSoilProperties = () => {
    const index = markers.length + 1;
    const name = `Sampling Point #${index}`;
    return {
      name,
      Nitrogen: (Math.random() * 10).toFixed(2),
      Phosphorous: (Math.random() * 10).toFixed(2),
      Potassium: (Math.random() * 10).toFixed(2),
      Acidity: (Math.random() * 14).toFixed(2),
      Moisture: `${(Math.random() * 100).toFixed(2)}%`,
    };
  };

  const deleteMarker = () => {
    const updatedMarkers = markers.filter((marker) => marker.latitude !== selectedMarker.latitude || marker.longitude !== selectedMarker.longitude);
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.fixedContentContainer}>
          <View style={styles.homeRectangleContainer}>
            <View style={styles.homeRectangle}>
              <Text style={styles.homeRectangleTitle}>Map</Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              provider="google"
              showsMyLocationButton={true}
              showsUserLocation={true}
              style={styles.map}
              onPress={handleMapPress}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index.toString()}
                  coordinate={marker}
                  title={marker.soilProperties.name}
                  onPress={() => handleMarkerPress(marker)}
                >
                  <Callout>
                    <View>
                      <Text style={styles.calloutText}>Tap here for details</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>
                    {selectedMarker ? `Latitude: ${selectedMarker.latitude}\nLongitude: ${selectedMarker.longitude}` : ''}
                  </Text>
                  {selectedMarker && selectedMarker.soilProperties && (
                    <>
                      <View style={styles.iconLabelContainer}>
                        <FontAwesome name="map-marker" size={24} color="red" />
                        <Text style={[styles.iconLabelText, styles.samplingPointText]}>{selectedMarker.soilProperties.name}</Text>
                      </View>
                      {Object.keys(selectedMarker.soilProperties).map((key) => (
                        key !== 'name' && (
                          <View key={key} style={styles.iconLabelContainer}>
                            {renderIcon(key)}
                            <Text style={styles.iconLabelText}>{`${key}: ${selectedMarker.soilProperties[key]}`}</Text>
                          </View>
                        )
                      ))}
                    </>
                  )}
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={[styles.button, styles.buttonDelete]}
                      onPress={() => {
                        deleteMarker();
                      }}
                    >
                      <Text style={styles.textStyle}>Delete Marker</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
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
    height: 280,
  },
  homeRectangleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0, // Adjust this value to control the distance from the status bar
  },
  homeRectangle: {
    backgroundColor: '#795548',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeRectangleTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContent: {
    backgroundColor: '#D7CCC8',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  textStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalDetailText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
  },
  buttonDelete: {
    backgroundColor: '#7a4636',
    marginTop: 20,
  },
  calloutText: {
    fontSize: 12,
    marginBottom: 5,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconLabelText: {
    marginLeft: 5,
  },
  samplingPointText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapScreen;