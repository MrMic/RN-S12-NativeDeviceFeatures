import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  // ______________________________________________________________________
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  // ______________________________________________________________________
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    // console.log("🪚 image:", image);
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image picked yet.</Text>

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View >
  )

}

export default ImagePicker

// ______________________________________________________________________
const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  }
});
