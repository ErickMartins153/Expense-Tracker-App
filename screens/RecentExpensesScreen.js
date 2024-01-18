import { useContext, useState } from "react";
import { Text } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseList from "../components/ExpenseList";
import ExpenseModal from "../components/ExpenseModal";

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
      {recentExpenses.length > 0 ? (
        <ExpenseList data={recentExpenses} selectExpense={handleShowModal} />
      ) : (
        <Text>Add a expense!</Text>
      )}
    </>
  );
}
