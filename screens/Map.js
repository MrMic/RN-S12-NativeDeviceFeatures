import { useCallback, useLayoutEffect, useState } from "react";

import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps"

import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  // ______________________________________________________________________
  function selectLocationHandler(event) {
    // console.log("🪚 event:", event.nativeEvent);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  // ______________________________________________________________________
  const savePickedLocationHandler = useCallback(
    () => {
      if (!selectedLocation) {
        Alert.alert(
          "No Location Picked!",
          "Please pick a location on the map.",
          [{ text: "Okay" }]
        );
        return;
      }
      console.log("📌 selectedLocation:", selectedLocation);

      navigation.navigate("AddPlace", {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng
      });
    }, [navigation, selectedLocation]
  )

  // ______________________________________________________________________
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    })
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Pick Location"
          description="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }} />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
