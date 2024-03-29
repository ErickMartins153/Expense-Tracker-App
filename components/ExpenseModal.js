import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { Ionicons } from "@expo/vector-icons";

import PressableButton from "./PressableButton";

export default function ExpenseModal({ visible, data, showModal, allowEdit }) {
  const [quantity, setQuantity] = useState(1);
  const [expense, setExpense] = useState();
  const [value, setValue] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const expenses = expensesCtx.expenses;

  useEffect(() => {
    const currentExpense = expenses.find(
      (obj) => obj["expense"] === data["expense"]
    ) ?? { quantity, expense, value };
    setQuantity(currentExpense.quantity);
    setExpense(currentExpense.expense);
    setValue(currentExpense.value);
  }, [data]);

  function closeModal() {
    showModal(false);
  }

  function handleUpdateExpense() {
    expensesCtx.updateExpense(data.expense, expense, quantity, value);
    closeModal();
  }

  function deleteExpense() {
    expensesCtx.deleteExpense(data.expense);
    closeModal();
  }

  function handleDeleteExpense() {
    Alert.alert(
      "Are you sure?",
      `Are you sure you want to delete "${data.expense}?"`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: deleteExpense,
        },
      ],
      { cancelable: true }
    );
  }

  function handleFinishExpense() {
    expensesCtx.finishExpense(data.expense);
    closeModal();
  }

  function handleQuantity(operation) {
    if (operation === "sum") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  function handleName(newName) {
    setExpense(newName);
  }

  function handleValue(newValue) {
    setValue(newValue);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView style={styles.rootContainer} behavior="height">
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {allowEdit ? "Update Expense" : "Expense"}
            </Text>
          </View>
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.inputText}>Expense name</Text>
              <TextInput
                placeholder="Set a expense name"
                value={expense}
                style={styles.input}
                maxLength={30}
                editable={allowEdit}
                onChangeText={handleName}
              />
              <Text style={styles.inputText}>Expense unitary value </Text>
              <TextInput
                placeholder="Set a expense value"
                value={value}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={30}
                editable={allowEdit}
                onChangeText={handleValue}
              />
            </View>
            <View style={styles.buttonsContainer}>
              {allowEdit && (
                <View style={styles.iconButtons}>
                  <View style={styles.icon}>
                    <Ionicons
                      name="remove"
                      size={24}
                      color={"white"}
                      onPress={() => handleQuantity("subtract")}
                    />
                  </View>
                  <View style={styles.quantityContainer}>
                    <Text>quantity</Text>
                    <Text style={styles.quantity}>{quantity}</Text>
                  </View>
                  <View style={styles.icon}>
                    <Ionicons
                      name="add"
                      size={24}
                      color={"white"}
                      onPress={() => handleQuantity("sum")}
                    />
                  </View>
                </View>
              )}
              <View style={styles.regularButtons}>
                <PressableButton onPress={closeModal}>Close</PressableButton>
                {allowEdit && (
                  <PressableButton onPress={handleUpdateExpense}>
                    Update
                  </PressableButton>
                )}
              </View>
              {allowEdit && (
                <View style={styles.doneContainer}>
                  <PressableButton
                    extraStyle={{ backgroundColor: "green" }}
                    rippleStyle={{ color: "#00ca00" }}
                    onPress={handleFinishExpense}
                  >
                    Done
                  </PressableButton>
                </View>
              )}
              <View style={styles.deleteContainer}>
                <PressableButton
                  onPress={handleDeleteExpense}
                  extraStyle={styles.deleteButton}
                  rippleStyle={{ color: "#ff2222" }}
                >
                  Delete Expense
                </PressableButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#1d006e",
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  outerContainer: {
    flex: 1,
    marginVertical: 16,
    width: "90%",
    height: 650,
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
    flex: 1,
    paddingVertical: 8,
  },
  iconButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  icon: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#3700cf",
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    marginTop: 4,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  regularButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 16,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  doneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#cc0000",
  },
});
