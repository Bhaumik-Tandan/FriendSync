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
import PAGES from "../constants/pages";

function AddPeople({ navigation, route }) {
  const {
    name: routeName,
    description: routeDescription,
    birthday: routeBirthday,
    id,
  } = route.params || {};
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { handleAddPeople, handleEditPerson } = usePeople();

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
          </TouchableOpacity>
        )}
        {Platform.OS == "android" ? (
          <Text style={styles.dateText}>{formatDate(birthday)}</Text>
        ) : (
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
});

export default AddPeople;
