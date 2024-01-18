import { StyleSheet, Text, View } from "react-native";

export default function Header({ children, expenses }) {
  const totalValue = expenses.reduce((sum, obj) => {
    const checkedNumber = obj.value.replace(",", ".");
    return sum + parseFloat(checkedNumber) * obj.quantity;
  }, 0);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View>
        <Text style={styles.text}>${totalValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#e7e7e7",
  },
  textContainer: {},
  text: {
    color: "#1d006e",
    fontWeight: "bold",
    fontSize: 18,
  },
});
