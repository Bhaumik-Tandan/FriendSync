import { NavigationContainer } from "@react-navigation/native";
import PAGES from "../constants/pages";
import PeopleNavigator from "./PeopleNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SettingsNavigator from "./SettingsNavigator";

const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Group>
          <Tab.Screen
            name={PAGES.PEOPLE_NAVIGATOR}
            component={PeopleNavigator}
            options={{
              headerShown: false,
              tabBarLabel: PAGES.PEOPLE_LIST,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
           <Tab.Screen
            name={PAGES.SETTINGS_NAVIGATOR}
            component={SettingsNavigator}
            options={{
              headerShown: false,
              tabBarLabel: PAGES.SETTINGS,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
            />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
