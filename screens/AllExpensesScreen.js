import { useContext, useState } from "react";
import { Text } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseList from "../components/ExpenseList";
import ExpenseModal from "../components/ExpenseModal";
import FallbackText from "../components/FallbackText";
import Header from "../components/Header";

export default function AllExpensesScreen() {
  const [showModal, setShowModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    expense: "",
    value: "",
  });

  const expensesCtx = useContext(ExpensesContext);
  const expenses = expensesCtx.expenses;

  function handleShowModal(state, expenseObj = null) {
    setShowModal(state);
    setCurrentExpense({ ...expenseObj });
  }

  return (
    <>
      <ExpenseModal
        visible={showModal}
        data={currentExpense}
        showModal={handleShowModal}
      />
      <Header expenses={expenses}>All time expenses</Header>
      {expenses.length > 0 ? (
        <ExpenseList data={expenses} selectExpense={handleShowModal} />
      ) : (
        <FallbackText>
          Add an expense by clicking on the{" "}
          <Text style={{ fontWeight: "bold", color: "#1d006e" }}>+</Text> symbol
          above!
        </FallbackText>
      )}
    </>
  );
}
