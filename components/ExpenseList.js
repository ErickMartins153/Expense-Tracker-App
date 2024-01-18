import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function ExpenseList({ data, customStyle, selectExpense }) {
  function handleSelection(item) {
    selectExpense(true, {
      expense: item.expense,
      quantity: item.quantity,
      value: item.value,
    });
  }

  return (
    <View style={[styles.rootContainer, customStyle]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.expense}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => handleSelection(item)}
              android_ripple={{ color: "#cacaca" }}
              style={({ pressed }) =>
                pressed
                  ? [styles.outerContainer, styles.pressed]
                  : [styles.outerContainer]
              }
            >
              <View style={styles.contentContainer}>
                <Text style={styles.text}>{item.expense}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[styles.text, styles.value]}>$ {item.value}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {},
  outerContainer: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#3700cf",
    overflow: "hidden",
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-evenly",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  value: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "white",
    color: "#3700cf",
  },
  pressed: {
    opacity: 0.5,
  },
});
