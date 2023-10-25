import { FlatList,TouchableOpacity,Text,View,StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 

function PeopleList({ navigation }) {
    const [people, setPeople] = useState([]); 
  return (<View style={styles.container}>{people.length > 0 ?
    <FlatList
        data={[]}
        renderItem={({ item }) => null}
        keyExtractor={item => item.login.uuid}
    />:<TouchableOpacity onPress={()=> navigation.navigate("AddFromContact")} >
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