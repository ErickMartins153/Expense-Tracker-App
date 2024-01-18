import { StyleSheet, Text, View } from "react-native";

export default function FallbackText({ children }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});
