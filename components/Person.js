import React,{useState} from "react";
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Menu from "./Menu";
import { usePeople } from "../context/PeopleContext";
import { useNavigation } from "@react-navigation/native";
import PAGES from "../constants/pages";
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from "../helper/res";
import * as FileSystem from "expo-file-system";

function Person({ name, description, birthday, image, id, updateId, selectedIds, setSelectedIds, deletionMode }) {
  birthday = birthday !== "" ? new Date(birthday) : null;
  const { deletePerson } = usePeople();
  const navigation = useNavigation();
  const [showMenu,setShowMenu]=useState(false);

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
      { cancelable: true }
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

  const handleEditPerson = () => {
    navigation.navigate(PAGES.ADD_PEOPLE, { name, description, birthday, id, image });
  };

  const menuIcon = () => (
    <View style={styles.iconContainer}>
      <Ionicons name="person" size={calcHeight(3)} color="white" />
    </View>
  );

  return (
    <View style={[styles.cardContainer, selectedIds.includes(id) ? styles.selectedCard : {}]}>
      <TouchableOpacity
        onPress={() => {
          if (deletionMode) {
            if (selectedIds.includes(id)) {
              setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
            } else {
              setSelectedIds([...selectedIds, id]);
            }
          } else {
            setShowMenu(true);
          }
        }}
      >
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: FileSystem.documentDirectory + image }}
              width={calcWidth(20)}
              height={calcWidth(20)}
              style={styles.profileImage}
              key={updateId}
            />
          ) : (
            <Ionicons name="person" size={calcHeight(10)} color="black" />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description.slice(0, 50).replace(/\n/g, " ")}</Text>
          {birthday && (
            <Text style={styles.birthday}>
              {`${birthday.getDate()} ${birthday.toLocaleString("default", {
                month: "short",
              })} ${birthday.getFullYear()}`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <Menu visible={showMenu} hideMenu={hideMenu} options={options} icon={menuIcon} menuTitle={name} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: calcWidth(2),
    elevation: 4,
    shadowColor: "black",
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
    alignItems: "center",
    justifyContent: "center",
    padding: calcHeight(1),
    width: calcWidth(12),
    backgroundColor: "black",
    borderRadius: calcHeight(4),
  },
  profileImage: {
    borderRadius: calcWidth(10),
    marginTop: calcHeight(1),
  },
  selectedCard: {
    borderColor: "#017bff",
    borderWidth: calcWidth(0.25),
  },
});

export default Person;
