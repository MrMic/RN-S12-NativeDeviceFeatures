import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";

function OutlinedButton({ children, icon, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        android_ripple={{ color: Colors.primary500 }}
      >
        <Ionicons
          style={styles.icon}
          name={icon}
          size={18}
          color={Colors.primary500}
        />
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default OutlinedButton;

// ______________________________________________________________________
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
