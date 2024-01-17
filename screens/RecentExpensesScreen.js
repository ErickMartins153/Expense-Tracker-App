import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseList from "../components/ExpenseList";

export default function RecentExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.recentExpenses;
  console.log(recentExpenses);
  return recentExpenses.length > 0 ? (
    <ExpenseList data={recentExpenses} />
  ) : (
    <Text>Add a expense!</Text>
  );
}
