import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { location } = route.params;
  console.log(location);

  const handleSelectLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    // Передаємо обрану локацію назад на попередній екран
    navigation.navigate('Posts');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleSelectLocation}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.02105,
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmLocation}
        // disabled={!selectedLocation}
      >
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
