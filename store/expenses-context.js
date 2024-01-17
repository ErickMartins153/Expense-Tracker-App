import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: {},
  recentExpenses: {},
  addExpense: (expenseName, expenseValue) => {},
  updateExpense: (expenseName) => {},
  deleteExpense: (expenseName) => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);

  function addExpense(expense, value) {
    setExpenses((prevExpenses) => [
      { expense: expense, value: value },
      ...prevExpenses,
    ]);
    setRecentExpenses((prevExpenses) => [
      { expense: expense, value: value },
      ...prevExpenses,
    ]);
  }

  function updateExpense(expenseName) {
    setRecentExpenses((prevExpenses) =>
      prevExpenses.filter(({ expense }) => expense !== expenseName)
    );
  }

  function deleteExpense(expenseName) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter(({ expense }) => expense !== expenseName)
    );
    updateExpense(expenseName);
  }

  const value = {
    expenses: expenses,
    recentExpenses: recentExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
