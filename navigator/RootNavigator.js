import { NavigationContainer } from '@react-navigation/native';
import PAGES from '../constants/pages';
import PeopleNavigator from './PeopleNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function RootNavigator() {

    return (
        <NavigationContainer>
              <Tab.Navigator>
        <Tab.Group>
            <Tab.Screen
                name={PAGES.PEOPLE_NAVIGATOR}
                component={PeopleNavigator}
                options={{ headerShown: false }}
            />
        </Tab.Group>
    </Tab.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;