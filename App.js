import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./navigator/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { PeopleProvider } from "./context/PeopleContext";

export default function App() {
  return (
    <SafeAreaProvider
      style={{
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <StatusBar style="auto" />
      <PeopleProvider>
        <RootNavigator />
      </PeopleProvider>
    </SafeAreaProvider>
  );
}
