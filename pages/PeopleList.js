import { FlatList,TouchableOpacity,Text,View,StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import {getLocalStoreData} from '../helper/localStorage';
import Person from "../components/Person";
import {calcHeight,calcWidth} from '../helper/res';
import { FAB } from 'react-native-paper';
import { usePeople } from "../context/PeopleContext";
import PAGES from "../constants/pages";

function PeopleList({ navigation }) {
    const {people} = usePeople();


  return (<View style={styles.container}>{people && people.length > 0 ?
    <FlatList
        data={people}
        renderItem={({ item }) => <Person {...item} />}
        keyExtractor={item => item.name}
        numColumns={2}
    />:<TouchableOpacity style={styles.addPeopleButton} onPress={()=> navigation.navigate(PAGES.ADD_PEOPLE)} >
        <Ionicons name="person-add-sharp" size={50} color="black" />
        <Text>Add People</Text>
    </TouchableOpacity>}
    <View style={styles.fabContainer}>
                <FAB  icon="plus" onPress={()=> navigation.navigate(PAGES.ADD_PEOPLE)} />
            </View>
    </View>)
  ;
}

export default PeopleList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent:"center"
    },
    fabContainer: {
        position: 'absolute',
        bottom: calcHeight(5), // 5% of the device height
        right: calcWidth(5), // 5% of the device width
    },
    addPeopleButton: {
        padding: 16,
        borderRadius: 8,
        elevation: 2,
        marginBottom: 8,
        alignItems: "center",
        justifyContent:"center",
    },
});