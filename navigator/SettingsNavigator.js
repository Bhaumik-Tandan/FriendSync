import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../pages/Settings";
import PAGES from "../constants/pages";
const Stack = createNativeStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name={PAGES.SETTINGS} component={Settings} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
