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
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from "../helper/res";
import { SearchBar } from "react-native-elements";

export default function AddFromContact({ navigation }) {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { handleAddPeople: addPeople, loading, setLoading } = usePeople();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [search, setSearch] = useState("");
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
  const getBirthdayTimestamp = (birthday) => {
    if (!birthday) return "";
    const birthdayDate = new Date(birthday.year, birthday.month, birthday.day); // Note: Months are zero-based (0-11)

    return birthdayDate;
  };

  const toggleContactSelection = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prev) => {
        if (isAllSelected) setIsAllSelected(false);
        return prev.filter((c) => c !== contact);
      });
    } else {
      setSelectedContacts((prev) => {
        setIsAllSelected(prev.length == contacts.length - 1);
        return [...prev, contact];
      });
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

  const filterContacts = () => {
    if (search === "") {
      return contacts;
    }
    return contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Contacts..."
        onChangeText={setSearch}
        value={search}
      />
      <TouchableOpacity
        style={[
          {
            backgroundColor: isAllSelected ? "lightgreen" : "white",
            padding: 10,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            marginBottom: 30,
          },
        ]}
        activeOpacity={0.7}
        underlayColor="#DDDDDD"
        onPress={selectAllContacts}
        accessibilityLabel={
          isAllSelected ? "Deselect all contacts" : "Select all contacts"
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              styles.cardItemText,
              { fontWeight: "bold", marginLeft: 10 },
            ]}
          >
            {isAllSelected ? "Deselect All" : "Select All"}
          </Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={filterContacts()}
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
            <Text style={styles.cardItemText}>{`${item.firstName} ${
              item.lastName ? item.lastName : ""
            }`}</Text>
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
    padding: calcHeight(2), // Padding relative to screen height
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: calcHeight(1), // Padding relative to screen height
    marginBottom: calcHeight(0.5), // Margin bottom relative to screen height
    backgroundColor: "white",
    borderRadius: calcWidth(2), // Border radius relative to screen width
    elevation: 2, // Add a shadow to the cards
  },
  cardItemText: {
    fontSize: getFontSizeByWindowWidth(15), // Font size relative to screen width
    marginLeft: calcWidth(3), // Margin left relative to screen width
  },
  addButton: {
    backgroundColor: "#007AFF",
    color: "white",
    padding: calcHeight(1), // Padding relative to screen height
    borderRadius: calcWidth(2), // Border radius relative to screen width
    marginTop: calcHeight(1), // Margin top relative to screen height
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: getFontSizeByWindowWidth(15), // Font size relative to screen width
  },
});
