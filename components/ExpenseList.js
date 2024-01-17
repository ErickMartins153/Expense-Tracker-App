import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ExpenseList({ data, customStyle }) {
  return (
    <View style={[styles.rootContainer, customStyle]}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={styles.contentContainer}>
              <Text>{item.expense}</Text>
              <Text>$ {item.value}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 4,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
