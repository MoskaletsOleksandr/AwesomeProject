import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = ({ navigation, route }) => {
  const { location } = route.params;

  const handleGoBack = () => {
    navigation.navigate('Posts');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={handleGoBack}>
        <Text style={styles.confirmButtonText}>Повернутися</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  confirmButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#FF6C00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
