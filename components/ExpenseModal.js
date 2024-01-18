import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import PressableButton from "./PressableButton";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

export default function ExpenseModal({ visible, data, showModal }) {
  const expensesCtx = useContext(ExpensesContext);
  function closeModal() {
    showModal(false);
  }

  function handleUpdateExpense() {
    expensesCtx.updateExpense(data.expense);
    closeModal();
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Update Expense</Text>
        </View>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.inputText}>Expense name</Text>
            <TextInput
              placeholder="Set a expense name"
              value={data.expense}
              style={styles.input}
              maxLength={30}
            />
            <Text style={styles.inputText}>Expense value</Text>
            <TextInput
              placeholder="Set a expense value"
              value={data.value}
              style={styles.input}
              maxLength={30}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <PressableButton onPress={closeModal}>Close Modal</PressableButton>
            <PressableButton onPress={handleUpdateExpense}>
              Update Expense
            </PressableButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#1d006e",
    marginTop: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  outerContainer: {
    flex: 1,
    width: "90%",
    height: "90%",
    marginHorizontal: "5%",
    backgroundColor: "#e7e7e7",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 8,
  },
  innerContainer: {
    marginTop: 8,
    padding: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
  },
  inputText: {
    marginVertical: 16,
    fontSize: 16,
  },
  titleContainer: {
    backgroundColor: "#3700cf",
    padding: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  titleText: {
    color: "white",
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 16,
  },
});
