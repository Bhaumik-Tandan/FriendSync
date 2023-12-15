import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";
import { MaterialIcons } from "@expo/vector-icons";
import { usePeople } from "../context/PeopleContext";
import Loader from "../components/Loader";
import PAGES from "../constants/pages";
import { calcHeight,calcWidth,getFontSizeByWindowWidth } from "../helper/res";

export default function AddFromContact({ navigation }) {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { handleAddPeople: addPeople, loading, setLoading } = usePeople();
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setLoading(true);
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) {
          setContacts(data);
        }
        setLoading(false);
      }
    })();
  }, []);

  const toggleContactSelection = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prev)=>{
        if(isAllSelected)
      setIsAllSelected(false);
        return prev.filter((c) => c !== contact)});
    } else {
      setSelectedContacts((prev)=>{
        setIsAllSelected(prev.length==contacts.length-1)
        return [...prev, contact]});
    }
    
  };

  const handleAddPeople = async () => {
    const newPeople = selectedContacts.map((contact) => {
      const { name, jobTitle, company, birthday } = contact;

      const newPerson = {
        name: name || "",
        birthday: getBirthdayTimestamp(birthday),
        description: `${jobTitle || ""} ${company || ""}`.trim(),
      };

      return newPerson;
    });

    await addPeople(newPeople);
    navigation.navigate(PAGES.PEOPLE_LIST);
  };
  const selectAllContacts = () => {
    if (isAllSelected) {
      setSelectedContacts([]);
      setIsAllSelected(false);
    } else {
      setSelectedContacts(contacts);
      setIsAllSelected(true);
    }
  };


  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
       <TouchableOpacity
            style={[
              // styles.cardItem,
              {
                backgroundColor: isAllSelected 
                  ? "lightgreen"
                  : "white",
              },
            ]}
            onPress={selectAllContacts}
          >
            <Text
              style={styles.cardItemText}
            >{isAllSelected?"Deselect All":"Select All"}</Text>
          </TouchableOpacity>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.cardItem,
              {
                backgroundColor: selectedContacts.includes(item)
                  ? "lightgreen"
                  : "white",
              },
            ]}
            onPress={() => toggleContactSelection(item)}
          >
            <MaterialIcons
              name={
                selectedContacts.includes(item)
                  ? "check-box"
                  : "check-box-outline-blank"
              }
              size={30}
              color={selectedContacts.includes(item) ? "green" : "lightgray"}
            />
            <Text
              style={styles.cardItemText}
            >{`${item.firstName} ${item.lastName}`}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddPeople()}
      >
        <Text style={styles.buttonText}>Add Person</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light gray background
    padding: calcHeight(2),
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: calcHeight(1),
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2, // Add a shadow to the cards
  },
  cardItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: "#007AFF",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  }
});
