import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { Button, View } from "react-native";

function ImagePicker() {
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
    console.log("🪚 image:", image);
  }

  return (
    <View>
      <View>

      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View >
  )

}

export default ImagePicker
