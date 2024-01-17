import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import { Button, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AllExpensesScreen from "./screens/AllExpensesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#280191" },
            headerTintColor: "#e7e7e7",
            tabBarStyle: { backgroundColor: "#280191" },
            tabBarActiveTintColor: "#e7e7e7",
            tabBarActiveBackgroundColor: "#4201f3",
            tabBarInactiveTintColor: "#afafaf",
            headerRight: ({ tintColor }) => (
              <Ionicons
                name="add"
                color={tintColor}
                size={24}
                style={styles.headerButton}
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
  rootContainer: { backgroundColor: "#240677" },
  headerButton: {
    marginRight: 24,
    marginVertical: "auto",
  },
});
