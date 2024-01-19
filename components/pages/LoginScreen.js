import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ImageBackground } from 'react-native';

//assets
import bg from './assets/bg.png';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignIn = () => {
    // Add logic for signing in
    setModalVisible(false);
  };

  const handleCreateAccount = () => {
    // Add logic for creating a new account
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backgroundImage} onPress={() => setModalVisible(true)}>
            <Text style={styles.backgroundText}>Tap anywhere to continue</Text>
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Login</Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleSignIn}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleCreateAccount}>
                  <Text style={styles.buttonText}>Create New Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#795548',
    width: '100%',
  },
  backgroundText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 300,
    textAlign: 'center',
    width: '100%',
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default App;
