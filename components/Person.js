import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardMenu from "./CardMenu";
import { usePeople } from "../context/PeopleContext";
import { useNavigation } from "@react-navigation/native";
import PAGES from "../constants/pages";
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from "../helper/res";

function Person({ name, description, birthday, id }) {
  // Parse the birthday date if it's not an empty string
  birthday = birthday !== "" ? new Date(birthday) : null;

  // Access the deletePerson function from the PeopleContext
  const { deletePerson } = usePeople();

  // State to control the visibility of the card menu
  const [showMenu, setShowMenu] = useState(false);

  // Access the navigation object to navigate to the edit page
  const navigation = useNavigation();

  // Function to handle editing the person
  const handleEditPerson = () => {
    navigation.navigate(PAGES.ADD_PEOPLE, { name, description, birthday, id });
    setShowMenu(false);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => setShowMenu(true)}>
        <View style={styles.imageContainer}>
          <Ionicons
            name="person"
            size={calcHeight(10)}
            color="black"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          {birthday && (
            <Text style={styles.birthday}>
              {`${birthday.getDate()} ${birthday.toLocaleString("default", {
                month: "short",
              })} ${birthday.getFullYear()}`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <CardMenu
        visible={showMenu}
        hideMenu={() => setShowMenu(false)}
        onDelete={() => deletePerson({ id })}
        editCard={handleEditPerson}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: calcWidth(2),
    width: calcWidth(41.5),
    marginVertical: calcHeight(2),
    borderColor: "gray",
    borderWidth: calcWidth(0.2),
    marginHorizontal: calcWidth(3),
  },
  imageContainer: {
    alignItems: "center",
  },
  textContainer: {
    padding: calcWidth(2),
    alignItems: "center",
  },
  name: {
    fontSize: getFontSizeByWindowWidth(12),
    fontWeight: "bold",
  },
  description: {
    fontSize: getFontSizeByWindowWidth(10),
    marginVertical: calcHeight(1),
  },
  birthday: {
    fontSize: getFontSizeByWindowWidth(8),
    color: "gray",
  },
});

export default Person;
