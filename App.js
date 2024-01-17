import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import { useState } from "react";
import NewExpenseModal from "./components/NewExpenseModal";

const Tab = createBottomTabNavigator();

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  function handleModal(state) {
    setShowModal(state);
  }

  function handleNewExpense(expense) {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  }

  return (
    <>
      <StatusBar style="light" hidden={true} />
      <NavigationContainer>
        {showModal && (
          <NewExpenseModal
            showModal={handleModal}
            addExpense={handleNewExpense}
          />
        )}
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#3700cf" },
            headerTintColor: "#e7e7e7",
            tabBarStyle: { backgroundColor: "#3700cf" },
            tabBarActiveTintColor: "#e7e7e7",
            tabBarActiveBackgroundColor: "#4201f3",
            tabBarInactiveTintColor: "#afafaf",
            headerRight: ({ tintColor }) => (
              <Ionicons
                name="add"
                color={tintColor}
                size={24}
                style={styles.headerButton}
                onPress={() => handleModal(true)}
              />
            ),
          }}
        >
          <Tab.Screen
            name="RecentExpenses"
            component={RecentExpensesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="hourglass" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="AllExpenses"
            component={AllExpensesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 24,
    marginVertical: "auto",
  },
});
