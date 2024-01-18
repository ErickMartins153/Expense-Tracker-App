import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PressableButton({
  children,
  onPress,
  extraStyle,
  rippleStyle,
}) {
  let defaultRipple = { color: "#4300fc" };

  if (rippleStyle) {
    defaultRipple = rippleStyle;
  }

  return (
    <View style={[styles.outerContainer, extraStyle]}>
      <Pressable
        onPress={onPress}
        android_ripple={defaultRipple}
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
      >
        <View style={styles.innerContainer}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: 150,
    backgroundColor: "#3700cf",
    borderRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
  innerContainer: {
    padding: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  pressed: {
    opacity: 0.5,
  },
});
