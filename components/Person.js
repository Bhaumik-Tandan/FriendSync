import React, { useState, useRef } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Menu from "./Menu";
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

  const hideMenu = () => {
    setShowMenu(false);
  };

  const deleteAlert = () => {
    hideMenu();
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: "Delete",
          onPress: () => deletePerson({ id }),
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  const options = [
    {
      title: "Edit Person",
      onClick: () => handleEditPerson(),
      icon: <Ionicons name="create-outline" size={calcWidth(8)} color="blue" />,
    },
    {
      title: "Delete Person",
      onClick: deleteAlert,
      icon: <Ionicons name="trash-outline" size={calcWidth(8)} color="red" />,
    },
  ];

  // Function to handle editing the person
  const handleEditPerson = () => {
    navigation.navigate(PAGES.ADD_PEOPLE, { name, description, birthday, id });
    setShowMenu(false);
  };

  const menuIcon = () => (
    <View style={styles.iconContainer}>
      <Ionicons name="person" size={calcHeight(3)} color="white" />
    </View>
  );

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
      <Menu
        visible={showMenu}
        hideMenu={hideMenu}
        options={options}
        icon={menuIcon}
        menuTitle={name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: calcWidth(2),
    elevation: 4, // for Android shadow
    shadowColor: "black", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: calcWidth(41.5),
    marginHorizontal: calcWidth(3),
    marginVertical: calcHeight(2),
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
  iconContainer: {
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center items horizontally
    padding: calcHeight(1),
    width: calcWidth(12),
    backgroundColor: "black",
    borderRadius: calcHeight(4), // Optionally round the corners
  },
});

export default Person;
