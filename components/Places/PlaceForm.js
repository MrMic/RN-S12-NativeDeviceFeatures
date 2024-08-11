import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  // ______________________________________________________________________
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }


  // ______________________________________________________________________
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  // ______________________________________________________________________
  const pickLocationHandler = useCallback(
    (location) => {
      setPickedLocation(location);
    }, []);

  // ______________________________________________________________________
  function savePlaceHandler() {
    console.log("🪚 enteredTitle:", enteredTitle);
    console.log("🪚 selectedImage:", selectedImage);
    console.log("🪚 pickedLocation:", pickedLocation);
  }


  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler} >Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm;

// ______________________________________________________________________
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
});
