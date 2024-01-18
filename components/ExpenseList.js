import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function ExpenseList({ data, customStyle, selectExpense }) {
  function handleSelection(item) {
    selectExpense(true, { expense: item.expense, value: item.value });
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
                <Text>{item.expense}</Text>
                <Text>data</Text>
              </View>
              <Text>$ {item.value}</Text>
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
    padding: 4,
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  contentContainer: {
    margin: 8,
    justifyContent: "space-evenly",
  },
  pressed: {
    opacity: 0.5,
  },
});
