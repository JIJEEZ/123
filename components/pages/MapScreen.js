import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
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
      const data = fetchProperties()
      
      // setMarkers([...markers, { ...coordinate, soilProperties: randomSoilProperties }]);
    })();
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const randomSoilProperties = generateRandomSoilProperties();
    setMarkers([...markers, { ...coordinate, soilProperties: randomSoilProperties }]);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const generateRandomSoilProperties = () => {
    return {
      nitrogen: (Math.random() * 10).toFixed(2),
      phosphorous: (Math.random() * 10).toFixed(2),
      potassium: (Math.random() * 10).toFixed(2),
      acidity: (Math.random() * 14).toFixed(2),
      moisture: `${(Math.random() * 100).toFixed(2)}%`,
    };
  };

  const deleteMarker = () => {
    const updatedMarkers = markers.filter((marker) => marker !== selectedMarker);
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };
  
  // const convertImageToBase64 = async (imageUri) => {
  //   const response = await fetch(imageUri);
  //   const blob = await response.blob();
  //   const base64Image = await convertBlobToBase64(blob);
  //   return base64Image;
  // };

  // const convertBlobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(',')[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  const fetchProperties = async () => {
    try {
      // const base64Image = await convertImageToBase64(imageUri)
      console.log("LOADING LOADING LOADING...")
      // console.log(base64Image)
      const response = await fetch('https://soilpd-2024.up.railway.app/api/analysis/get_analysis', { 
      method: 'GET',
      body: JSON.stringify({
          "userId":-1,
        }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      console.log("working2")
      const result = await response.json();
      // result assign to state
      console.log("working3")
      console.log(result)
    } catch (error) {
      // console.log(error)
    }
  };

  const onPress = () =>{
    console.log("pressed")
  }


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
          <TouchableOpacity onPress={onPress}><Text>click me</Text></TouchableOpacity>
            <MapView
              showsMyLocationButton={true}
              showsUserLocation={true}
              style={styles.map}
              onPress={handleMapPress}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker}
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
                      <Text style={styles.modalDetailText}>Nitrogen: {selectedMarker.soilProperties.nitrogen}</Text>
                      <Text style={styles.modalDetailText}>Phosphorous: {selectedMarker.soilProperties.phosphorous}</Text>
                      <Text style={styles.modalDetailText}>Potassium: {selectedMarker.soilProperties.potassium}</Text>
                      <Text style={styles.modalDetailText}>Acidity: {selectedMarker.soilProperties.acidity}</Text>
                      <Text style={styles.modalDetailText}>Moisture: {selectedMarker.soilProperties.moisture}</Text>
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
    height: 610,
  },
  homeRectangleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    backgroundColor: '#D7CCC8', // Adjust the color to match the theme
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
    color: '#000000', // Adjust text color to match the theme
  },

  buttonDelete: {
    backgroundColor: '#D32F2F',
    marginTop: 20,
  },

});

export default MapScreen;
