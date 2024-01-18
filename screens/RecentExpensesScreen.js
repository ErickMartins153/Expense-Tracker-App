import { useContext, useState } from "react";
import { Text } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseList from "../components/ExpenseList";
import ExpenseModal from "../components/ExpenseModal";
import FallbackText from "../components/FallbackText";
import Header from "../components/Header";

export default function RecentExpensesScreen() {
  const [showModal, setShowModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    expense: "",
    value: "",
  });

  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.recentExpenses;

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
      <Header expenses={recentExpenses}>Last 7 days</Header>
      {recentExpenses.length > 0 ? (
        <ExpenseList data={recentExpenses} selectExpense={handleShowModal} />
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
