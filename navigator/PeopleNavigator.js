import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleList from '../pages/PeopleList';
import AddPeople from '../pages/AddPeople';
import AddFromContact from '../pages/AddFromContact';
import PAGES from '../constants/pages';
const Stack = createNativeStackNavigator();

function PeopleNavigator() {

    return (
            <Stack.Navigator  >
            <Stack.Group>
        <Stack.Screen
            name={PAGES.PEOPLE_LIST}
            component={PeopleList}
        />
        <Stack.Screen
            name={PAGES.ADD_PEOPLE}
            component={AddPeople}
        />
        <Stack.Screen
            name={PAGES.ADD_FROM_CONTACT}
            component={AddFromContact}
        /> 
    </Stack.Group>
            </Stack.Navigator>
    );
}

export default PeopleNavigator;