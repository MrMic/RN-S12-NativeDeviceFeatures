import { StyleSheet, View } from "react-native"
import OutlinedButton from "../UI/OutlinedButton"
import { Colors } from "../../constants/colors";

function LocationPicker() {
  // ______________________________________________________________________
  function getLocationHandler() { }

  // ______________________________________________________________________
  function pickOnMapHandler() { }

  // ______________________________________________________________________
  return <View>
    <View style={styles.mapPreview}></View>
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
});
