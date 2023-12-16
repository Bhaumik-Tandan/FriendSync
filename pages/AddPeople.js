import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather"; // Import icons from 'react-native-vector-icons'
import { FAB } from "react-native-paper";
import { usePeople } from "../context/PeopleContext";
import { calcHeight, calcWidth } from "../helper/res";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import { Ionicons } from "@expo/vector-icons";
import PAGES from "../constants/pages";

function AddPeople({ navigation, route }) {
  const {
    name: routeName,
    description: routeDescription,
    birthday: routeBirthday,
    image:routeImage,
    id,
  } = route.params || {};
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { handleAddPeople, handleEditPerson } = usePeople();
  const [image,setImage]=useState("");
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? "Edit Person" : "Add Person",
    });
  }, [navigation]);

  const handleAddPerson = async () => {
    const newPerson = {
      name,
      birthday,
      description,
    };
    if (id) await handleEditPerson({ id, ...newPerson });
    else await handleAddPeople([newPerson]);
    navigation.navigate(PAGES.PEOPLE_LIST);
  };

  React.useEffect(() => {
    if (routeName) {
      setName(routeName);
    }
    if (routeDescription) {
      setDescription(routeDescription);
    }
    if (routeBirthday) {
      setBirthday(routeBirthday);
    }
  }, [routeName, routeDescription, routeBirthday]);

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBirthday(selectedDate);
      setShowDatePicker(false); // Close the date picker after selecting a date
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.imageContainer} onPress={()=>setModalVisible(true)}>
        <View style={styles.imageBox}>
          <Ionicons
            name="person"
            size={calcHeight(10)}
            color="black"
            style={styles.image}
          />
          </View>
        </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        keyboardType="default"
        multiline
      />
      <View style={styles.birthdayContainer}>
        <Text style={styles.label}>Birthday</Text>
        {Platform.OS == "android" && (
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.calendarIcon}>
              <Icon name="calendar" size={20} color="#007AFF" />
            </View>
            <Text style={styles.dateText}>{formatDate(birthday)}</Text>
          </TouchableOpacity>
        )}
        {Platform.OS == "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
            style={styles.datePicker}
          />
        )}
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          style={styles.datePicker}
        />
      )}
      <Button
        title={id ? "Edit Person" : "Add Person"}
        onPress={handleAddPerson}
        color="#007AFF"
        style={styles.button}
      />
      <View style={styles.fabContainer}>
        <FAB
          icon={() => <AntDesign name="adduser" size={24} color="black" />}
          onPress={() => navigation.navigate(PAGES.ADD_FROM_CONTACT)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white", // Set a background color,
  },
  input: {
    height: 40,
    borderColor: "lightgray", // Use a lighter color for the border
    borderWidth: 1,
    borderRadius: 8, // Add rounded corners
    marginBottom: 10,
    padding: 8,
  },
  birthdayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  calendarIcon: {
    padding: 8,
  },
  dateText: {
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#007AFF", // iOS blue color
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  fabContainer: {
    position: "absolute",
    bottom: calcHeight(5), // 5% of the device height
    right: calcWidth(5), // 5% of the device width
  },
  imageContainer: {
    alignItems: "center", // This will center align items horizontally
    justifyContent: "center", // This will center align items vertically
    backgroundColor: "grey",
    padding:calcHeight(2),
    marginBottom:calcHeight(2)
  },
  imageBox: {
    backgroundColor: "white",
    justifyContent: "center", // Center align children vertically
    alignItems: "center", // Center align children horizontally
    borderRadius:calcWidth(30),
    padding:calcHeight(2),
    modalView: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)', // Dimmed background
    },
    editProfilePicSection: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    closeButton: {
      padding: 10,
      alignItems: 'center',
    },
  }
});

export default AddPeople;
