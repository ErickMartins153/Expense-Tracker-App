import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: {},
  recentExpenses: {},
  addExpense: (expenseName, expenseValue) => {},
  finishExpense: (expenseName) => {},
  deleteExpense: (expenseName) => {},
  updateExpense: (expenseName, newName, newQuantity, newValue) => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);

  function addExpense(expense, value) {
    setExpenses((prevExpenses) => [
      { expense: expense, value: value, quantity: 1 },
      ...prevExpenses,
    ]);
    setRecentExpenses((prevExpenses) => [
      { expense: expense, value: value, quantity: 1 },
      ...prevExpenses,
    ]);
  }

  function finishExpense(expenseName) {
    setRecentExpenses((prevExpenses) =>
      prevExpenses.filter(({ expense }) => expense !== expenseName)
    );
  }

  function deleteExpense(expenseName) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter(({ expense }) => expense !== expenseName)
    );
    finishExpense(expenseName);
  }

  function updateExpense(expenseName, newName, newQuantity, newValue) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((obj) => {
        if (obj["expense"] === expenseName) {
          return {
            ...obj,
            expense: newName ?? obj.expense,
            quantity: newQuantity ?? obj.quantity,
            value: newValue ?? obj.value,
          };
        } else {
          return obj;
        }
      })
    );
    setRecentExpenses((prevExpenses) =>
      prevExpenses.map((obj) => {
        if (obj["expense"] === expenseName) {
          return {
            ...obj,
            expense: newName ?? obj.expense,
            quantity: newQuantity ?? obj.quantity,
            value: newValue ?? obj.value,
          };
        } else {
          return obj;
        }
      })
    );
  }

  const value = {
    expenses: expenses,
    recentExpenses: recentExpenses,
    addExpense: addExpense,
    finishExpense: finishExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
