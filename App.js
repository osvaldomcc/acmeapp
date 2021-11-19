import "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./core/theme";
import DashboardScreen from "./screens/DashboardScreen";
import WorkTicketScreen from "./screens/WorkTicketScreen";
import DirectionsScreen from "./screens/DirectionsScreen";
import TicketFormScreen from "./screens/TicketFormScreen";
import CalendarScreen from "./screens/CalendarScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  const headerOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={headerOptions} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="WorkTicket" component={WorkTicketScreen} />
        <Stack.Screen name="Directions" component={DirectionsScreen} />
        <Stack.Screen name="TicketForm" component={TicketFormScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
