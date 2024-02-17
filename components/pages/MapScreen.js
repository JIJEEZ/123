import React, { useState, useEffect } from 'react';
// import { Image } from 'expo-image';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

// import site_sample from './assets/site_sample.png'; 

const baseUrl = "http://192.168.254.110:5000/api/"

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [soilProperties, setSoilProperties] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    acidity: 0,
    moisture: 0,
  });
  const [userId, setUserId] = useState(-1)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
  
      const data = await getMarkers(userId); // Await the function call
  
      // Check if data is valid before processing it further
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          // console.log(i)
          const entry = {
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            soilProperties: {
              moisture: String(data[i].moisture),
              acidity: String(data[i].acidity),
              nitrogen: String(data[i].nitrogen),
              phosphorus: String(data[i].phosphorus),
              potassium: String(data[i].potassium)
            }
          };
          setMarkers(prevMarkers => [...prevMarkers, entry]);
        }
      } else {
        console.error('Invalid data received:', data);
      }
    })();
  }, []); 
  

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const randomSoilProperties = generateRandomSoilProperties();

    const result = storeMarker(userId, coordinate, randomSoilProperties);
    setMarkers([...markers, { ...coordinate, soilProperties: randomSoilProperties }]);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const generateRandomSoilProperties = () => {
    return {
      nitrogen: (Math.random() * 10).toFixed(2),
      phosphorus: (Math.random() * 10).toFixed(2),
      potassium: (Math.random() * 10).toFixed(2),
      acidity: (Math.random() * 14).toFixed(2),
      moisture: `${(Math.random() * 100).toFixed(2)}%`,
      soilType: 'silt',
      image: "none"
    };
  };
  
  // TODO: add image to base 64 conversion

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

  // const fetchProperties = async () => {
  //   try {
  //     // const base64Image = await convertImageToBase64(imageUri)
  //     console.log("LOADING LOADING LOADING...")
  //     // console.log(base64Image)
  //     const response = await fetch('https://soilpd-2024.up.railway.app/api/analysis/get_analysis', { 
  //     method: 'GET',
  //     body: JSON.stringify({
  //         "userId":-1,
  //       }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //     console.log("working2")
  //     const result = await response.json();
  //     // result assign to state
  //     console.log("working3")
  //     console.log(result)
  //   } catch (error) {
  //     // console.log(error)
  //   }
  // };

  async function getMarkers(userId){
    // Specify the API endpoint for user data
    const apiUrl = baseUrl+'analysis/'+userId;
    // console.log(apiUrl)

    // Make a GET request using the Fetch API
    const data = await fetch(apiUrl,{
      method: 'GET',
      headers: { 
        'Content-type': 'application/json' 
      },
      // body: JSON.stringify({ "userId": userId })
      })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        // Process the retrieved user data
        console.log('msg:', response.msg);
        // console.log("analysis:", response.analysis);
        return response.analysis
      })
      .catch(error => {
        console.error('Error:', error);
        // Log the response for more information
        console.log('Response:', error);
        // console.log('body:', response);
      });

      if(!data){
        return false
      }

      return data
  }

  async function storeMarker(userId,coordinates,properties){
    // Specify the API endpoint for user data
    const apiUrl = baseUrl+'analysis/store/'+userId;
    console.log(apiUrl)
    
    // console.log({...coordinates, ...properties})
    // properties.image = 
    // console.log("PASSED")

    const toStore = { ...coordinates, ...properties }
    console.log(toStore)

    // Make a GET request using the Fetch API
    const data = await fetch(apiUrl,{
      method: 'POST',
      headers: { 
        'Content-type': 'application/json' 
      },
      body: JSON.stringify(toStore)
      })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        // Process the retrieved user data
        console.log('msg:', response.msg);
        // console.log("analysis:", response.analysis);
        return {msg: "Store success", data: toStore}
      })
      .catch(error => {
        console.error('Error:', error);
        // Log the response for more information
        console.log('Response:', error);
        // console.log('body:', response);
      });

      if(!data){
        return false
      }

      return data
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
          {/* <TouchableOpacity onPress={() => onPress(userId)} ><Text>click me</Text></TouchableOpacity> */}
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
                      {/* <Image
                        style={styles.image}
                        source={selectedMarker.image}
                        placeholder={"text"}
                        contentFit="contain"
                        transition={1000}
                      /> */}
                      <Text style={styles.modalDetailText}>Nitrogen: {selectedMarker.soilProperties.nitrogen}</Text>
                      <Text style={styles.modalDetailText}>Phosphorus: {selectedMarker.soilProperties.phosphorus}</Text>
                      <Text style={styles.modalDetailText}>Potassium: {selectedMarker.soilProperties.potassium}</Text>
                      <Text style={styles.modalDetailText}>Acidity: {selectedMarker.soilProperties.acidity}</Text>
                      <Text style={styles.modalDetailText}>Moisture: {selectedMarker.soilProperties.moisture}</Text>
                      <Text style={styles.modalDetailText}>Type: {selectedMarker.soilProperties.soilType}</Text>
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

  image:{
    border: 1,
    width: 100,
    height: 100
  }

});

export default MapScreen;
