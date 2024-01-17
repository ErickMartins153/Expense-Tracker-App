import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PressableButton from "./PressableButton";
import { useContext, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";

export default function NewExpenseModal({ showModal }) {
  const expensesCtx = useContext(ExpensesContext);
  const [newExpense, setNewExpense] = useState("");
  const [newValue, setNewValue] = useState(0);

  function handleNewExpense(text) {
    setNewExpense(text);
  }
  function handleNewValue(text) {
    setNewValue(text);
  }

  function closeModal() {
    showModal(false);
  }

  function handleSubmitExpense() {
    if (newExpense.trim() === "") return;
    expensesCtx.addExpense(newExpense, newValue);
    closeModal();
  }

  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Title</Text>
        </View>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <TextInput
              placeholder="Insert expense name"
              style={styles.input}
              maxLength={30}
              onChangeText={handleNewExpense}
            />
          </View>
          <View style={styles.innerContainer}>
            <TextInput
              placeholder="Insert expense value"
              style={styles.input}
              maxLength={30}
              onChangeText={handleNewValue}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <PressableButton onPress={closeModal}>Close Modal</PressableButton>
            <PressableButton onPress={handleSubmitExpense}>
              Save Expense
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
  },
});
