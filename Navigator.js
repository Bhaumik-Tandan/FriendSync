import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleList from './pages/PeopleList';
import AddPeople from './pages/AddPeople';
const Stack = createNativeStackNavigator();

function Navigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator  >
            <Stack.Group>
        <Stack.Screen
            name={"PeopleList"}
            component={PeopleList}
        />
        <Stack.Screen
            name={"AddPeople"}
            component={AddPeople}
        />
    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;