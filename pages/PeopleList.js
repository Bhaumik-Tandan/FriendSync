import { FlatList,TouchableOpacity,Text,View,StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import {getLocalStoreData} from '../helper/localStorage';
import Person from "../components/Person";

function PeopleList({ navigation }) {
    const [people, setPeople] = useState([]); 
    useEffect(() => {
        const getPeople = async () => {
            const people = await getLocalStoreData('people');
            setPeople(people);
        };
        getPeople();
    }, []);
    

  return (<View style={styles.container}>{people && people.length > 0 ?
    <FlatList
        data={people}
        renderItem={({ item }) => <Person {...item} />}
        keyExtractor={item => item.name}
        numColumns={2}
    />:<TouchableOpacity onPress={()=> navigation.navigate("AddPeople")} >
        <Ionicons name="person-add-sharp" size={50} color="black" />
        <Text>Add People</Text>
    </TouchableOpacity>}</View>)
  ;
}

export default PeopleList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent:"center"
    }
});