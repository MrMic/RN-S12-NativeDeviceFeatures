import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";

import OutlinedButton from "../UI/OutlinedButton"
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../util/location";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  // ______________________________________________________________________
  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  // ______________________________________________________________________
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  // ______________________________________________________________________
  function pickOnMapHandler() { }

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = <Image
      style={styles.image}
      source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
    />
  }

  // ______________________________________________________________________
  return <View>
    <View style={styles.mapPreview}>
      {locationPreview}
    </View>
    <View style={styles.actions}>
      <OutlinedButton icon="location" onPress={getLocationHandler} >
        Locate User
      </OutlinedButton>
      <OutlinedButton icon="map" onPress={pickOnMapHandler}>
        Pick on Map
      </OutlinedButton>
    </View>
  </View>
}

export default LocationPicker

// ______________________________________________________________________
const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  }
});
