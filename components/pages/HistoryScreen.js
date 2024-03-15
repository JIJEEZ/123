import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HistoryScreen = ({ route }) => {
  const { userId } = route.params;
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    // Fetch soil analyses for the given userId and update state
    const fetchData = async () => {
      // Your API call to fetch soil analyses goes here
      // For example:
      // const analysesData = await fetchSoilAnalyses(userId);
      // setAnalyses(analysesData);
    };

    fetchData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soil Analyses History</Text>
      <FlatList
        data={analyses}
        keyExtractor={(item) => item.mapId}
        renderItem={({ item }) => (
          <View style={styles.analysisItem}>
            <Text>Map ID: {item.mapId}</Text>
            {/* Display other analysis details here */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB9790',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  analysisItem: {
    backgroundColor: '#D7CCC8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default HistoryScreen;